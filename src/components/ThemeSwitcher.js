import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // biar aman dari hydration error

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="theme" className="text-sm font-medium">
        Theme
      </label>
      <select
        id="theme"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="p-2 rounded border bg-white dark:bg-gray-800 dark:text-white"
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
