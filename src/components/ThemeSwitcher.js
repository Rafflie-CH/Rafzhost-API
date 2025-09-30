import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="px-3 py-2 rounded border bg-white dark:bg-gray-800 dark:text-white"
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
