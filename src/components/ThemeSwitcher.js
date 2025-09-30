export default function ThemeSwitcher({ theme, setTheme }) {
  const options = ["system", "light", "dark"];
  return (
    <div style={{ marginBottom: "20px" }}>
      {options.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          style={{
            marginRight: "10px",
            background: theme === t ? "#4f46e5" : "#e5e7eb",
            color: theme === t ? "#fff" : "#111",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </button>
      ))}
    </div>
  );
}
