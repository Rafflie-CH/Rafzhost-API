// src/components/ThemeSwitcher.js
import { useState, useEffect } from "react";

const themes = {
  light: { "--bg-color": "#ffffff", "--text-color": "#111827", "--primary-color": "#4f46e5" },
  dark: { "--bg-color": "#111827", "--text-color": "#ffffff", "--primary-color": "#4f46e5" },
  custom: { "--bg-color": "#f0f0f0", "--text-color": "#111", "--primary-color": "#3b82f6" },
};

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("rafzhost-theme");
    if (stored && themes[stored]) setTheme(stored);
  }, []);

  useEffect(() => {
    Object.entries(themes[theme]).forEach(([varName, value]) => {
      document.documentElement.style.setProperty(varName, value);
    });
    localStorage.setItem("rafzhost-theme", theme);
  }, [theme]);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {Object.keys(themes).map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          style={{
            padding: "10px 15px",
            cursor: "pointer",
            borderRadius: "6px",
            border: theme === t ? "2px solid #000" : "1px solid #ccc",
          }}
        >
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </button>
      ))}
    </div>
  );
}
