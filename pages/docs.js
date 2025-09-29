import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import swaggerJSDoc from "swagger-jsdoc";

export default function DocsPage({ spec }) {
  return <SwaggerUI spec={spec} />;
}

export async function getStaticProps() {
  // Generate Swagger spec dari komentar JSDoc di pages/api
  const swaggerSpec = swaggerJSDoc({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Rafzhost API",
        version: "1.0.0",
        description: "API Documentation Rafzhost",
      },
    },
    apis: ["./pages/api/**/*.js"], // semua endpoint API
  });

  return { props: { spec: swaggerSpec } };
}
