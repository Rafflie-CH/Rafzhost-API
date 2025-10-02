import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Path ke swagger.json di public
  const filePath = path.join(process.cwd(), 'public', 'swagger.json');
  const swaggerSpec = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(swaggerSpec);
}
