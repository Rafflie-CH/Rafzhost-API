import { useState, useEffect } from "react";

const defaultThemes = {
  light: { "--bg-color": "#ffffff", "--text-color": "#111827", "--primary-color": "#4f46e5" },
  dark: { "--bg-color": "#111827", "--text-color": "#ffffff", "--primary-color": "#4f46e5" },
};
const paletteColors = ["#4f46e5", "#10b981", "#3b82f6", "#ef4444", "#f59e0b", "#8b5cf6"];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");
  const [customColor, setCustomColor] = useState(defaultThemes.light["--primary-color"]);
  const [previewColor, setPreviewColor] = useState(customColor);

  useEffect(() => {
    const storedTheme = localStorage.getItem("rafzhost-theme");
    const storedColor = localStorage.getItem("rafzhost-custom-color");
    if (storedTheme) setTheme(storedTheme);
    if (storedColor) setCustomColor(storedColor);
  }, []);

  useEffect(() => {
    applyTheme(theme, theme === "custom" ? customColor : null);
  }, [theme, customColor]);

  const applyTheme = (t, color) => {
    const themeVars = t === "custom"
      ? { "--bg-color": "#f0f0f0", "--text-color": "#111", "--primary-color": color }
      : defaultThemes[t];

    Object.entries(themeVars).forEach(([varName, value]) => {
      document.documentElement.style.setProperty(varName, value);
    });

    localStorage.setItem("rafzhost-theme", t);
    if (t === "custom") localStorage.setItem("rafzhost-custom-color", color);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ display: "flex", gap: "10px" }}>
        {["light", "dark", "custom"].map((t) => (
          <button key={t} onClick={() => setTheme(t)} style={{ padding: "8px 12px", borderRadius: "6px", border: theme===t?"2px solid #000":"1px solid #ccc", cursor:"pointer" }}>
            {t.charAt(0).toUpperCase()+t.slice(1)}
          </button>
        ))}
      </div>

      {theme === "custom" && (
        <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
          {paletteColors.map((c) => (
            <div key={c} onClick={() => setCustomColor(c)} onMouseEnter={() => setPreviewColor(c)} onMouseLeave={() => setPreviewColor(customColor)}
              style={{ width:"30px", height:"30px", borderRadius:"6px", cursor:"pointer", border: customColor===c?"2px solid #000":"1px solid #ccc", backgroundColor:c, transition:"transform 0.3s" }}
            />
          ))}
          <button onClick={() => applyTheme("custom", previewColor)} style={{ padding:"8px 12px", borderRadius:"6px", border:"1px solid #ccc", cursor:"pointer" }}>Apply Preview</button>
        </div>
      )}
    </div>
  );
}
