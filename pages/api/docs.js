// Import library dan konfigurasi
import swaggerUi from 'swagger-ui-express';
// Perhatikan path ini: './pages/api/docs.js' -> '../swagger' (naik satu tingkat ke root)
import swaggerSpec from '../../swagger'; 

// Handler untuk melayani UI utama Swagger
const handler = (req, res) => {
  // Ini memanggil fungsi setup untuk menampilkan halaman Swagger
  swaggerUi.setup(swaggerSpec, { 
    explorer: true,
    // Agar teks panjang di body response tidak meluber (masalah yang tadi Anda hadapi)
    customCss: `
      .response-col_body pre, 
      .response-body pre, 
      .opblock-body pre {
        white-space: pre-wrap !important;
        word-break: break-all !important;
        overflow-x: hidden !important;
      }
    `
  })(req, res);
};

// Next.js API Route Wrapper
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
