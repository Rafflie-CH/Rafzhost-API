"use client";

import { useState, useEffect } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { useTheme } from "next-themes";
import { FaGithub } from "react-icons/fa";

export default function Post() {
  const [lang, setLang] = useState("id");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const texts = {
    title: {
      id: "Post Rafzhost API",
      en: "Rafzhost API Post",
    },
    switch: { id: "Beralih ke Docs", en: "Switch to Docs" },
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
      <header className="bg-green-600 text-white p-4 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <h1 className="text-xl font-bold">{texts.title[lang]}</h1>
          <p className="hidden md:block text-sm ml-4">{texts.description[lang]}</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/docs"
            className="bg-white text-green-600 px-3 py-1 rounded hover:bg-gray-100 transition"
          >
            {texts.switch[lang]}
          </a>

          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="rounded px-2 py-1 text-black"
            title="Ganti bahasa / Change language"
          >
            <option value="id">🇮🇩 ID</option>
            <option value="en">🇺🇸 EN</option>
          </select>

          <div className="flex items-center gap-1">
            <span className="text-white text-sm">{texts.themeLabel[lang]}</span>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="rounded px-2 py-1 text-black"
              title="Ganti tema / Change theme"
            >
              <option value="system">System</
