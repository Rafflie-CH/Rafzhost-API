// src/pages/index.js
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [safeMode, setSafeMode] = useState(false);

  return (
    <div className={`container ${safeMode ? "safe-mode" : ""}`}>
      <header className="header">
        <h1>🚀 Rafzhost API</h1>
        <p className="subtitle">Selamat datang di API resmi Rafzhost</p>
        <div className="nav-buttons">
          <Link href="/docs"><button className="btn docs">📖 Docs</button></Link>
          <Link href="/post"><button className="btn post">📮 Post</button></Link>
          <button
            className="btn theme"
            onClick={() => {
              const current = localStorage.getItem("theme") || "system";
              const next = current === "light" ? "dark" : current === "dark" ? "system" : "light";
              localStorage.setItem("theme", next);
              window.location.reload();
            }}
          >
            🎨 Ganti Tema
          </button>
          <button
            className="btn safe"
            onClick={() => setSafeMode(!safeMode)}
          >
            {safeMode ? "⚡ Mode Normal" : "🛡️ Safe Mode"}
          </button>
          <button className="btn lang">🌐 Ganti Bahasa</button>
        </div>
      </header>

      <main>
        <section className="card">
          <h2>Cari Endpoint</h2>
          <input className="search" placeholder="🔎 Ketik nama endpoint..." />
        </section>
      </main>

      <footer className="footer">
        <p className="watermark">© Rafzhost API by Rafz (Rafflie Aditya)</p>
        <div className="thanks centered">
          <a
            href="https://github.com/siputzx/apisku"
            target="_blank"
            rel="noopener noreferrer"
            className="thanks-link"
          >
            <svg
              viewBox="0 0 16 16"
              width="16"
              height="16"
              aria-hidden="true"
              focusable="false"
              className="github-icon"
            >
              <path
                fill="currentColor"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54..."
              />
            </svg>
            Siputzx for source code
          </a>
        </div>
      </footer>
    </div>
  );
}
