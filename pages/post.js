import ThemeSwitcher from "../src/components/ThemeSwitcher";
import Link from "next/link";

export default function PostPage() {
  return (
    <div style={{ padding:"20px", maxWidth:"1200px", margin:"0 auto" }}>
      <h1>POST API</h1>
      <Link href="/docs">
        <button style={{ marginBottom:"20px" }}>Go to Docs</button>
      </Link>

      <div style={{ marginBottom:"30px", border:"1px solid #ccc", padding:"15px", borderRadius:"8px" }}>
        <h2>Customize Theme</h2>
        <ThemeSwitcher />
      </div>

      {/* Tambahkan form atau info POST API di sini */}

      <footer style={{ marginTop:"40px", textAlign:"center" }}>
        <p>Rafzhost API &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
