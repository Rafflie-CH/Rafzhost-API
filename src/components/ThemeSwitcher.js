export default function ThemeSwitcher({ theme, setTheme }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <button
        onClick={() => setTheme("system")}
        style={{ fontWeight: theme === "system" ? "bold" : "normal" }}
      >
        System
      </button>
      <button
        onClick={() => setTheme("light")}
        style={{ fontWeight: theme === "light" ? "bold" : "normal" }}
      >
        Light
      </button>
      <button
        onClick={() => setTheme("dark")}
        style={{ fontWeight: theme === "dark" ? "bold" : "normal" }}
      >
        Dark
      </button>
    </div>
  );
}
