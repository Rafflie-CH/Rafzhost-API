import "@/styles/globals.css";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Sinkron dengan tema sistem
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    const setTheme = () => {
      document.documentElement.setAttribute(
        "data-theme",
        prefersDark.matches ? "dark" : "light"
      );
    };

    setTheme();
    prefersDark.addEventListener("change", setTheme);

    return () => prefersDark.removeEventListener("change", setTheme);
  }, []);

  return <Component {...pageProps} />;
}
