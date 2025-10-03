"use client";
import { useEffect, useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import Link from "next/link";

export default function PostPage() {
  const [lang, setLang] = useState("id");
  const [safeMode, setSafeMode] = useState(
    typeof window !== "undefined" && localStorage.getItem("safeMode") === "true"
  );
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState(
    typeof window !== "undefined" ? localStorage.getItem("theme") || "system" : "system"
  );

  useEffect(() => {
    if (!safeMode || loaded) {
      SwaggerUI({
        dom_id: "#swagger",
        url: "/swagger.json",
        layout: "BaseLayout",
        docExpansion: "none",
        defaultModelsExpandDepth: -1,
        deepLinking: true,
        filter: search || false
      });
    }
  }, [safeMode, loaded, search]);

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

  const toggleSafeMode = () => {
    const newVal = !safeMode;
    setSafeMode(newVal);
    localStorage.setItem("safeMode", newVal);
    document.documentElement.classList.toggle("no-anim", newVal);
  };

  const texts = {
    title: { id: "📤 Post Rafzhost API", en: "📤 Rafzhost API Post" },
    switch: { id: "Beralih ke Docs", en: "Switch to Docs" },
    safe: { id: "Mode Aman", en: "Safe Mode" },
    normal: { id: "Kembali Normal", en: "Back to Normal" },
    loadDocs: { id: "Muat Dokumentasi", en: "Load Documentation" },
    search: { id: "Cari Endpoint...", en: "Search Endpoint..." },
    hint: {
      id: "Gunakan tombol di atas untuk mengganti tema, bahasa, mode aman, atau mencari endpoint.",
      en: "Use the buttons above to change theme, language, safe mode, or search endpoints."
    }
  };

  return (
    <div className="page dark:bg-gray-900 dark:text-white">
      <header className="header bg-green-600">
        <h1>{texts.title[lang]}</h1>
        <div className="controls">
          <Link href="/docs" className="btn btn-light text-green-600">{texts.switch[lang]}</Link>
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="select">
            <option value="id">🇮🇩 ID</option>
            <option value="en">🇺🇸 EN</option>
          </select>
          <select onChange={(e) => applyTheme(e.target.value)} value={theme} className="select">
            <option value="light">☀️ Light</option>
            <option value="dark">🌙 Dark</option>
            <option value="system">💻 System</option>
          </select>
          <button onClick={toggleSafeMode} className="btn btn-warning">
            {safeMode ? texts.normal[lang] : texts.safe[lang]}
          </button>
        </div>
      </header>

      <main className="main">
        <p className="hint">{texts.hint[lang]}</p>
        {!safeMode && (
          <div className="search-bar">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={texts.search[lang]}
              className="search-input"
            />
          </div>
        )}
        {safeMode && !loaded ? (
          <div className="safe-box">
            <p>{texts.safe[lang]} ✅</p>
            <button onClick={() => setLoaded(true)} className="btn btn-secondary">
              {texts.loadDocs[lang]}
            </button>
          </div>
        ) : (
          <div id="swagger" className="swagger-box"></div>
        )}
      </main>

      <footer className="footer">
        <p>
          Thanks to{" "}
          <a href="https://github.com/siputzx/apisku" target="_blank" className="link-green">
            Siputzx for source code
          </a>
        </p>
        <p className="watermark">Rafzhost API by Rafz (Rafflie Aditya)</p>
      </footer>
    </div>
  );
}
