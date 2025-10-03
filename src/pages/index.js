// src/pages/index.js
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [lang, setLang] = useState("id");
  const [theme, setTheme] = useState(
    typeof window !== "undefined" ? localStorage.getItem("theme") || "system" : "system"
  );
  const [safeMode, setSafeMode] = useState(
    typeof window !== "undefined" && localStorage.getItem("safeMode") === "true"
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
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
    title: { id: "Selamat Datang di Rafzhost API", en: "Welcome to Rafzhost API" },
    desc: {
      id: "Pilih Docs atau Post untuk mulai. Gunakan Mode Aman jika koneksi lambat.",
      en: "Choose Docs or Post to start. Use Safe Mode on slow networks."
    },
    docs: { id: "📖 Buka Docs", en: "📖 Open Docs" },
    post: { id: "📤 Buka Post", en: "📤 Open Post" }
  };

  return (
    <div className="page-landing">
      <header className="landing-header">
        <h1 className="landing-title">{texts.title[lang]}</h1>
        <p className="landing-desc">{texts.desc[lang]}</p>

        <div className="landing-actions">
          <Link href="/docs"><a className="big-btn blue">{texts.docs[lang]}</a></Link>
          <Link href="/post"><a className="big-btn green">{texts.post[lang]}</a></Link>
        </div>

        <div className="landing-controls">
          <select className="control-select" value={theme} onChange={(e) => applyTheme(e.target.value)}>
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>

          <select className="control-select" value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="id">🇮🇩 ID</option>
            <option value="en">🇺🇸 EN</option>
          </select>

          <button className="control-btn" onClick={toggleSafe}>
            {safeMode ? "Mode: Aman (On)" : "Mode: Aman (Off)"}
          </button>
        </div>
      </header>

      <footer className="landing-footer">
        <div className="thanks">
          <a href="https://github.com/siputzx/apisku" target="_blank" rel="noreferrer" className="thanks-link">
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58..."/></svg>
            Siputzx for source code
          </a>
        </div>
        <div className="watermark-footer">Rafzhost API by Rafz (Rafflie Aditya)</div>
      </footer>
    </div>
  );
}
