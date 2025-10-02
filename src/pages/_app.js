// src/pages/_app.js
import "@/styles/globals.css";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("theme") || "system";
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
    applyTheme(stored);

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
