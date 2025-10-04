// src/pages/_app.js
import "../styles/globals.css";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const applyTheme = (sel) => {
      if (sel === "system") {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.classList.toggle("dark", isDark);
      } else {
        document.documentElement.classList.toggle("dark", sel === "dark");
      }
    };

    const stored = localStorage.getItem("theme") || "system";
    applyTheme(stored);

    const safe = localStorage.getItem("safeMode") === "true";
    if (safe) document.documentElement.classList.add("no-anim");

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
