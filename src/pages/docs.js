import dynamic from "next/dynamic";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Link from "next/link";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });
import "swagger-ui-react/swagger-ui.css";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📖 Rafzhost API Docs</h1>
        <div className="flex gap-4">
          <ThemeSwitcher />
          <Link
            href="/post"
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Go to POST API Page
          </Link>
        </div>
      </header>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
        <SwaggerUI
          url="/swagger.json"
          // bisa tambahkan props customCss / customOptions jika diperlukan
          // contoh: customOptions={{ syntaxHighlight: { theme: "obsidian" } }}
        />
      </div>

      <footer className="text-center text-sm mt-8 opacity-70">
        Rafzhost API © 2025
      </footer>
    </div>
  );
}
