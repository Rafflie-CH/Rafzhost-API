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
  const [theme, setTheme] = useState("system");
  const [safeMode, setSafeMode] = useState(false);
  const [search, setSearch] = useState("");
  const [specReady, setSpecReady] = useState(false);

  const [endpoint, setEndpoint] = useState("/api/ping");
  const [method, setMethod] = useState("get");
  const [body, setBody] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("theme") || "system";
    const s = localStorage.getItem("safeMode") === "true";
    setTheme(t); setSafeMode(s);
    applyTheme(t);
    fetch("/swagger-post.json").finally(() => setSpecReady(true));
  }, []);

  const applyTheme = (val) => {
    setTheme(val);
    localStorage.setItem("theme", val);
    if (val === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isDark);
    } else {
      document.documentElement.classList.toggle("dark", val === "dark");
    }
  };

  const toggleSafe = () => {
    const v = !safeMode;
    setSafeMode(v);
    localStorage.setItem("safeMode", v);
    document.documentElement.classList.toggle("no-anim", v);
  };

  const tryRequest = async () => {
    try {
      const parsed = body ? JSON.parse(body) : undefined;
      const resp = await axios.request({ url: endpoint, method, data: parsed });
      setResult({ ok: true, data: resp.data });
    } catch (err) {
      setResult({ ok: false, error: err.response?.data || err.message });
    }
  };

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1 style={{fontSize:18, fontWeight:800}}>{lang==="id" ? "📤 Post Rafzhost API" : "📤 Post Rafzhost API"}</h1>
          <div style={{fontSize:12, color:"var(--muted)"}}>Try endpoints (POST/GET)</div>
        </div>

        <div className="header-controls">
          <Link href="/docs" className="btn outline">{lang==="id" ? "Beralih ke Docs" : "Switch to Docs"}</Link>

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

      <main className="page-main split">
        <div className="card swagger-card" style={{flex:1}}>
          <div className="search-row">
            <input className="search-input" placeholder={lang==="id" ? "🔍 Cari endpoint..." : "🔍 Search endpoint..."} value={search} onChange={(e)=> setSearch(e.target.value)} />
          </div>

          {specReady && (
            <SwaggerUI
              url="/swagger-post.json"
              docExpansion="none"
              defaultModelsExpandDepth={-1}
              filter={search || false}
            />
          )}
        </div>

        <aside className="card try-panel">
          <h3 style={{marginTop:0}}>Try endpoint</h3>

          <label>Endpoint</label>
          <input className="search-input" value={endpoint} onChange={(e)=> setEndpoint(e.target.value)} />

          <label>Method</label>
          <select className="control-select" value={method} onChange={(e)=> setMethod(e.target.value)}>
            <option value="get">GET</option>
            <option value="post">POST</option>
            <option value="put">PUT</option>
            <option value="delete">DELETE</option>
          </select>

          <label>JSON Body</label>
          <textarea className="search-input" rows="6" value={body} onChange={(e)=> setBody(e.target.value)} />

          <div style={{display:"flex", gap:8, marginTop:12}}>
            <button className="btn primary" onClick={tryRequest}>Send</button>
            <button className="btn outline" onClick={()=>{ setBody(""); setResult(null); }}>Reset</button>
          </div>

          <div className="result-box">
            <h4 style={{margin:0}}>Result</h4>
            <pre className="result-pre">{result ? JSON.stringify(result, null, 2) : "No result yet"}</pre>
          </div>
        </aside>
      </main>

      <footer className="page-footer">
        <div className="footer-center">
          <a href="https://github.com/siputzx/apisku" target="_blank" rel="noreferrer" style={{color:"var(--accent)", textDecoration:"underline"}}>Siputzx for source code</a>
          <div>Rafzhost API by Rafz (Rafflie Aditya)</div>
        </div>
      </footer>

      <div className="watermark">Rafzhost API — Rafz</div>
    </div>
  );
}
