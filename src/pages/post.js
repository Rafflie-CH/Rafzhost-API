"use client";

import { useEffect, useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { ThemeProvider, useTheme } from "next-themes";
import Link from "next/link";

function PostContent() {
  const { theme, setTheme } = useTheme();
  const [lang, setLang] = useState("id");
  const [safeMode, setSafeMode] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");

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
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition animate-fadeIn">
      <header className="bg-green-600 text-white p-4 flex flex-wrap justify-between items-center gap-3 shadow-md">
        <h1 className="text-xl font-bold">{texts.title[lang]}</h1>
        <div className="flex flex-wrap gap-2 items-center">
          <Link href="/docs" className="btn btn-light text-green-600">
            {texts.switch[lang]}
          </Link>
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="select">
            <option value="id">🇮🇩 ID</option>
            <option value="en">🇺🇸 EN</option>
          </select>
          <select
            onChange={(e) => setTheme(e.target.value)}
            value={theme}
            className="select"
          >
            <option value="light">☀️ Light</option>
            <option value="dark">🌙 Dark</option>
            <option value="system">💻 System</option>
          </select>
          <button
            onClick={() => setSafeMode(!safeMode)}
            className="btn btn-warning"
          >
            {safeMode ? texts.normal[lang] : texts.safe[lang]}
          </button>
        </div>
      </header>

      <main className="flex-1 p-4">
        <p className="mb-4 italic text-sm opacity-80">{texts.hint[lang]}</p>

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
          <div className="flex flex-col items-center justify-center mt-10">
            <p className="mb-3">{texts.safe[lang]} ✅</p>
            <button
              onClick={() => setLoaded(true)}
              className="btn btn-secondary"
            >
              {texts.loadDocs[lang]}
            </button>
          </div>
        ) : (
          <div id="swagger" className="min-h-screen"></div>
        )}
      </main>

      <footer>
        <p>
          Thanks to{" "}
          <a href="https://github.com/siputzx/apisku" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline inline-flex items-center gap-1">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58..."></path>
            </svg>
            Siputzx for source code
          </a>
        </p>
        <p>Rafzhost API by Rafz (Rafflie Aditya)</p>
      </footer>

      <div className="watermark">Rafzhost API by Rafz (Rafflie Aditya)</div>
    </div>
  );
}

export default function PostPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <PostContent />
    </ThemeProvider>
  );
}
