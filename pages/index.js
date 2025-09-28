export default async function handler(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.end(`
    <html>
      <head>
        <title>Rafzhost API</title>
      </head>
      <body style="font-family: sans-serif; padding: 20px;">
        <h1>🚀 Rafzhost API</h1>
        <p>Server is running on Vercel.</p>
        <h3>Available endpoints:</h3>
        <ul>
          <li><a href="/api/downloader/tiktok?url=https://vt.tiktok.com/...">TikTok Downloader</a></li>
          <li><a href="/api/downloader/instagram?url=https://www.instagram.com/p/...">Instagram Downloader</a></li>
          <li><a href="/api/downloader/youtube?url=https://youtu.be/...">YouTube Downloader</a></li>
          <li><a href="/api/search/pinterest?query=cat">Pinterest Search</a></li>
          <li><a href="/api/tools/shortlink?url=https://google.com">Shortlink Generator</a></li>
        </ul>
      </body>
    </html>
  `);
}
