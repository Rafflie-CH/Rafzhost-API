import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import swaggerJSDoc from "swagger-jsdoc";
import Link from "next/link";
import ThemeSwitcher from "../components/ThemeSwitcher";
import SkeletonLoader from "../components/SkeletonLoader";

export default function DocsPage({ spec }) {
  return (
    <div style={{ padding: 15 }}>
      <ThemeSwitcher />
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <Link href="/post">
          <button style={{
            padding: "10px 20px",
            borderRadius: 8,
            background: "#4f46e5",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "all 0.3s"
          }}
          onMouseOver={e => e.currentTarget.style.background = "#3730a3"}
          onMouseOut={e => e.currentTarget.style.background = "#4f46e5"}>
            Go to Post
          </button>
        </Link>
      </div>
      {!spec && <SkeletonLoader height={300} />}
      {spec && <SwaggerUI spec={spec} />}
    </div>
  );
}

export async function getStaticProps() {
  let swaggerSpec = swaggerJSDoc({
    definition: {
      openapi: "3.0.0",
      info: { title: "Rafzhost API", version: "1.0.0", description: "Rafzhost API Docs" },
    },
    apis: ["./pages/api/**/*.js"]
  });

  // Filter hanya GET
  const paths = {};
  Object.keys(swaggerSpec.paths).forEach(path => {
    const methods = Object.keys(swaggerSpec.paths[path]).filter(m => m.toLowerCase() === "get");
    if (methods.length) {
      paths[path] = {};
      methods.forEach(m => paths[path][m] = swaggerSpec.paths[path][m]);
    }
  });
  swaggerSpec.paths = paths;

  return { props: { spec: swaggerSpec } };
}
