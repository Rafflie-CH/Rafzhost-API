// src/pages/docs.js
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import "swagger-ui-react/swagger-ui.css";

// import Swagger client-only
const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function DocsPage() {
  const [lang, setLang] = useState("id");
  const [theme, setTheme] = useState(typeof window !== "undefined" ? (localStorage.getItem("theme") || "system") : "system");
  const [safeMode, setSafeMode] = useState(typeof window !== "undefined" && localStorage.getItem("safeMode") === "true");
  const [search, setSearch] = useState("");
  const [specReady, setSpecReady] = useState(false); // show skeleton while spec loads
  const [useSafeSwagger, setUseSafeSwagger] = useState(false);

  useEffect(() => {
    // load swagger.json to detect availability; keep skeleton for small time
    let mounted = true;
    setSpecReady(false);
    fetch("/swagger.json")
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(() => { if (mounted) { setSpecReady(true); } })
      .catch(() => { if (mounted) setSpecReady(false); })
      .finally(() => { if (mounted) setTimeout(()=> setSpecReady(true), 300); });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    const t = localStorage.getItem("theme") || "system";
    setTheme(t);
    const s = localStorage.getItem("safeMode") === "true";
    setSafeMode(s);
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

  const texts = {
    title: { id: "📖 Dokumentasi Rafzhost API", en: "📖 Rafzhost API Documentation" },
    switch: { id: "Beralih ke Post", en: "Switch to Post" },
    safe: { id: "Mode Aman", en: "Safe Mode" },
    load: { id: "Muat Dokumentasi", en: "Load Documentation" },
    searchPlaceholder: { id: "🔍 Cari endpoint...", en: "🔍 Search endpoint..." }
  };

  return (
    <div className="page docs-page">
      <header className="page-header docs-header">
        <div>
          <h1>{texts.title[lang]}</h1>
        </div>
        <div className="header-controls">
          <Link href="/post"><a className="btn-outline"> {texts.switch[lang]} </a></Link>

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
        <div className="search-row">
          <input
            className="search-input"
            placeholder={texts.searchPlaceholder[lang]}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <label className="safe-toggle-inline">
            <input
              type="checkbox"
              checked={useSafeSwagger}
              onChange={(e) => setUseSafeSwagger(e.target.checked)}
            /> use safe swagger
          </label>
        </div>

        {!specReady && (
          <div className="skeleton-wrap">
            <div className="skeleton title-skel" />
            <div className="skeleton row-skel" />
            <div className="skeleton row-skel" />
          </div>
        )}

        {specReady && (
          <div className="swagger-wrap">
            <SwaggerUI
              url={useSafeSwagger ? "/swagger-safe.json" : "/swagger.json"}
              docExpansion="none"
              defaultModelsExpandDepth={-1}
              deepLinking={!safeMode}
              filter={search || false}
            />
          </div>
        )}
      </main>

      <footer className="page-footer">
        <div className="footer-center">
          <a href="https://github.com/siputzx/apisku" target="_blank" rel="noreferrer" className="thanks-link">
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0..."/></svg>
            Siputzx for source code
          </a>
          <div className="owner">Rafzhost API by Rafz (Rafflie Aditya)</div>
        </div>
      </footer>

      <div className="watermark">Rafzhost API — Rafz (Rafflie Aditya)</div>
    </div>
  );
}
