// src/pages/docs.js
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function DocsPage() {
  const [lang, setLang] = useState("id");
  const [theme, setTheme] = useState("system");
  const [safeMode, setSafeMode] = useState(false);
  const [search, setSearch] = useState("");
  const [specReady, setSpecReady] = useState(false);
  const [useSafe, setUseSafe] = useState(false);

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "system");
    setSafeMode(localStorage.getItem("safeMode") === "true");

    let mounted = true;
    setSpecReady(false);
    fetch("/swagger-docs.json")
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(() => mounted && setSpecReady(true))
      .catch(() => mounted && setSpecReady(true));

    return () => { mounted = false; };
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

  return (
    <div className="page docs-page">
      <header className="page-header header-centered">
        <div><h1>{lang === "id" ? "📖 Dokumentasi Rafzhost API" : "📖 Rafzhost API Documentation"}</h1></div>
        <div className="header-controls">
          <Link href="/post"><a className="btn outline">{lang === "id" ? "Beralih ke Post" : "Switch to Post"}</a></Link>

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
        <div className="card swagger-card">
          <div className="search-row">
            <input className="search-input" placeholder={lang === "id" ? "🔍 Cari endpoint..." : "🔍 Search endpoint..."} value={search} onChange={(e)=> setSearch(e.target.value)} />
            <label style={{display:'flex', alignItems:'center', gap:8}}>
              <input type="checkbox" checked={useSafe} onChange={(e)=> setUseSafe(e.target.checked)} />
              {lang === "id" ? "Safe Swagger" : "Safe Swagger"}
            </label>
          </div>

          {!specReady && (
            <div className="skeleton-wrap">
              <div className="skeleton title" />
              <div className="skeleton row" />
              <div className="skeleton row" />
            </div>
          )}

          {specReady && (
            <div className="swagger-wrap">
              <SwaggerUI
                url={useSafe ? "/swagger-safe.json" : "/swagger-docs.json"}
                docExpansion="none"
                defaultModelsExpandDepth={-1}
                deepLinking={!safeMode}
                filter={search || false}
              />
            </div>
          )}
        </div>
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
