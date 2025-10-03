"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Github } from "lucide-react";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });
import "swagger-ui-react/swagger-ui.css";

export default function PostPage() {
  const { theme, setTheme } = useTheme();
  const [lang, setLang] = useState("id");
  const [safeMode, setSafeMode] = useState(false);
  const [minimalLoad, setMinimalLoad] = useState(false);
  const [loading, setLoading] = useState(true);
  const [specLoaded, setSpecLoaded] = useState(false);

  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("rafz_theme");
    if (saved) setTheme(saved);
  }, [setTheme]);

  useEffect(() => {
    if (safeMode) document.documentElement.classList.add("rafz-reduced-motion");
    else document.documentElement.classList.remove("rafz-reduced-motion");
  }, [safeMode]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("/swagger.json")
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then(() => { if (!mounted) return; setSpecLoaded(true); })
      .catch(() => { if (!mounted) return; setSpecLoaded(false); })
      .finally(() => { if (!mounted) return; setTimeout(() => setLoading(false), 350); });
    return () => { mounted = false; };
  }, []);

  const texts = {
    title: { id: "📤 Post Rafzhost API", en: "📤 Rafzhost API Post" },
    switch: { id: "Beralih ke Docs", en: "Switch to Docs" },
    safe: { id: "Mode Aman (non-anim)", en: "Safe Mode (reduced animations)" },
    minimal: { id: "Load Minimal (bandwidth-friendly)", en: "Load Minimal (bandwidth-friendly)" },
    loadDocs: { id: "Muat Post API", en: "Load Post API" },
    hint: {
      id: "Gunakan kontrol di kanan atas untuk mengganti tema, bahasa, dan mode aman.",
      en: "Use the controls on the top-right to change theme, language and safe mode."
    },
    thanks: { id: "Thanks to", en: "Thanks to" },
    source: { id: "Siputzx for source code", en: "Siputzx for source code" },
    owner: { id: "Rafzhost API by Rafz (Rafflie Aditya)", en: "Rafzhost API by Rafz (Rafflie Aditya)" }
  };

  return (
    <>
      <Head><title>Rafzhost API — Post</title></Head>
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${theme === "dark" ? "dark" : ""}`}>
        <style jsx global>{`
          .rafz-reduced-motion *, .rafz-reduced-motion *::before, .rafz-reduced-motion *::after {
            animation: none !important;
            transition: none !important;
          }
          /* reuse same vars as docs */
          :root { --rafz-bg: #ffffff; --rafz-text: #111827; --rafz-card:#ffffff; --rafz-border:#e5e7eb }
          .dark :root, .dark { --rafz-bg: #0b1220; --rafz-text: #e6eef8; --rafz-card:#0f1724; --rafz-border:#2b3440 }
          .swagger-ui .info, .swagger-ui .wrapper, .swagger-ui .block, .swagger-ui .opblock, .swagger-ui .opblock-body {
            background: var(--rafz-card) !important;
            color: var(--rafz-text) !important;
            border-color: var(--rafz-border) !important;
          }
        `}</style>

        <header className="flex items-start md:items-center justify-between gap-4 p-4">
          <div>
            <h1 className="text-2xl font-semibold text-green-700 dark:text-green-300">{texts.title[lang]}</h1>
            <p className="text-sm opacity-80">{texts.hint[lang]}</p>
          </div>

          <div className="rafz-controls flex flex-wrap gap-3 items-center border p-3 rounded-lg shadow">
            <Link href="/docs"><a className="px-4 py-2 rounded-lg border">{texts.switch[lang]}</a></Link>

            <div>
              <label className="block text-xs mb-1">{lang === "id" ? "Bahasa" : "Language"}</label>
              <select value={lang} onChange={(e) => setLang(e.target.value)} className="px-3 py-2 rounded-md border" style={{minWidth:140}}>
                <option value="id">🇮🇩 Indonesia</option>
                <option value="en">🇺🇸 English</option>
              </select>
            </div>

            <div>
              <label className="block text-xs mb-1">{lang === "id" ? "Tema" : "Theme"}</label>
              <select value={theme === "system" ? "system" : theme} onChange={(e)=>applyTheme(e.target.value)} className="px-3 py-2 rounded-md border" style={{minWidth:160}}>
                <option value="system">System (OS)</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            <div>
              <label className="block text-xs mb-1">{lang === "id" ? "Mode Aman" : "Safe Mode"}</label>
              <div style={{display:"flex", gap:8}}>
                <button onClick={()=>setSafeMode(!safeMode)} className={`px-3 py-2 rounded-md border ${safeMode ? "bg-yellow-300":""}`}>{safeMode ? (lang==="id"?"Aktif":"Enabled"):(lang==="id"?"Non-Aktif":"Disabled")}</button>
                <button onClick={()=>setMinimalLoad(!minimalLoad)} className={`px-3 py-2 rounded-md border ${minimalLoad ? "bg-gray-200":""}`}>{minimalLoad ? (lang==="id"?"Minimal On":"Minimal On"):(lang==="id"?"Load Normal":"Load Normal")}</button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4">
          {loading && (
            <div className="space-y-3 animate-pulse">
              <div className="h-6 w-1/4 bg-gray-200 dark:bg-gray-800 rounded"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="h-36 bg-gray-200 dark:bg-gray-800 rounded"></div>
                <div className="h-36 bg-gray-200 dark:bg-gray-800 rounded"></div>
                <div className="h-36 bg-gray-200 dark:bg-gray-800 rounded"></div>
              </div>
            </div>
          )}

          {!loading && !specLoaded && (
            <div className="p-6 bg-red-50 dark:bg-red-900 rounded">
              <strong className="text-red-700 dark:text-red-300">{lang==="id"?"Gagal memuat dokumentasi.":"Failed to load documentation."}</strong>
              <p className="opacity-80 mt-2">{lang==="id"?"Coba refresh atau periksa swagger.json":"Try refreshing or check swagger.json"}</p>
            </div>
          )}

          {!loading && specLoaded && (
            <div className="rounded-lg overflow-hidden">
              <SwaggerUI
                url="/swagger.json"
                docExpansion="none"
                defaultModelsExpandDepth={-1}
                deepLinking={!safeMode}
                filter={true}
                supportedSubmitMethods={["get","post","put","delete","patch"]}
              />
            </div>
          )}
        </main>

        <div className="rafz-watermark" style={{position:"fixed", right:12, bottom:12, opacity:0.7, fontSize:12, pointerEvents:"none"}}>Rafzhost API by Rafz (Rafflie Aditya)</div>

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

  function applyTheme(val) {
    if (val === "system") { setTheme("system"); if (typeof window!=="undefined") localStorage.setItem("rafz_theme","system"); }
    else { setTheme(val); if (typeof window!=="undefined") localStorage.setItem("rafz_theme", val); }
  }
}
