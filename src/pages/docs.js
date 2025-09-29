// src/pages/docs.js
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";
import { createSwaggerSpec } from "next-swagger-doc";

const SwaggerUI = dynamic(import("swagger-ui-react"), { ssr: false });

export async function getStaticProps() {
  const spec = createSwaggerSpec({
    title: "Rafzhost API",
    version: "1.0.0",
    apiFolder: "src/pages/api", // folder endpoint Next.js API kamu
  });

  return {
    props: {
      spec,
    },
  };
}

export default function ApiDocs({ spec }) {
  return <SwaggerUI spec={spec} />;
}
