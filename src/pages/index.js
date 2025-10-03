"use client";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [lang, setLang] = useState("id");

  const texts = {
    title: {
      id: "Selamat Datang di Rafzhost API",
      en: "Welcome to Rafzhost API"
    },
    desc: {
      id: "Pilih menu di bawah untuk melihat Dokumentasi (Docs) atau Post API.",
      en: "Choose below to access Documentation (Docs) or Post API."
    },
    docs: { id: "📖 Buka Docs", en: "📖 Open Docs" },
    post: { id: "📤 Buka Post", en: "📤 Open Post" }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 animate-fadeIn">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{texts.title[lang]}</h1>
      <p className="text-lg text-center max-w-lg mb-6">{texts.desc[lang]}</p>
      <div className="flex gap-4">
        <Link href="/docs" className="btn btn-primary">{texts.docs[lang]}</Link>
        <Link href="/post" className="btn btn-secondary">{texts.post[lang]}</Link>
      </div>
      <div className="mt-6">
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="select"
        >
          <option value="id">🇮🇩 Bahasa</option>
          <option value="en">🇺🇸 English</option>
        </select>
      </div>

      <footer className="mt-10 text-sm opacity-80">
        Rafzhost API by Rafz (Rafflie Aditya)
      </footer>
    </div>
  );
}
