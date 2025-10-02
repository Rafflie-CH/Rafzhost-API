// src/pages/post.js
import dynamic from "next/dynamic";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Link from "next/link";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });
import "swagger-ui-react/swagger-ui.css";

export default function PostPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">✍️ Post Page</h1>
        <div className="flex gap-4 items-center">
          <ThemeSwitcher />
          <Link href="/docs"><a className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">Go to Docs</a></Link>
        </div>
      </header>

      <main className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <p className="text-lg">
          Ini adalah halaman <strong>Post</strong>.  
          Di sini kamu bisa menambahkan konten khusus.
        </p>
      </main>
    </div>
  );
}
