"use client";

import { useState, useEffect } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { useTheme } from "next-themes";
import { FaGithub } from "react-icons/fa";

export default function Docs() {
  const [lang, setLang] = useState("id");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []); // untuk next-themes

  const texts = {
    title: {
      id: "📖 Dokumentasi resmi API Rafzhost",
      en: "📖 Rafzhost API Official Documentation",
    },
    switch: { id: "Beralih ke Post", en: "Switch to Post" },
    description: {
      id: "Gunakan tombol di atas untuk mencoba endpoint API",
      en: "Use the buttons above to try API endpoints",
    },
    themeLabel: { id: "Tema:", en: "Theme:" },
    thanks: { id: "Thanks to:", en: "Thanks to:" },
    source: { id: "Siputzx for source code", en: "Siputzx for source code" },
    owner: { id: "Rafzhost API by Rafz (Rafflie Aditya)", en: "Rafzhost API by Rafz (Rafflie Aditya)" },
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="bg-blue-600 text-white p-4 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <h1 className="text-xl font-bold">{texts.title[lang]}</h1>
          <p className="hidden md:block text-sm ml-4">{texts.description[lang]}</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Tombol switch Post */}
          <a
            href="/post"
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition"
          >
            {texts.switch[lang]}
          </a>

          {/* Dropdown bahasa */}
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="rounded px-2 py-1 text-black"
            title="Ganti bahasa / Change language"
          >
            <option value="id">🇮🇩 ID</option>
            <option value="en">🇺🇸 EN</option>
          </select>

          {/* Tombol ganti tema */}
          <div className="flex items-center gap-1">
            <span className="text-white text-sm">{texts.themeLabel[lang]}</span>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="rounded px-2 py-1 text-black"
              title="Ganti tema / Change theme"
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      </header>

      {/* MAIN SWAGGER UI */}
      <main className="flex-1">
        <SwaggerUI url="/swagger.json" />
      </main>

      {/* FOOTER */}
      <footer className="bg-blue-50 text-blue-800 p-4 flex flex-col md:flex-row items-center justify-center gap-2 text-sm mt-4">
        <span>{texts.thanks[lang]}</span>
        <a
          href="https://github.com/siputzx/apisku"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:underline"
        >
          <FaGithub /> {texts.source[lang]}
        </a>
        <span className="ml-2">{texts.owner[lang]}</span>
      </footer>
    </div>
  );
}
