import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("system");

  // Cek localStorage saat load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      let activeTheme = theme;

      if (theme === "system") {
        activeTheme = prefersDark.matches ? "dark" : "light";
      }

      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(activeTheme);

      // Simpan pilihan user
      localStorage.setItem("theme", theme);
    };

    applyTheme();

    // Jika mode system, listen perubahan OS theme
    if (theme === "system") {
      prefersDark.addEventListener("change", applyTheme);
      return () => prefersDark.removeEventListener("change", applyTheme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
