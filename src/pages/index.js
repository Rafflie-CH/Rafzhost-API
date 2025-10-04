"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [lang, setLang] = useState("id");
  const [theme, setTheme] = useState("system");
  const [safeMode, setSafeMode] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem("theme") || "system";
    const s = localStorage.getItem("safeMode") === "true";
    setTheme(t);
    setSafeMode(s);
    applyTheme(t);
    document.documentElement.classList.toggle("no-anim", s);
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

  return (
    <div className="page landing-page">
      <header className="page-header header-centered">
        <h1>🚀 {lang === "id" ? "Selamat datang di Rafzhost API" : "Welcome to Rafzhost API"}</h1>
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

      <main className="page-main split">
        <div className="card">
          <h2>{lang === "id" ? "📖 Dokumentasi" : "📖 Documentation"}</h2>
          <p>{lang === "id" ? "Baca dokumentasi lengkap endpoint Rafzhost API." : "Read the full API documentation."}</p>
          <Link href="/docs" className="btn primary">{lang === "id" ? "Lihat Docs" : "Go to Docs"}</Link>
        </div>

        <div className="card">
          <h2>{lang === "id" ? "📤 Coba POST" : "📤 Try POST"}</h2>
          <p>{lang === "id" ? "Uji coba endpoint POST secara langsung." : "Test POST endpoints directly."}</p>
          <Link href="/post" className="btn primary">{lang === "id" ? "Coba POST" : "Try POST"}</Link>
        </div>
      </main>

      <footer className="page-footer">
        <div className="footer-center">
          <a href="https://github.com/siputzx/apisku" target="_blank" rel="noreferrer">Siputzx for source code</a>
          <div>Rafzhost API by Rafz (Rafflie Aditya)</div>
        </div>
      </footer>
      <div className="watermark">Rafzhost API — Rafz</div>
    </div>
  );
}
