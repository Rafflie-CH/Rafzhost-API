// src/pages/index.js
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
    if (s) document.documentElement.classList.add("no-anim");
    else document.documentElement.classList.remove("no-anim");
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

  const texts = {
    title: { id: "Selamat Datang di Rafzhost API", en: "Welcome to Rafzhost API" },
    desc: {
      id: "Pilih menu di bawah untuk melihat Dokumentasi (Docs) atau mencoba endpoint (Post).",
      en: "Choose below to access Documentation (Docs) or try endpoints (Post)."
    },
    docs: { id: "📖 Buka Docs", en: "📖 Open Docs" },
    post: { id: "📤 Buka Post", en: "📤 Open Post" }
  };

  return (
    <div className="page">
      <header className="page-header header-centered">
        <div>
          <h1 style={{fontSize:20, fontWeight:800}}>Rafzhost API</h1>
          <div style={{fontSize:12, color:"var(--muted)"}}>API docs & playground</div>
        </div>

        <div className="header-controls">
          <select value={lang} onChange={(e)=> setLang(e.target.value)} className="control-select">
            <option value="id">🇮🇩 ID</option>
            <option value="en">🇺🇸 EN</option>
          </select>

          <select value={theme} onChange={(e)=> applyTheme(e.target.value)} className="control-select">
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>

          <button onClick={toggleSafe} className="control-btn">{safeMode ? "Safe: On" : "Safe: Off"}</button>
        </div>
      </header>

      <main className="page-main">
        <div className="card" style={{textAlign:"center"}}>
          <h2 style={{fontSize:28, marginBottom:8}}>{texts.title[lang]}</h2>
          <p style={{color:"var(--muted)", maxWidth:760, margin:"0 auto 18px"}}>{texts.desc[lang]}</p>

          <div style={{display:"flex", justifyContent:"center", gap:16, marginTop:12}}>
            <Link href="/docs" className="btn primary">{texts.docs[lang]}</Link>
            <Link href="/post" className="btn outline">{texts.post[lang]}</Link>
          </div>

          <div style={{marginTop:18}}>
            <small style={{color:"var(--muted)"}}>Thanks to <a href="https://github.com/siputzx/apisku" target="_blank" rel="noreferrer" style={{color:"var(--accent)", textDecoration:"underline"}}>Siputzx</a> • Rafzhost API by Rafflie Aditya</small>
          </div>
        </div>
      </main>

      <footer className="page-footer">
        <div className="footer-center">
          <div>© {new Date().getFullYear()} Rafzhost API</div>
        </div>
      </footer>

      <div className="watermark">Rafzhost API — Rafz (Rafflie Aditya)</div>
    </div>
  );
}
