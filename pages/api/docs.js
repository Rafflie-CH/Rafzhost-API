// pages/api/docs.js

import swaggerUi from 'swagger-ui-express';
// PASTIKAN PATH INI BENAR (Naik 2 tingkat ke root):
import swaggerSpec from '../../swagger'; 

const handler = (req, res) => {
  // Gunakan swagger-ui-express untuk melayani UI utama
  swaggerUi.setup(swaggerSpec, { 
    explorer: true,
    // Menetapkan judul situs membantu menstabilkan jalur aset Swagger UI di Next.js.
    customSiteTitle: "Rafzhost API Documentation", 
    // INI ADALAH CUSTOM CSS UNTUK FIX WORD WRAP DI RESPONSE BODY SWAGGER
    customCss: `
      /* Target elemen yang menampilkan response body JSON */
      .response-col_body pre, 
      .response-body pre, 
      .opblock-body pre {
        white-space: pre-wrap !important; /* Memungkinkan pemecahan baris */
        word-break: break-all !important; /* Memaksa pemecahan string panjang */
        overflow-x: hidden !important;   /* Menghilangkan horizontal scrollbar */
      }
    `
  })(req, res);
};

// Wrapper untuk Next.js API Route
export default (req, res) => {
  if (!res.swaggerSetup) {
    // Fungsi serve ini yang melayani file statis Swagger (CSS/JS)
    res.swaggerSetup = swaggerUi.serve;
  }
  
  // Jika URL-nya adalah /api/docs, tampilkan UI (HTML utama)
  if (req.url === '/api/docs') {
    // Kami mengirim status 200 secara eksplisit sebelum handler dipanggil
    res.status(200);
    return handler(req, res);
  }
  
  // Selain itu, layani aset statis (seperti CSS, JS) dari Swagger
  return res.swaggerSetup(req, res);
};
