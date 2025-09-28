export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4">🚀 Rafzhost API</h1>
      <p className="text-gray-700 mb-8">
        Selamat datang! Gunakan menu di bawah untuk test endpoint API.
      </p>

      <div className="grid gap-4 w-full max-w-md">
        <a
          href="/api/downloader/tiktok?link=https://vt.tiktok.com/xxxx"
          className="p-4 bg-white rounded-xl shadow hover:bg-gray-50"
        >
          🎬 Test TikTok Downloader
        </a>

        <a
          href="/api/search/google?q=rafzhost"
          className="p-4 bg-white rounded-xl shadow hover:bg-gray-50"
        >
          🔎 Test Google Search
        </a>

        <a
          href="/api/ai/chatgpt?prompt=Hello"
          className="p-4 bg-white rounded-xl shadow hover:bg-gray-50"
        >
          🤖 Test ChatGPT
        </a>
      </div>
    </div>
  );
    }
