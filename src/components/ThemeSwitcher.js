import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="flex gap-2 my-4">
      <button
        onClick={() => setTheme("system")}
        className={`px-3 py-1 rounded ${theme === "system" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        System
      </button>
      <button
        onClick={() => setTheme("light")}
        className={`px-3 py-1 rounded ${theme === "light" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        Light
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`px-3 py-1 rounded ${theme === "dark" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        Dark
      </button>
    </div>
  );
};

export default ThemeSwitcher;
