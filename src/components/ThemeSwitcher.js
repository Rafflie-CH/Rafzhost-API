import { useState, useEffect } from "react";

// Palet warna bebas
const palettes = [
  { name:"Default", bg:"#ffffff", text:"#111827", primary:"#4f46e5" },
  { name:"Dark", bg:"#1f2937", text:"#f9fafb", primary:"#6366f1" },
  { name:"Mint", bg:"#f0fdf4", text:"#065f46", primary:"#10b981" },
  { name:"Pink", bg:"#fff0f6", text:"#831843", primary:"#ec4899" },
];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("rafzhost-theme");
    if (saved) setTheme(Number(saved));
  }, []);

  useEffect(() => {
    const t = palettes[theme];
    document.documentElement.style.setProperty("--bg-color", t.bg);
    document.documentElement.style.setProperty("--text-color", t.text);
    document.documentElement.style.setProperty("--primary-color", t.primary);
    localStorage.setItem("rafzhost-theme", theme);
  }, [theme]);

  return (
    <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
      {palettes.map((p, idx) => (
        <div key={idx} className="theme-preview"
          style={{ backgroundColor:p.bg, border: theme===idx ? "2px solid var(--primary-color)" : "1px solid #ccc" }}
          title={p.name}
          onClick={()=>setTheme(idx)}
        ></div>
      ))}
    </div>
  );
}
