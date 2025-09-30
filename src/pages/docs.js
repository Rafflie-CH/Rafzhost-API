import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import ThemeSwitcher from "../components/ThemeSwitcher";

export default function Docs({ theme, setTheme }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Rafzhost API Docs</h1>
      <ThemeSwitcher theme={theme} setTheme={setTheme} />
      <SwaggerUI url="/swagger.json" />
    </div>
  );
}
