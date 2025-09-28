// pages/api/docs.js
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../../swagger'; 

const handler = (req, res) => {
  // HAPUS SEMUA VARIABEL PATH SEPERTI assetPath

  swaggerUi.setup(swaggerSpec, { 
    explorer: true,
    customSiteTitle: "Rafzhost API Documentation", 
    
    // 💥 SOLUSI TERAKHIR: GUNAKAN PATH RELATIF PALING MINIMAL
    // Kita hapus /api/docs dari customCssUrl/customJsUrl
    // Kita biarkan path-nya terlihat seperti ini:
    customCssUrl: [
      '/swagger-ui.css', // HANYA FILE NAME, BUKAN FULL PATH DENGAN /api/docs
      '/swagger-ui-standalone-preset.css' 
    ],
    customJsUrl: [
      '/swagger-ui-bundle.js',
      '/swagger-ui-standalone-preset.js',
      '/swagger-ui-init.js'
    ],
    
    // FIX WORD WRAP
    customCss: `
      .response-col_body pre, .response-body pre, .opblock-body pre {
        white-space: pre-wrap !important; word-break: break-all !important; 
        overflow-x: hidden !important;   
      }
    `
  })(req, res);
};

// Wrapper untuk Next.js API Route
export default (req, res) => {
  if (!res.swaggerSetup) {
    res.swaggerSetup = swaggerUi.serve;
  }
  
  if (req.url === '/api/docs') {
    res.status(200);
    return handler(req, res);
  }
  
  // Ini yang melayani aset statis Swagger (CSS/JS)
  // Perhatikan: Karena kita menggunakan customJsUrl/customCssUrl minimalis di atas,
  // request yang masuk ke sini akan diproses sebagai /swagger-ui.css
  return res.swaggerSetup(req, res);
};
