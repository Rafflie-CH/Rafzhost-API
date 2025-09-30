import ThemeSwitcher from "../components/ThemeSwitcher";

export default function Post({ theme, setTheme }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Post Endpoint</h1>
      <ThemeSwitcher theme={theme} setTheme={setTheme} />
      <p>Gunakan endpoint POST melalui form atau tool seperti Postman.</p>
    </div>
  );
}
