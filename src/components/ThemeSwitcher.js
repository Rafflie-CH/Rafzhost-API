import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Theme</h3>
      <button
        onClick={() => changeTheme("system")}
        style={{
          background: theme === "system" ? "#4f46e5" : "#e5e7eb",
          color: theme === "system" ? "#fff" : "#111",
          marginRight: "10px",
          padding: "6px 12px",
          borderRadius: "6px",
        }}
      >
        System
      </button>
      <button
        onClick={() => changeTheme("light")}
        style={{
          background: theme === "light" ? "#4f46e5" : "#e5e7eb",
          color: theme === "light" ? "#fff" : "#111",
          marginRight: "10px",
          padding: "6px 12px",
          borderRadius: "6px",
        }}
      >
        Light
      </button>
      <button
        onClick={() => changeTheme("dark")}
        style={{
          background: theme === "dark" ? "#4f46e5" : "#e5e7eb",
          color: theme === "dark" ? "#fff" : "#111",
          padding: "6px 12px",
          borderRadius: "6px",
        }}
      >
        Dark
      </button>
    </div>
  );
}
