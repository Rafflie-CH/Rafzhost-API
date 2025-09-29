import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { createSwaggerSpec } from "next-swagger-doc";

export default function ApiDoc({ spec }) {
  return <SwaggerUI spec={spec} />;
}

export async function getStaticProps() {
  const spec = createSwaggerSpec({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Rafzhost API",
        version: "1.0.0",
        description: "Dokumentasi Swagger untuk Rafzhost API"
      }
    },
    apiFolder: "src/pages/api"
  });

  return {
    props: {
      spec
    }
  };
}
