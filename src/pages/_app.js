import "@/styles/globals.css";
import { useEffect, useState } from "react";

export default function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (t) => {
      if (t === "system") {
        document.documentElement.setAttribute(
          "data-theme",
          prefersDark.matches ? "dark" : "light"
        );
      } else {
        document.documentElement.setAttribute("data-theme", t);
      }
    };

    applyTheme(theme);

    const listener = () => applyTheme(theme);
    prefersDark.addEventListener("change", listener);

    return () => prefersDark.removeEventListener("change", listener);
  }, [theme]);

  return <Component {...pageProps} theme={theme} setTheme={setTheme} />;
}
