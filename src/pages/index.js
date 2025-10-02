export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-blue-800">
        Rafzhost API
      </h1>
      <p className="mb-8 text-center text-lg md:text-xl text-blue-700">
        Pilih salah satu untuk mulai: <strong>Docs</strong> atau <strong>Post</strong>
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <a
          href="/docs"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition transform hover:scale-105"
        >
          Docs
        </a>
        <a
          href="/post"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition transform hover:scale-105"
        >
          Post
        </a>
      </div>
      <p className="mt-6 text-center text-sm text-blue-600">
        Anda bisa melihat dokumentasi atau langsung mencoba endpoint API.
      </p>
    </div>
  );
}
