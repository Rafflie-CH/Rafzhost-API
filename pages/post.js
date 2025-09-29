// pages/post.js
import ThemeSwitcher from "../src/components/ThemeSwitcher";
import SkeletonLoader from "../src/components/SkeletonLoader";
import Link from "next/link";

export default function PostPage() {
  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px" }}>Rafzhost POST API</h1>

      <div style={{ marginBottom: "20px" }}>
        <Link href="/docs">
          <button className="animated">Go to Docs</button>
        </Link>
      </div>

      <div style={{ marginBottom: "30px", border: "1px solid #ccc", padding: "15px", borderRadius: "8px" }}>
        <h2 style={{ marginBottom: "10px" }}>Customize Theme</h2>
        <ThemeSwitcher />
      </div>

      <SkeletonLoader />

      <footer style={{ marginTop: "40px", textAlign: "center", color: "var(--text-color)" }}>
        <p>Rafzhost API &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
