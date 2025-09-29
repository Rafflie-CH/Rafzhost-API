import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });
import "swagger-ui-react/swagger-ui.css";

export default function DocsPage() {
  const [theme, setTheme] = useState("light");
  const [customColor, setCustomColor] = useState("#6a0dad");
  const [reduceMotion, setReduceMotion] = useState(false);

  // Deteksi tema sistem (HP / PC)
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  // Update class body untuk tema
  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark", "theme-custom");
    document.body.classList.add(`theme-${theme}`);

    if (theme === "custom") {
      document.body.style.setProperty("--custom-bg", customColor);
      document.body.style.setProperty("--custom-text", "#ffffff");
      document.body.style.setProperty("--custom-accent", customColor);
    }
  }, [theme, customColor]);

  return (
    <div style={{ padding: "10px", minHeight: "100vh" }}>
      {/* Header */}
      <h1 style={{ textAlign: "center" }}>📘 Rafzhost API</h1>
      <p style={{ textAlign: "center" }}>
        Dokumentasi API Rafzhost dengan Swagger UI
      </p>

      {/* Theme Switcher */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center", justifyContent: "center", flexWrap: "wrap", marginBottom: "15px" }}>
        <label>
          <span style={{ marginRight: "5px" }}>🌗 Tema:</span>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={{ padding: "4px" }}
          >
            <option value="light">Terang ☀️</option>
            <option value="dark">Gelap 🌙</option>
            <option value="custom">Custom 🎨</option>
          </select>
        </label>

        {/* Custom Theme Picker */}
        {theme === "custom" && (
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <label htmlFor="colorPicker">🎨 Pilih warna tema:</label>
            <input
              id="colorPicker"
              type="color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              style={{ cursor: "pointer", width: "40px", height: "30px" }}
            />
            <button
              onClick={() => setCustomColor("#6a0dad")}
              style={{
                background: "#eee",
                border: "1px solid #aaa",
                borderRadius: "6px",
                padding: "4px 8px",
                cursor: "pointer",
              }}
            >
              Reset 🎯
            </button>
          </div>
        )}

        {/* Animasi Hemat */}
        <label>
          <input
            type="checkbox"
            checked={reduceMotion}
            onChange={(e) => setReduceMotion(e.target.checked)}
          />
          <span style={{ marginLeft: "5px" }}>⚡ Hemat Animasi</span>
        </label>
      </div>

      {/* Swagger UI */}
      <SwaggerUI url="/swagger.json" docExpansion="none" />
    </div>
  );
}
