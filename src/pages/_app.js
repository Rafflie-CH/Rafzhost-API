import "@/styles/globals.css";
import { useEffect, useState } from "react";

export default function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (t) => {
      let value = t;
      if (t === "system") value = prefersDark.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", value);
      localStorage.setItem("theme", t);
    };

    const saved = localStorage.getItem("theme") || "system";
    setTheme(saved);
    applyTheme(saved);

    prefersDark.addEventListener("change", () => applyTheme(theme));
  }, [theme]);

  return <Component {...pageProps} theme={theme} setTheme={setTheme} />;
}
