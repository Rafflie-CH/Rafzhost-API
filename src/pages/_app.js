// src/pages/_app.js
import "../styles/globals.css";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // init theme
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

    // init safe mode (reduced motion + disable animations)
    const safe = localStorage.getItem("safeMode") === "true";
    document.documentElement.classList.toggle("no-anim", safe);

    // watch OS theme changes if system selected
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if ((localStorage.getItem("theme") || "system") === "system") {
        applyTheme("system");
      }
    };
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, []);

  return <Component {...pageProps} />;
}
