import Link from "next/link";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const stored = localStorage.getItem("theme") || "system";
    setTheme(stored);
    applyTheme(stored);
  }, []);

  const applyTheme = (val) => {
    setTheme(val);
    localStorage.setItem("theme", val);
    if (val === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isDark);
    } else {
      document.documentElement.classList.toggle("dark", val === "dark");
    }
  };

  return (
    <div className="page">
      <header className="page-header header-centered">
        <h1>🚀 Rafzhost API</h1>
        <div className="header-controls">
          <Link href="/docs"><a className="btn outline">Docs</a></Link>
          <Link href="/post"><a className="btn outline">Post</a></Link>
          <select className="control-select" value={theme} onChange={(e)=>applyTheme(e.target.value)}>
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </header>

      <main className="page-main">
        <div className="card">
          <h2>Selamat Datang 👋</h2>
          <p>
            Ini adalah landing page API. Silakan pilih menu di atas untuk melihat dokumentasi
            atau mencoba endpoint.
          </p>
        </div>
      </main>

      <footer className="page-footer">
        <div className="footer-center">
          <span>Rafzhost API by Rafflie Aditya</span>
        </div>
      </footer>
    </div>
  );
}
