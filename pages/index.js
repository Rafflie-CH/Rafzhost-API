export default async function handler(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.end(`
    <html>
      <head>
        <title>Rafzhost API Dashboard</title>
        <style>
          body { font-family: Arial, sans-serif; background: #0f0f1a; color: #eee; margin: 0; padding: 20px; }
          h1 { color: #8b5cf6; }
          .card { background: #1a1a2e; padding: 20px; border-radius: 12px; margin-bottom: 20px; }
          label { display: block; margin: 8px 0 4px; }
          input { width: 100%; padding: 8px; border-radius: 6px; border: none; margin-bottom: 12px; }
          button { background: #8b5cf6; color: white; padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer; }
          pre { background: #0d0d1a; padding: 12px; border-radius: 8px; color: #0f0; }
        </style>
        <script>
          async function callAPI(endpoint) {
            const form = document.getElementById(endpoint + "-form");
            const params = new URLSearchParams(new FormData(form)).toString();
            const url = "/api/" + endpoint + "?" + params;

            document.getElementById(endpoint + "-result").textContent = "Loading...";

            const res = await fetch(url);
            const json = await res.json();
            document.getElementById(endpoint + "-result").textContent = JSON.stringify(json, null, 2);
          }
        </script>
      </head>
      <body>
        <h1>🚀 Rafzhost API Dashboard</h1>

        <div class="card">
          <h2>TikTok Downloader</h2>
          <form id="downloader/tiktok-form" onsubmit="event.preventDefault(); callAPI('downloader/tiktok')">
            <label>Video URL:</label>
            <input name="url" placeholder="https://www.tiktok.com/..." />
            <button type="submit">Kirim</button>
          </form>
          <pre id="downloader/tiktok-result"></pre>
        </div>

        <div class="card">
          <h2>AI Copilot</h2>
          <form id="ai/copilot-form" onsubmit="event.preventDefault(); callAPI('ai/copilot')">
            <label>Text:</label>
            <input name="text" placeholder="Halo dunia" />
            <label>Model:</label>
            <input name="model" value="gpt-5" />
            <button type="submit">Kirim</button>
          </form>
          <pre id="ai/copilot-result"></pre>
        </div>

        <div class="card">
          <h2>Pinterest Search</h2>
          <form id="search/pinterest-form" onsubmit="event.preventDefault(); callAPI('search/pinterest')">
            <label>Query:</label>
            <input name="query" placeholder="cat, anime, etc" />
            <button type="submit">Kirim</button>
          </form>
          <pre id="search/pinterest-result"></pre>
        </div>

        <div class="card">
          <h2>Shortlink Generator</h2>
          <form id="tools/shortlink-form" onsubmit="event.preventDefault(); callAPI('tools/shortlink')">
            <label>URL:</label>
            <input name="url" placeholder="https://google.com" />
            <button type="submit">Kirim</button>
          </form>
          <pre id="tools/shortlink-result"></pre>
        </div>

      </body>
    </html>
  `);
}
