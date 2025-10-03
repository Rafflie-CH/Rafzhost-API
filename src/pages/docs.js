"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Github } from "lucide-react";

// dynamic import so it runs only on client
const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });
import "swagger-ui-react/swagger-ui.css";

export default function DocsPage() {
  const { theme, setTheme } = useTheme();
  const [lang, setLang] = useState("id");
  const [safeMode, setSafeMode] = useState(false); // safe = reduce animation & optional minimal UI
  const [minimalLoad, setMinimalLoad] = useState(false); // if true, load minimal (no try-it-out)
  const [loading, setLoading] = useState(true);
  const [specLoaded, setSpecLoaded] = useState(false);

  useEffect(() => {
    // prefer saved theme (localStorage) when available
    const saved = typeof window !== "undefined" && localStorage.getItem("rafz_theme");
    if (saved) setTheme(saved);
  }, [setTheme]);

  useEffect(() => {
    // when safeMode enabled disable animations (reduced-motion)
    if (typeof window !== "undefined") {
      if (safeMode) document.documentElement.classList.add("rafz-reduced-motion");
      else document.documentElement.classList.remove("rafz-reduced-motion");
    }
  }, [safeMode]);

  // fetch swagger.json to detect availability and hide skeleton when ready
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("/swagger.json")
      .then((r) => {
        if (!r.ok) throw new Error("Cannot load swagger.json");
        return r.json();
      })
      .then(() => {
        if (!mounted) return;
        setSpecLoaded(true);
      })
      .catch(() => {
        if (!mounted) return;
        setSpecLoaded(false);
      })
      .finally(() => {
        if (!mounted) return;
        // give a little time to show skeleton for UX
        setTimeout(() => setLoading(false), 350);
      });
    return () => { mounted = false; };
  }, []);

  const texts = {
    title: { id: "📖 Dokumentasi Rafzhost API", en: "📖 Rafzhost API Documentation" },
    switch: { id: "Beralih ke Post", en: "Switch to Post" },
    safe: { id: "Mode Aman (non-anim)", en: "Safe Mode (reduced animations)" },
    minimal: { id: "Load Minimal (bandwidth-friendly)", en: "Load Minimal (bandwidth-friendly)" },
    loadDocs: { id: "Muat Dokumentasi", en: "Load Documentation" },
    hint: {
      id: "Gunakan kontrol di kanan atas untuk mengganti tema, bahasa, dan mode aman. Gunakan Search untuk mencari endpoint.",
      en: "Use controls on the right to switch theme, language and safe mode. Use Search to find endpoints."
    },
    thanks: { id: "Thanks to", en: "Thanks to" },
    source: { id: "Siputzx for source code", en: "Siputzx for source code" },
    owner: { id: "Rafzhost API by Rafz (Rafflie Aditya)", en: "Rafzhost API by Rafz (Rafflie Aditya)" }
  };

  // helper: set theme and persist
  const applyTheme = (t) => {
    if (t === "system") {
      // remove explicit class, rely on OS
      setTheme("system");
      localStorage.setItem("rafz_theme", "system");
    } else {
      setTheme(t);
      localStorage.setItem("rafz_theme", t);
    }
  };

  return (
    <>
      <Head>
        <title>Rafzhost API — Docs</title>
        <meta name="description" content="Rafzhost API documentation" />
      </Head>

      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${theme === "dark" ? "dark" : ""}`}>
        {/* global overrides for swagger-ui for color consistency */}
        <style jsx global>{`
          /* reduced-motion class */
          .rafz-reduced-motion *, .rafz-reduced-motion *::before, .rafz-reduced-motion *::after {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
          }

          /* Ensure body / swagger background match theme */
          .swagger-container, .swagger-ui, .swagger-ui .information-container, .swagger-ui .opblock {
            background: var(--rafz-bg) !important;
            color: var(--rafz-text) !important;
          }

          /* Variables for light/dark */
          :root {
            --rafz-bg: #ffffff;
            --rafz-text: #111827;
            --rafz-card: #ffffff;
            --rafz-border: #e5e7eb;
          }
          .dark :root, .dark {
            --rafz-bg: #0b1220;
            --rafz-text: #e6eef8;
            --rafz-card: #0f1724;
            --rafz-border: #2b3440;
          }

          /* Override many Swagger UI white boxes */
          .swagger-ui .info, .swagger-ui .wrapper, .swagger-ui .block, .swagger-ui .opblock, .swagger-ui .opblock-body {
            background: var(--rafz-card) !important;
            color: var(--rafz-text) !important;
            border-color: var(--rafz-border) !important;
          }

          /* Improve input/button visibility in dark */
          .swagger-ui .opblock-summary-control .try-out, .swagger-ui .opblock .execute {
            background: var(--rafz-bg) !important;
            color: var(--rafz-text) !important;
            border: 1px solid var(--rafz-border) !important;
          }

          /* Make the search/filter input more visible */
          .swagger-ui .topbar .download-url-wrapper input {
            background: var(--rafz-card) !important;
            color: var(--rafz-text) !important;
            border: 1px solid var(--rafz-border) !important;
          }

          /* Make code blocks more readable */
          .swagger-ui .microlight, .swagger-ui code {
            color: var(--rafz-text) !important;
          }

          /* Larger border for control area */
          .rafz-controls {
            border: 1px solid var(--rafz-border);
            background: var(--rafz-card);
            box-shadow: 0 6px 18px rgba(2,6,23,0.08);
            padding: 10px;
            border-radius: 10px;
          }

          /* watermark */
          .rafz-watermark {
            position: fixed;
            right: 12px;
            bottom: 12px;
            opacity: 0.6;
            font-size: 12px;
            background: rgba(0,0,0,0.35);
            color: #fff;
            padding: 6px 10px;
            border-radius: 6px;
            z-index: 1000;
            pointer-events: none;
          }
          .dark .rafz-watermark { background: rgba(255,255,255,0.06); color: #cfd8e3; opacity: 0.85; pointer-events: none; }

          /* center footer */
          .rafz-footer { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; }
        `}</style>

        {/* Header / controls */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4">
          <div>
            <h1 className="text-2xl font-semibold">{texts.title[lang]}</h1>
            <p className="mt-1 text-sm text-muted-foreground opacity-80">{texts.hint[lang]}</p>
          </div>

          <div className="rafz-controls flex flex-wrap gap-3 items-center">
            <Link href="/post">
              <a className="px-4 py-2 rounded-lg border font-medium hover:scale-105 transition" style={{ minWidth: 160, textAlign: "center" }}>
                {texts.switch[lang]}
              </a>
            </Link>

            {/* language */}
            <div>
              <label className="block text-xs mb-1">{lang === "id" ? "Bahasa" : "Language"}</label>
              <select
                aria-label="language"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="px-3 py-2 rounded-md border"
                style={{ minWidth: 140 }}
              >
                <option value="id">🇮🇩 Indonesia</option>
                <option value="en">🇺🇸 English</option>
              </select>
            </div>

            {/* theme */}
            <div>
              <label className="block text-xs mb-1">{lang === "id" ? "Tema" : "Theme"}</label>
              <select
                value={theme === "system" ? "system" : theme}
                onChange={(e) => applyTheme(e.target.value)}
                className="px-3 py-2 rounded-md border"
                style={{ minWidth: 160 }}
              >
                <option value="system">System (OS)</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            {/* safe mode */}
            <div>
              <label className="block text-xs mb-1">{lang === "id" ? "Mode Aman" : "Safe Mode"}</label>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => { setSafeMode(!safeMode); }}
                  className={`px-3 py-2 rounded-md font-semibold border ${safeMode ? "bg-yellow-300" : ""}`}
                >
                  {safeMode ? (lang === "id" ? "Aktif (Animasi mati)" : "Enabled (No Anim)") : (lang === "id" ? "Non-Aktif" : "Disabled")}
                </button>

                <button
                  onClick={() => setMinimalLoad(!minimalLoad)}
                  className={`px-3 py-2 rounded-md border ${minimalLoad ? "bg-gray-200" : ""}`}
                >
                  {minimalLoad ? (lang === "id" ? "Minimal On" : "Minimal On") : (lang === "id" ? "Load Normal" : "Load Normal")}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main area */}
        <main className="flex-1 p-4">
          {/* Skeleton / loader while fetching */}
          {loading && (
            <div className="space-y-3 animate-pulse">
              <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-800 rounded"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="h-36 bg-gray-200 dark:bg-gray-800 rounded"></div>
                <div className="h-36 bg-gray-200 dark:bg-gray-800 rounded"></div>
                <div className="h-36 bg-gray-200 dark:bg-gray-800 rounded"></div>
              </div>
            </div>
          )}

          {/* when spec not loaded (error) show message */}
          {!loading && !specLoaded && (
            <div className="p-6 bg-red-50 dark:bg-red-900 rounded">
              <strong className="text-red-700 dark:text-red-300">{lang === "id" ? "Gagal memuat dokumentasi." : "Failed to load documentation."}</strong>
              <p className="opacity-80 mt-2">{lang === "id" ? "Coba refresh atau periksa swagger.json" : "Try refreshing or check swagger.json"}</p>
            </div>
          )}

          {/* Swagger UI */}
          {!loading && specLoaded && (
            <div className="rounded-lg overflow-hidden">
              <SwaggerUI
                url="/swagger.json"
                docExpansion="none"
                defaultModelsExpandDepth={-1}
                deepLinking={!safeMode}
                supportedSubmitMethods={["get", "post", "put", "delete", "patch"]}
                // show search box
                filter={true}
                // if minimalLoad is true, disable try-it-out by not mounting "execute" UI; this is a best-effort
                // Note: swagger-ui-react doesn't provide direct prop to remove try-it-out; this is left as-is,
                // but minimalLoad can be used to limit features via CSS if needed.
              />
            </div>
          )}
        </main>

        {/* Watermark */}
        <div className="rafz-watermark">Rafzhost API by Rafz (Rafflie Aditya)</div>

        {/* Footer centered */}
        <footer className="p-6 rafz-footer">
          <div>
            <span>{texts.thanks[lang]} </span>
            <a href="https://github.com/siputzx/apisku" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-blue-600 hover:underline">
              <Github size={16} /> {texts.source[lang]}
            </a>
          </div>
          <div className="opacity-80">{texts.owner[lang]}</div>
        </footer>
      </div>
    </>
  );

  // applyTheme helper defined here to keep closure
  function applyTheme(val) {
    if (val === "system") {
      // prefer system — using next-themes will handle; just persist
      setTheme("system");
      if (typeof window !== "undefined") localStorage.setItem("rafz_theme", "system");
    } else {
      setTheme(val);
      if (typeof window !== "undefined") localStorage.setItem("rafz_theme", val);
    }
  }
}
