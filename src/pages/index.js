"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sun, Moon, Laptop, Github } from "lucide-react";

export default function HomePage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState("id");
  const [safeMode, setSafeMode] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const translations = {
    id: {
      title: "Selamat Datang di Rafzhost API",
      desc: "Pilih salah satu untuk melanjutkan:",
      docs: "📖 Dokumentasi API",
      post: "📝 Coba Postman UI",
      api: "⚡ Endpoint API",
      theme: "Ganti Tema",
      lang: "Ganti Bahasa",
      safe: "Mode Aman (untuk jaringan lambat)",
      thanks: "Thanks to: ",
      author: "Rafzhost API by Rafz (Rafflie Aditya)"
    },
    en: {
      title: "Welcome to Rafzhost API",
      desc: "Choose one to continue:",
      docs: "📖 API Documentation",
      post: "📝 Try Postman UI",
      api: "⚡ API Endpoint",
      theme: "Change Theme",
      lang: "Change Language",
      safe: "Safe Mode (for slow networks)",
      thanks: "Thanks to: ",
      author: "Rafzhost API by Rafz (Rafflie Aditya)"
    }
  };

  const t = translations[language];

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col justify-between items-center px-6 py-10 bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      
      {/* Header */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center mb-4 dark:text-white"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {t.title}
      </motion.h1>

      <motion.p
        className="text-gray-600 dark:text-gray-300 mb-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {t.desc}
      </motion.p>

      {/* Main Buttons */}
      <motion.div
        className="grid gap-4 md:grid-cols-3"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <Link href="/docs">
          <button className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-md w-full">
            {t.docs}
          </button>
        </Link>
        <Link href="/post">
          <button className="px-6 py-3 rounded-2xl bg-green-600 hover:bg-green-700 text-white shadow-md w-full">
            {t.post}
          </button>
        </Link>
        <Link href="/api">
          <button className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white shadow-md w-full">
            {t.api}
          </button>
        </Link>
      </motion.div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mt-10">
        {/* Theme Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme("light")}
            className={`p-2 rounded-xl shadow-md ${theme === "light" ? "bg-yellow-300" : "bg-gray-200 dark:bg-gray-700"}`}
          >
            <Sun />
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`p-2 rounded-xl shadow-md ${theme === "dark" ? "bg-blue-900 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
          >
            <Moon />
          </button>
          <button
            onClick={() => setTheme("system")}
            className={`p-2 rounded-xl shadow-md ${theme === "system" ? "bg-gray-400" : "bg-gray-200 dark:bg-gray-700"}`}
          >
            <Laptop />
          </button>
        </div>

        {/* Language Toggle */}
        <button
          onClick={() => setLanguage(language === "id" ? "en" : "id")}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
        >
          {t.lang}: {language.toUpperCase()}
        </button>

        {/* Safe Mode */}
        <button
          onClick={() => setSafeMode(!safeMode)}
          className={`px-4 py-2 rounded-xl shadow-md ${safeMode ? "bg-red-600 text-white" : "bg-gray-300 dark:bg-gray-700 dark:text-white"}`}
        >
          {t.safe}
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center text-gray-600 dark:text-gray-300 text-sm">
        <p>
          {t.thanks}
          <a
            href="https://github.com/siputzx/apisku"
            target="_blank"
            className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
          >
            Siputzx for source code <Github size={16} />
          </a>
        </p>
        <p className="mt-2">{t.author}</p>
      </footer>
    </div>
  );
}
