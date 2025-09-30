import "../styles/globals.css";
import { useEffect, useState } from "react";

export default function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = (t) => {
      let active = t==="system"? (prefersDark.matches?"dark":"light") : t;
      document.documentElement.setAttribute("data-theme", active);
    };
    applyTheme(theme);
    const listener = () => applyTheme(theme);
    prefersDark.addEventListener("change", listener);
    return () => prefersDark.removeEventListener("change", listener);
  }, [theme]);

  return <Component {...pageProps} theme={theme} setTheme={setTheme} />;
}
