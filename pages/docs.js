import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import swaggerJSDoc from "swagger-jsdoc";
import Link from "next/link";

export default function DocsPage({ spec }) {
  return (
    <div>
      <div style={{ marginBottom: 20, textAlign: "center" }}>
        <Link href="/post">
          <button
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              background: "#4f46e5",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "all 0.3s",
            }}
            onMouseOver={e => e.currentTarget.style.background = "#3730a3"}
            onMouseOut={e => e.currentTarget.style.background = "#4f46e5"}
          >
            Go to Post
          </button>
        </Link>
      </div>
      <SwaggerUI spec={spec} />
    </div>
  );
}

export async function getStaticProps() {
  let swaggerSpec = swaggerJSDoc({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Rafzhost API",
        version: "1.0.0",
        description: "API Documentation Rafzhost",
      },
    },
    apis: ["./pages/api/**/*.js"],
  });

  // Filter hanya GET endpoints
  const paths = {};
  Object.keys(swaggerSpec.paths).forEach(path => {
    const methods = Object.keys(swaggerSpec.paths[path])
      .filter(m => m.toLowerCase() === "get"); // hanya GET
    if (methods.length) {
      paths[path] = {};
      methods.forEach(m => (paths[path][m] = swaggerSpec.paths[path][m]));
    }
  });
  swaggerSpec.paths = paths;

  return { props: { spec: swaggerSpec } };
}
