// pages/docs.js
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function ApiDoc({ swagger }) {
  // Komponen Next.js yang merender Swagger UI React
  return (
    <div style={{ padding: '20px' }}>
      <SwaggerUI spec={swagger} />
    </div>
  );
}

export const getStaticProps = async () => {
  // Next.js akan memanggil API Route kita untuk mendapatkan spesifikasi Swagger
  const res = await fetch('http://localhost:3000/api/doc-spec'); 
  const swagger = await res.json();

  return {
    props: {
      swagger,
    },
  };
};
