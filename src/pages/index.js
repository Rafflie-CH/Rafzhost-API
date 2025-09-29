import { useEffect, useState } from "react";

export default function Home() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="container">
      <h1>📘 Rafzhost API</h1>
      <p>Dokumentasi API Rafzhost dengan Swagger UI</p>

      <button onClick={toggleTheme}>
        {theme === "light" ? "🌙 Gelap" : "☀️ Terang"}
      </button>
    </div>
  );
}
