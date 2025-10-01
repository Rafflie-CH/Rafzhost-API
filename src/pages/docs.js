import dynamic from "next/dynamic";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function Docs() {
  return (
    <div className="p-5 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Rafzhost API Docs</h1>
      <a href="/post">
        <button className="mb-4 px-4 py-2 rounded bg-blue-500 text-white">
          Go to POST API Page
        </button>
      </a>

      {/* Theme Switcher */}
      <div className="mb-6 border p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Theme</h2>
        <ThemeSwitcher />
      </div>

      {/* Swagger UI */}
      <div className="swagger-ui">
        <SwaggerUI url="/swagger.json" />
      </div>
    </div>
  );
}
