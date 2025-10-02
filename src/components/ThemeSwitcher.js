// src/components/ThemeSwitcher.js
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("theme") || "system";
    setTheme(stored);
    applyTheme(stored, false);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      if ((localStorage.getItem("theme") || "system") === "system") {
        applyTheme("system", false);
      }
    };
    if (mq.addEventListener) mq.addEventListener("change", onSystemChange);
    else mq.addListener(onSystemChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onSystemChange);
      else mq.removeListener(onSystemChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function applyTheme(selected, persist = true) {
    if (typeof document === "undefined") return;
    if (selected === "system") {
      const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", systemIsDark);
      document.documentElement.setAttribute("data-theme", systemIsDark ? "dark" : "light");
    } else {
      document.documentElement.classList.toggle("dark", selected === "dark");
      document.documentElement.setAttribute("data-theme", selected);
    }
    setTheme(selected);
    if (persist) localStorage.setItem("theme", selected);
  }

  return (
    <label className="inline-flex items-center gap-2">
      <span className="sr-only">Theme</span>
      <select
        value={theme}
        onChange={(e) => applyTheme(e.target.value)}
        className="px-3 py-1 rounded border bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  );
}
