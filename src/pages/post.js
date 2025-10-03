// src/pages/post.js
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function PostPage() {
  const [lang, setLang] = useState("id");
  const [theme, setTheme] = useState(typeof window !== "undefined" ? localStorage.getItem("theme") || "system" : "system");
  const [safeMode, setSafeMode] = useState(typeof window !== "undefined" && localStorage.getItem("safeMode") === "true");
  const [search, setSearch] = useState("");
  const [specReady, setSpecReady] = useState(false);

  const [endpoint, setEndpoint] = useState("/api/hello");
  const [method, setMethod] = useState("post");
  const [body, setBody] = useState('{"msg":"hello"}');
  const [result, setResult] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch("/swagger.json")
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(() => { if (mounted) setSpecReady(true); })
      .catch(() => { if (mounted) setSpecReady(true); })
      .finally(() => { mounted = false; });
  }, []);

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "system");
    setSafeMode(localStorage.getItem("safeMode") === "true");
  }, []);

  const applyTheme = (val) => {
    localStorage.setItem("theme", val);
    setTheme(val);
    if (val === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isDark);
    } else {
      document.documentElement.classList.toggle("dark", val === "dark");
    }
  };

  const toggleSafe = () => {
    const v = !safeMode;
    localStorage.setItem("safeMode", v);
    document.documentElement.classList.toggle("no-anim", v);
    setSafeMode(v);
  };

  const tryRequest = async () => {
    try {
      const parsed = body ? JSON.parse(body) : {};
      const resp = await axios({ url: endpoint, method, data: parsed });
      setResult({ ok: true, data: resp.data });
    } catch (err) {
      setResult({ ok: false, error: err.response?.data || err.message });
    }
  };

  return (
    <div className="page post-page">
      <header className="page-header post-header">
        <div><h1>📤 Post Rafzhost API</h1></div>
        <div className="header-controls">
          <Link href="/docs"><a className="btn-outline">Switch to Docs</a></Link>

          <select className="control-select" value={lang} onChange={(e)=> setLang(e.target.value)}>
            <option value="id">🇮🇩 ID</option>
            <option value="en">🇺🇸 EN</option>
          </select>

          <select className="control-select" value={theme} onChange={(e)=> applyTheme(e.target.value)}>
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>

          <button className="control-btn" onClick={toggleSafe}>{safeMode ? "Safe: On" : "Safe: Off"}</button>
        </div>
      </header>

      <main className="page-main">
        <div style={{flex:1}}>
          <div className="search-row">
            <input className="search-input" placeholder="🔍 Cari endpoint..." value={search} onChange={(e)=> setSearch(e.target.value)} />
          </div>

          {specReady && (
            <div className="swagger-wrap">
              <SwaggerUI url="/swagger.json" docExpansion="none" filter={search || false} />
            </div>
          )}
        </div>

        <aside className="post-right">
          <h3>Try endpoint</h3>
          <label>Endpoint</label>
          <input className="input" value={endpoint} onChange={(e)=> setEndpoint(e.target.value)} />
          <label>Method</label>
          <select className="control-select" value={method} onChange={(e)=> setMethod(e.target.value)}>
            <option value="post">POST</option>
            <option value="get">GET</option>
          </select>
          <label>JSON Body</label>
          <textarea className="textarea" rows="6" value={body} onChange={(e)=> setBody(e.target.value)} />
          <button className="btn" onClick={tryRequest}>Send</button>

          <div className="result-box">
            <h4>Result</h4>
            <pre className="result-pre">{ result ? JSON.stringify(result, null, 2) : "No result yet" }</pre>
          </div>
        </aside>
      </main>

      <footer className="page-footer">
        <div className="footer-center">
          <a href="https://github.com/siputzx/apisku" target="_blank" rel="noreferrer" className="thanks-link">Siputzx for source code</a>
          <div className="owner">Rafzhost API by Rafz (Rafflie Aditya)</div>
        </div>
      </footer>

      <div className="watermark">Rafzhost API — Rafz</div>
    </div>
  );
}
