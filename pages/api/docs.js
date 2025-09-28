// pages/api/docs.js

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../../swagger'; 

const handler = (req, res) => {
  // HAPUS VARIABEL host, protocol, dan baseUrl.
  // KITA AKAN GUNAKAN JALUR RELATIF SAJA.
  
  // Tentukan path relatif ke aset Swagger yang akan di-serve oleh swaggerUi.serve
  // Vercel akan secara otomatis mengisi protokol dan host.
  const assetPath = '/api/docs'; 

  swaggerUi.setup(swaggerSpec, { 
    explorer: true,
    customSiteTitle: "Rafzhost API Documentation", 
    
    // 💥 FIX TERAKHIR: GUNAKAN JALUR RELATIF PENDEK
    customCssUrl: [
      `${assetPath}/swagger-ui.css`, 
      `${assetPath}/swagger-ui-standalone-preset.css` 
    ],
    customJsUrl: [
      `${assetPath}/swagger-ui-bundle.js`,
      `${assetPath}/swagger-ui-standalone-preset.js`,
      `${assetPath}/swagger-ui-init.js` // Pastikan init.js juga ada
    ],
    // Hapus opsi 'url' atau 'deepLinking' jika ada, untuk menghindari konflik.

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
    res.swaggerSetup = swaggerUi.serve;
  }
  
  if (req.url === '/api/docs') {
    res.status(200);
    return handler(req, res);
  }
  
  // Ini yang melayani aset statis Swagger (CSS/JS)
  return res.swaggerSetup(req, res);
};
