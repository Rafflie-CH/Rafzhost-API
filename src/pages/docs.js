"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import "swagger-ui-react/swagger-ui.css";

// client-only load
const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function DocsPage() {
  const [lang, setLang] = useState("id");
  const [theme, setTheme] = useState(
    typeof window !== "undefined" ? localStorage.getItem("theme") || "system" : "system"
  );
  const [safeMode, setSafeMode] = useState(
    typeof window !== "undefined" && localStorage.getItem("safeMode") === "true"
  );
  const [search, setSearch] = useState("");
  const [specReady, setSpecReady] = useState(false);
  const [useSafeSwagger, setUseSafeSwagger] = useState(false);

  useEffect(() => {
    let mounted = true;
    setSpecReady(false);
    fetch("/swagger.json")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(() => mounted && setSpecReady(true))
      .catch(() => mounted && setSpecReady(true))
      .finally(() => {
        setTimeout(() => mounted && setSpecReady(true), 120);
      });
    return () => {
      mounted = false;
    };
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
    document.documentElement.classList.toggle("safe-mode", v);
    setSafeMode(v);
  };

  const texts = {
    title: { id: "📖 Dokumentasi Rafzhost API", en: "📖 Rafzhost API Documentation" },
    switch: { id: "Beralih ke Post", en: "Switch to Post" },
    searchPlaceholder: { id: "🔍 Cari endpoint...", en: "🔍 Search endpoint..." },
  };

  return (
    <div className="container docs-theme">
      <header className="header">
        <h1>{texts.title[lang]}</h1>
        <div className="nav-buttons">
          <Link href="/post">
            <button className="btn post">{texts.switch[lang]}</button>
          </Link>
          <select
            className="btn lang"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="id">🇮🇩 ID</option>
            <option value="en">🇺🇸 EN</option>
          </select>
          <select
            className="btn theme"
            value={theme}
            onChange={(e) => applyTheme(e.target.value)}
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          <button className="btn safe" onClick={toggleSafe}>
            {safeMode ? "Safe: On" : "Safe: Off"}
          </button>
        </div>
      </header>

      <main>
        <div className="card">
          <div className="search-row">
            <input
              className="search"
              placeholder={texts.searchPlaceholder[lang]}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input
                type="checkbox"
                checked={useSafeSwagger}
                onChange={(e) => setUseSafeSwagger(e.target.checked)}
              />
              Use safe swagger
            </label>
          </div>

          {!specReady && (
            <div className="skeleton-wrap">
              <div className="skeleton title-skel" style={{ height: 24, width: "40%" }} />
              <div className="skeleton row-skel" style={{ height: 18 }} />
              <div className="skeleton row-skel" style={{ height: 18 }} />
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
        </div>
      </main>

      <footer className="footer">
        <div className="thanks">
          <a
            href="https://github.com/siputzx/apisku"
            target="_blank"
            rel="noreferrer"
            className="thanks-link"
          >
            Siputzx for source code
          </a>
        </div>
        <div className="watermark">Rafzhost API — Rafz (Rafflie Aditya)</div>
      </footer>
    </div>
  );
}
