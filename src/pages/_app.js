// src/pages/_app.js
import "../styles/globals.css";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // apply theme from localStorage (system/light/dark)
    const applyTheme = (sel) => {
      if (sel === "system") {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.classList.toggle("dark", isDark);
        document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
      } else {
        document.documentElement.classList.toggle("dark", sel === "dark");
        document.documentElement.setAttribute("data-theme", sel);
      }
    };

    const storedTheme = localStorage.getItem("theme") || "system";
    applyTheme(storedTheme);

    // apply safe mode (disable animations)
    const safe = localStorage.getItem("safeMode") === "true";
    document.documentElement.classList.toggle("no-anim", safe);

    // respond to OS theme changes only if system selected
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if ((localStorage.getItem("theme") || "system") === "system") {
        applyTheme("system");
      }
    };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  return <Component {...pageProps} />;
}
