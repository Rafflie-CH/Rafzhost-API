import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { getSwaggerSpec } from "next-swagger-doc";

export default function DocsPage({ spec }) {
  return <SwaggerUI spec={spec} />;
}

// generate swagger spec dari config next-swagger-doc
export async function getStaticProps() {
  const spec = await getSwaggerSpec(); // otomatis ambil dari next-swagger-doc.config.js
  return { props: { spec } };
}
