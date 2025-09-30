import { useEffect, useState } from "react";

export default function ThemeSwitcher({ theme, setTheme }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
      {["system","light","dark"].map((t) => (
        <button
          key={t}
          style={{
            padding: "6px 12px",
            borderRadius: "6px",
            border: theme===t?"2px solid var(--accent-color)":"1px solid #ccc",
            background: "var(--bg-color)",
            color: "var(--text-color)",
          }}
          onClick={() => setTheme(t)}
        >
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </button>
      ))}
    </div>
  );
}
