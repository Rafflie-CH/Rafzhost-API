// Import library dan konfigurasi
import swaggerUi from 'swagger-ui-express';
// PASTIKAN PATH INI BENAR:
import swaggerSpec from '../../swagger'; 

const handler = (req, res) => {
  // Gunakan swagger-ui-express untuk melayani UI utama
  swaggerUi.setup(swaggerSpec, { 
    explorer: true,
    // PENTING: Menetapkan judul situs membantu menstabilkan jalur aset di lingkungan Next.js.
    customSiteTitle: "Rafzhost API Docs", 
    // Custom CSS untuk fix word wrap (sudah terpasang)
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
  
  // Jika bukan /api/docs, anggap itu adalah request untuk aset statis (CSS/JS)
  return res.swaggerSetup(req, res);
};
