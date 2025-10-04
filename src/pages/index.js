// src/pages/index.js
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [lang, setLang] = useState("id");
  const [theme, setTheme] = useState("system");
  const [safeMode, setSafeMode] = useState(false);

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
    setSafeMode(v);
    document.documentElement.classList.toggle("no-anim", v);
  };

  const texts = {
    title: { id: "Selamat datang di Rafzhost API", en: "Welcome to Rafzhost API" },
    subtitle: { id: "Pilih Docs atau Post untuk mulai", en: "Choose Docs or Post to get started" },
    docs: { id: "📖 Buka Docs", en: "📖 Open Docs" },
    post: { id: "📤 Coba Endpoint", en: "📤 Try Endpoint" }
  };

  return (
    <div className="page home-page">
      <header className="page-header header-centered">
        <div className="header-left">
          <h1 className="brand">{texts.title[lang]}</h1>
          <p className="muted">{texts.subtitle[lang]}</p>
        </div>
        <div className="header-controls">
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

      <main className="page-main center-card">
        <div className="card card-lg">
          <h2 className="card-title">{texts.title[lang]}</h2>
          <p className="card-desc">{texts.subtitle[lang]}</p>

          <div className="actions">
            <Link href="/docs"><a className="btn primary">{texts.docs[lang]}</a></Link>
            <Link href="/post"><a className="btn outline">{texts.post[lang]}</a></Link>
          </div>
        </div>
      </main>

      <footer className="page-footer">
        <div className="footer-center">
          <a href="https://github.com/siputzx/apisku" target="_blank" rel="noreferrer" className="thanks-link">
            {/* GitHub icon (simple) */}
            <svg width="16" height="16" viewBox="0 0 16 16" className="github-icon" aria-hidden>
              <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54..."></path>
            </svg>
            Siputzx for source code
          </a>
          <div className="owner">Rafzhost API by Rafz (Rafflie Aditya)</div>
        </div>
      </footer>

      <div className="watermark">Rafzhost API — Rafz</div>
    </div>
  );
}
