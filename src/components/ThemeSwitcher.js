import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // pastikan komponen hanya render setelah mounted (fix hydration error)
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // untuk debug (cek di console browser kalau toggle tidak jalan)
  console.log("Current theme:", theme, "System:", systemTheme);

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  );
}
