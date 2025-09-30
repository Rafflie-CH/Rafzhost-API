"use client"; // kalau pakai app dir, tapi di pages router tidak wajib
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

export default function ThemeSwitcher() {
  const themeCtx = useContext(ThemeContext);

  if (!themeCtx) {
    // fallback biar gak error pas prerender
    return null;
  }

  const { theme, setTheme } = themeCtx;

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setTheme("system")}
        className={`px-3 py-1 rounded ${
          theme === "system" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"
        }`}
      >
        System
      </button>
      <button
        onClick={() => setTheme("light")}
        className={`px-3 py-1 rounded ${
          theme === "light" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"
        }`}
      >
        Light
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`px-3 py-1 rounded ${
          theme === "dark" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"
        }`}
      >
        Dark
      </button>
    </div>
  );
}
