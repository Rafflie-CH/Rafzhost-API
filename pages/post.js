import { useEffect } from "react";
import ThemeSwitcher from "../src/components/ThemeSwitcher";
import Link from "next/link";

export default function PostPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Rafzhost API POST Endpoint</h1>

      {/* Navigasi ke DOCS */}
      <Link href="/docs">
        <button style={{ marginBottom: "20px" }}>Go to Docs Page</button>
      </Link>

      {/* Theme switcher */}
      <div style={{
        marginBottom: "30px",
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "8px"
      }}>
        <h2>Theme</h2>
        <ThemeSwitcher />
      </div>

      <p>
        Di halaman ini, kamu bisa melakukan POST request ke endpoint API. 
        Setiap tombol dan form akan menyesuaikan tema yang dipilih.
      </p>

      {/* Contoh form POST sederhana */}
      <form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input type="text" placeholder="Masukkan URL TikTok" />
        <button type="submit">Submit</button>
      </form>

      <footer style={{ marginTop: "40px", textAlign: "center" }}>
        <p>Rafzhost API &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
