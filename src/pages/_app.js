import "../styles/globals.css";
import { useEffect, useState } from "react";

export default function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "system";
    setTheme(saved);

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = (t) => {
      let active = t==="system"? (prefersDark.matches?"dark":"light") : t;
      document.documentElement.setAttribute("data-theme", active);
    };

    applyTheme(saved);
    const listener = () => applyTheme(saved);
    prefersDark.addEventListener("change", listener);
    return () => prefersDark.removeEventListener("change", listener);
  }, []);

  const handleThemeChange = (t) => {
    setTheme(t);
    localStorage.setItem("theme", t);
    let active = t==="system"? (window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"): t;
    document.documentElement.setAttribute("data-theme", active);
  };

  return <Component {...pageProps} theme={theme} setTheme={handleThemeChange} />;
}
