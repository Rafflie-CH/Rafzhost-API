// Import library dan konfigurasi
import swaggerUi from 'swagger-ui-express';
// Pastikan path ini benar (naik satu tingkat dari pages/api ke root):
import swaggerSpec from '../../swagger'; 

const handler = (req, res) => {
  // Gunakan swagger-ui-express untuk melayani UI utama
  swaggerUi.setup(swaggerSpec, { 
    explorer: true,
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
  // Fungsi ini memastikan aset statis (CSS/JS) Swagger juga terlayani
  if (!res.swaggerSetup) {
    res.swaggerSetup = swaggerUi.serve;
  }
  
  // Jika URL-nya adalah /api/docs, tampilkan UI
  if (req.url === '/api/docs') {
    return handler(req, res);
  }
  
  // Selain itu, layani aset statis (seperti CSS, JS) dari Swagger
  return res.swaggerSetup(req, res);
};
