"use client";

import { useEffect, useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { Sun, Moon, Monitor, Github } from "lucide-react";

export default function Post() {
  const [lang, setLang] = useState("id");
  const [safeMode, setSafeMode] = useState(false);

  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection && connection.downlink < 1) setSafeMode(true);
  }, []);

  useEffect(() => {
    SwaggerUI({
      dom_id: "#swagger",
      url: "/swagger.json",
      presets: [SwaggerUI.presets.apis],
      layout: "BaseLayout",
      docExpansion: "none",
      defaultModelsExpandDepth: -1,
      deepLinking: true,
      supportedSubmitMethods: ["get", "post", "put", "delete", "patch"],
    });
  }, []);

  const getText = (key) => {
    const texts = {
      title: { id: "📮 Post Resmi API Rafzhost", en: "📮 Rafzhost Official API Post" },
      switch: { id: "⬅️ Beralih ke Docs", en: "⬅️ Switch to Docs" },
      safe: { id: "⚡ Mode Aman aktif (jaringan lambat terdeteksi)", en: "⚡ Safe Mode enabled (slow network detected)" },
      thanks: { id: "Thanks to", en: "Thanks to" },
      by: { id: "Rafzhost API by Rafz (Rafflie Aditya)", en: "Rafzhost API by Rafz (Rafflie Aditya)" }
    };
    return texts[key][lang];
  };

  const toggleTheme = (mode) => {
    if (mode === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", mode);
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-colors duration-500">
      <header className="bg-green-600 dark:bg-green-800 text-white p-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-md animate-fadeIn">
        <h1 className="text-xl md:text-2xl font-bold">{getText("title")}</h1>
        <div className="flex flex-wrap gap-3 items-center">
          <a
            href="/docs"
            className="px-4 py-2 rounded-lg bg-white text-green-600 dark:bg-gray-700 dark:text-white font-semibold shadow hover:scale-105 transition"
          >
            {getText("switch")}
          </a>

          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="rounded-lg px-3 py-2 shadow bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 hover:scale-105 transition"
          >
            <option value="id">🇮🇩 Bahasa</option>
            <option value="en">🇺🇸 English</option>
          </select>

          <div className="flex gap-2">
            <button onClick={() => toggleTheme("light")} className="p-2 rounded-full bg-white dark:bg-gray-700 shadow hover:scale-110 transition"><Sun className="w-5 h-5 text-yellow-500" /></button>
            <button onClick={() => toggleTheme("dark")} className="p-2 rounded-full bg-white dark:bg-gray-700 shadow hover:scale-110 transition"><Moon className="w-5 h-5 text-gray-800 dark:text-yellow-300" /></button>
            <button onClick={() => toggleTheme("system")} className="p-2 rounded-full bg-white dark:bg-gray-700 shadow hover:scale-110 transition"><Monitor className="w-5 h-5 text-blue-600" /></button>
          </div>
        </div>
      </header>

      {safeMode && <div className="bg-yellow-400 text-black text-center py-2 animate-pulse font-medium">{getText("safe")}</div>}

      <main className="flex-1 p-4">
        <div id="swagger" className="min-h-screen rounded-lg shadow-lg bg-white dark:bg-gray-800 p-4"></div>
      </main>

      <footer className="bg-gray-200 dark:bg-gray-800 text-center py-4 mt-6 text-sm space-y-2">
        <p>
          {getText("thanks")}{" "}
          <a href="https://github.com/siputzx/apisku" target="_blank" rel="noopener noreferrer"
             className="font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
            <Github className="w-4 h-4" /> Siputzx for source code
          </a>
        </p>
        <p className="opacity-80">{getText("by")}</p>
      </footer>
    </div>
  );
}
