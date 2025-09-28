// pages/api/docs.js

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../../swagger'; 

const handler = (req, res) => {
  // Path Relatif untuk aset statis (Vercel akan mengisi host/protocol)
  const assetPath = '/api/docs'; 

  swaggerUi.setup(swaggerSpec, { 
    explorer: true,
    customSiteTitle: "Rafzhost API Documentation", 
    
    // 💥 FIX FINAL: Menggunakan customCss dan customJs untuk mengendalikan path file
    // Kita hanya perlu memberitahu Swagger lokasi file utamanya, bukan semua file pembantunya.
    
    // Perhatikan: Kita tidak perlu memasukkan semua file .js dan .css ke array. 
    // Kita hanya perlu URL spesifikasi utama (swagger.json) jika ada,
    // tetapi karena kita menggunakan swaggerUi.setup(swaggerSpec), itu tidak diperlukan.
    
    // HAPUS customCssUrl dan customJsUrl yang sebelumnya
    // GANTI dengan options yang lebih sederhana dan aman di Vercel:
    
    // customJs: `${assetPath}/swagger-ui-bundle.js`, 
    // customCss: `${assetPath}/swagger-ui.css`, 

    // Opsi Teraman di Serverless (Memaksa Swagger mengambil dari path yang benar):
    customCss: `
      .swagger-ui { 
        /* Pastikan CSS utamanya di-load dengan benar */
        background-color: white !important; /* Test untuk melihat apakah CSS ini diload */
      }
      .response-col_body pre, 
      .response-body pre, 
      .opblock-body pre {
        white-space: pre-wrap !important; 
        word-break: break-all !important; 
        overflow-x: hidden !important;   
      }
    `
    // Kami TIDAK akan menggunakan customJs/customCssUrl lagi untuk menghindari konflik.
    // Kita akan biarkan swagger-ui-express menentukan path relatif internalnya.
  })(req, res);
};

// Wrapper untuk Next.js API Route
export default (req, res) => {
  if (!res.swaggerSetup) {
    res.swaggerSetup = swaggerUi.serve;
  }
  
  // Jika URL-nya adalah /api/docs, tampilkan UI (HTML utama)
  if (req.url === '/api/docs') {
    res.status(200);
    return handler(req, res);
  }
  
  // Jika URL-nya adalah path aset statis Swagger, layani aset
  // URL yang masuk ke sini akan terlihat seperti /api/docs/swagger-ui.css
  return res.swaggerSetup(req, res);
};
