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

  useEffect(() => {
    if (!safeMode || loaded) {
      SwaggerUI({
        dom_id: "#swagger",
        url: "/swagger.json",
        layout: "BaseLayout",
        docExpansion: "none",
        defaultModelsExpandDepth: -1,
        deepLinking: true,
      });
    }
  }, [safeMode, loaded]);

  const texts = {
    title: { id: "📤 Post Rafzhost API", en: "📤 Rafzhost API Post" },
    switch: { id: "Beralih ke Docs", en: "Switch to Docs" },
    safe: { id: "Mode Aman", en: "Safe Mode" },
    loadDocs: { id: "Muat Dokumentasi", en: "Load Documentation" },
    hint: {
      id: "Gunakan tombol di atas untuk mengganti tema, bahasa, dan mode aman.",
      en: "Use the buttons above to switch theme, language, and safe mode."
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition">
      <header className="bg-green-600 text-white p-4 flex flex-wrap justify-between items-center gap-3 shadow-md">
        <h1 className="text-xl font-bold">{texts.title[lang]}</h1>
        <div className="flex flex-wrap gap-2 items-center">
          <Link href="/docs" className="px-3 py-2 bg-white text-green-600 rounded-lg hover:bg-gray-100">
            {texts.switch[lang]}
          </Link>
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="px-3 py-2 rounded text-black">
            <option value="id">🇮🇩 ID</option>
            <option value="en">🇺🇸 EN</option>
          </select>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
          >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>
          <button
            onClick={() => setSafeMode(!safeMode)}
            className="px-3 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:scale-105 transition"
          >
            {texts.safe[lang]}
          </button>
        </div>
      </header>

      <main className="flex-1 p-4">
        <p className="mb-4 italic text-sm opacity-80">{texts.hint[lang]}</p>
        {safeMode && !loaded ? (
          <div className="flex flex-col items-center justify-center mt-10">
            <p className="mb-3">{texts.safe[lang]}: {lang === "id" ? "Aktif" : "Enabled"}</p>
            <button
              onClick={() => setLoaded(true)}
              className="px-5 py-3 bg-green-600 text-white font-bold rounded-lg hover:scale-105 transition"
            >
              {texts.loadDocs[lang]}
            </button>
          </div>
        ) : (
          <div id="swagger" className="min-h-screen"></div>
        )}
      </main>

      <footer className="bg-gray-200 dark:bg-gray-800 text-center p-4 text-sm mt-6">
        <p>
          Thanks to{" "}
          <a href="https://github.com/siputzx/apisku" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center justify-center gap-1">
            <svg className="w-4 h-4 inline" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58..."></path>
            </svg>
            Siputzx for source code
          </a>
        </p>
        <p className="mt-1">Rafzhost API by Rafz (Rafflie Aditya)</p>
      </footer>
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
