// pages/api/docs.js

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../../swagger'; 

const handler = (req, res) => {
  // Ambil URL dasar (protokol + host) dari request (misal: https://rafzhost-api.vercel.app)
  const host = req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const baseUrl = `${protocol}://${host}`;
  
  // Tentukan path lengkap ke aset Swagger yang akan di-serve oleh swaggerUi.serve
  const assetPath = `${baseUrl}/api/docs`; 

  swaggerUi.setup(swaggerSpec, { 
    explorer: true,
    customSiteTitle: "Rafzhost API Documentation", 
    
    // 🚀 INI ADALAH FIX UNTUK ERROR 404 PADA ASSET
    // Paksa Swagger memuat asetnya dari jalur API kita sendiri
    customCssUrl: [
      `${assetPath}/swagger-ui.css`, 
      `${assetPath}/swagger-ui-standalone-preset.css` 
    ],
    customJsUrl: `${assetPath}/swagger-ui-bundle.js`, 

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
