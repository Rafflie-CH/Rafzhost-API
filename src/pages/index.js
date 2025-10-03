"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Github } from "lucide-react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [lang, setLang] = useState("id");

  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("rafz_theme");
    if (saved) setTheme(saved);
  }, [setTheme]);

  const t = {
    id: {
      title: "Selamat Datang di Rafzhost API",
      desc: "Pilih menu di bawah untuk melihat Dokumentasi (Docs) atau Post API.",
      docs: "📖 Buka Docs",
      post: "📤 Buka Post",
      api: "🔗 API Endpoint",
      theme: "Tema",
      lang: "Bahasa",
      thanks: "Thanks to:",
      author: "Rafzhost API by Rafz (Rafflie Aditya)"
    },
    en: {
      title: "Welcome to Rafzhost API",
      desc: "Choose below to access Documentation (Docs) or Post API.",
      docs: "📖 Open Docs",
      post: "📤 Open Post",
      api: "🔗 API Endpoint",
      theme: "Theme",
      lang: "Language",
      thanks: "Thanks to:",
      author: "Rafzhost API by Rafz (Rafflie Aditya)"
    }
  }[lang];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 dark:from-gray-900 dark:to-gray-800 text-black dark:text-white p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h1>
      <p className="mb-6 text-center max-w-xl">{t.desc}</p>

      <div className="grid md:grid-cols-3 gap-4 w-full max-w-3xl">
        <Link href="/docs"><a className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg text-center"> {t.docs} </a></Link>
        <Link href="/post"><a className="px-6 py-3 bg-green-600 text-white rounded-xl shadow-lg text-center"> {t.post} </a></Link>
        <Link href="/api/ping"><a className="px-6 py-3 bg-purple-600 text-white rounded-xl shadow-lg text-center"> {t.api} </a></Link>
      </div>

      <div className="flex gap-4 mt-8 items-center">
        <select value={lang} onChange={(e)=>setLang(e.target.value)} className="px-3 py-2 rounded border">
          <option value="id">🇮🇩 Bahasa</option>
          <option value="en">🇺🇸 English</option>
        </select>

        <select value={theme === "system" ? "system" : theme} onChange={(e)=>applyTheme(e.target.value)} className="px-3 py-2 rounded border">
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <footer className="mt-8 text-sm text-center">
        <div>{t.thanks} <a href="https://github.com/siputzx/apisku" target="_blank" className="text-blue-600 hover:underline inline-flex items-center gap-1"><Github size={14} /> Siputzx</a></div>
        <div className="opacity-80 mt-2">{t.author}</div>
      </footer>
    </div>
  );

  function applyTheme(val) {
    if (val === "system") { setTheme("system"); if (typeof window!=="undefined") localStorage.setItem("rafz_theme","system"); }
    else { setTheme(val); if (typeof window!=="undefined") localStorage.setItem("rafz_theme", val); }
  }
}
