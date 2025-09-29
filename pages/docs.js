// pages/docs.js
import { useEffect, useRef } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import ThemeSwitcher from "../src/components/ThemeSwitcher";
import SkeletonLoader from "../src/components/SkeletonLoader";
import Link from "next/link";

export default function DocsPage() {
  const swaggerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px" }}>Rafzhost API Documentation</h1>

      <div style={{ marginBottom: "20px" }}>
        <Link href="/post">
          <button className="animated">Go to POST API Page</button>
        </Link>
      </div>

      <div style={{ marginBottom: "30px", border: "1px solid #ccc", padding: "15px", borderRadius: "8px" }}>
        <h2 style={{ marginBottom: "10px" }}>Customize Theme</h2>
        <ThemeSwitcher />
      </div>

      <div ref={swaggerRef}>
        <SwaggerUI url="/api/swagger" docExpansion="none" deepLinking={true} />
      </div>

      <SkeletonLoader />

      <footer style={{ marginTop: "40px", textAlign: "center", color: "var(--text-color)" }}>
        <p>Rafzhost API &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
