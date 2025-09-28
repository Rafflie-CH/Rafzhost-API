// pages/api/docs.js

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../../swagger'; 

const handler = (req, res) => {
  // Ambil URL dasar (protokol + host)
  const host = req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  
  // 💥 PERBAIKAN KRITIS: URL dasar untuk aset HARUS berakhir dengan /api/docs/ (dengan slash di akhir)
  // Karena aset statis akan dicari di /api/docs/swagger-ui.css
  const assetPath = `${protocol}://${host}/api/docs`; 

  swaggerUi.setup(swaggerSpec, { 
    explorer: true,
    customSiteTitle: "Rafzhost API Documentation", 
    
    // Perbaikan: Hapus baseUrl. Kita harus memastikan customCssUrl memiliki slash di akhir.
    // Kita hapus baseUrl karena sering menimbulkan duplikasi path di Next.js.
    
    // 💥 FIX FINAL UNTUK ERROR 404 PADA ASSET:
    // Kita menargetkan folder aset statis langsung relatif ke /api/docs
    customCssUrl: [
      `${assetPath}/swagger-ui.css`, // PENTING: Gunakan path lengkap
      `${assetPath}/swagger-ui-standalone-preset.css` 
    ],
    customJsUrl: [
      `${assetPath}/swagger-ui-bundle.js`,
      `${assetPath}/swagger-ui-standalone-preset.js`,
      `${assetPath}/swagger-ui-init.js` // Tambahkan init.js yang juga 404 di screenshot
    ],

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
