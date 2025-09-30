import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";
import ThemeSwitcher from "../components/ThemeSwitcher";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function Docs({ theme, setTheme }) {
  return (
    <div>
      <h2>Theme</h2>
      <ThemeSwitcher theme={theme} setTheme={setTheme} />
      <SwaggerUI url="/swagger.json" />
    </div>
  );
}
