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
  const [useSafeSwagger, setUseSafeSwagger] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem("theme") || "system";
    const s = localStorage.getItem("safeMode") === "true";
    setTheme(t);
    setSafeMode(s);
    if (s) document.documentElement.classList.add("no-anim");
    else document.documentElement.classList.remove("no-anim");
    applyTheme(t);

    let mounted = true;
    fetch("/swagger-docs.json")
      .then((r)=> r.ok ? r.json() : Promise.reject())
      .then(()=> { if (mounted) setSpecReady(true); })
      .catch(()=> { if (mounted) setSpecReady(true); })
      .finally(()=> { /* nothing */ });
    return ()=> mounted = false;
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
    setSafeMode(v);
    localStorage.setItem("safeMode", v);
    document.documentElement.classList.toggle("no-anim", v);
  };

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1 style={{fontSize:18, fontWeight:800}}>{lang==="id" ? "📖 Dokumentasi Rafzhost API" : "📖 Rafzhost API Documentation"}</h1>
          <div style={{fontSize:12, color:"var(--muted)"}}>Read-only docs</div>
        </div>

        <div className="header-controls">
          <Link href="/post" className="btn outline">{lang==="id" ? "Beralih ke Post" : "Switch to Post"}</Link>

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
        <div className="card swagger-card" style={{width:"100%"}}>
          <div className="search-row">
            <input className="search-input" placeholder={lang==="id" ? "🔍 Cari endpoint..." : "🔍 Search endpoint..."} value={search} onChange={(e)=> setSearch(e.target.value)} />
            <label style={{display:"flex", alignItems:"center", gap:8}}>
              <input type="checkbox" checked={useSafeSwagger} onChange={(e)=> setUseSafeSwagger(e.target.checked)} />
              <span style={{marginLeft:6, color:"var(--muted)", fontWeight:600}}>Safe Swagger</span>
            </label>
          </div>

          {!specReady && (
            <div className="skeleton-wrap">
              <div className="skeleton" style={{height:22, width:"40%"}} />
              <div className="skeleton" style={{height:16}} />
              <div className="skeleton" style={{height:16}} />
            </div>
          )}

          {specReady && (
            <div style={{marginTop:8}}>
              <SwaggerUI
                url={useSafeSwagger ? "/swagger-safe.json" : "/swagger-docs.json"}
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
          <a href="https://github.com/siputzx/apisku" target="_blank" rel="noreferrer" style={{color:"var(--accent)", textDecoration:"underline"}}>Siputzx for source code</a>
          <div>Rafzhost API by Rafz (Rafflie Aditya)</div>
        </div>
      </footer>

      <div className="watermark">Rafzhost API — Rafz</div>
    </div>
  );
}
