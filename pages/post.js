import { useState } from "react";
import Link from "next/link";
import ThemeSwitcher from "../components/ThemeSwitcher";
import SkeletonLoader from "../components/SkeletonLoader";

export default function PostPage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/ttdl?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: err.message });
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 700, margin: "20px auto", fontFamily: "Inter, sans-serif", padding: 15 }}>
      <ThemeSwitcher />
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <Link href="/docs">
          <button style={buttonStyle("#10b981", "#047857")} title="Go to API documentation">Go to Docs</button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <input
          type="text"
          placeholder="Enter TikTok URL"
          value={url}
          onChange={e => setUrl(e.target.value)}
          style={{ padding: "12px", width: "75%", marginRight: 10, borderRadius: 6, border: "1px solid #ccc" }}
          title="Input TikTok URL here"
        />
        <button type="submit" style={buttonStyle("#3b82f6", "#1e40af")} title="Download TikTok video/photo">
          Download
        </button>
      </form>

      {loading && <SkeletonLoader height={50} />}
      {result && <pre style={{ background: "var(--bg-color, #f3f4f6)", padding: 15, borderRadius: 8, marginTop: 20, overflowX: "auto" }}>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}

const buttonStyle = (bg, hover) => ({
  padding: "10px 15px",
  borderRadius: 8,
  background: bg,
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s",
  marginBottom: 5,
  marginTop: 5,
  outline: "none",
  ":hover": { background: hover }
});
