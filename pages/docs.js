import { useEffect } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import ThemeSwitcher from "../src/components/ThemeSwitcher";
import Link from "next/link";

export default function DocsPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Rafzhost API Docs</h1>

      {/* Navigasi ke POST */}
      <Link href="/post">
        <button style={{ marginBottom: "20px" }}>Go to POST API Page</button>
      </Link>

      {/* Theme switcher */}
      <div style={{
        marginBottom: "30px",
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "8px"
      }}>
        <h2>Theme</h2>
        <ThemeSwitcher />
      </div>

      {/* Swagger UI */}
      <SwaggerUI
        url="/swagger.json"  // langsung ke public/swagger.json
        docExpansion="none"
        deepLinking={true}
      />

      <footer style={{ marginTop: "40px", textAlign: "center" }}>
        <p>Rafzhost API &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
