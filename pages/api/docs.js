// pages/api/docs.js

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../../swagger'; 

const handler = (req, res) => {
  const assetPath = '/api/docs'; 

  swaggerUi.setup(swaggerSpec, { 
    explorer: true,
    customSiteTitle: "Rafzhost API Documentation", 
    
    // 💥 FIX FINAL DENGAN PATH RELATIF YANG BENAR:
    // Gunakan array untuk customJsUrl dan customCssUrl (JANGAN pakai string customJs/customCss tunggal)
    customCssUrl: [
      `${assetPath}/swagger-ui.css`, 
      `${assetPath}/swagger-ui-standalone-preset.css` 
    ],
    customJsUrl: [
      `${assetPath}/swagger-ui-bundle.js`,
      `${assetPath}/swagger-ui-standalone-preset.js`,
      `${assetPath}/swagger-ui-init.js`
    ],
    
    // FIX WORD WRAP - Ini adalah satu-satunya 'customCss' yang kita butuhkan
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
  
  return res.swaggerSetup(req, res);
};
