import { useState } from "react";
import Link from "next/link";

export default function PostPage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
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
    <div style={{ maxWidth: 600, margin: "50px auto", fontFamily: "sans-serif" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <Link href="/docs">
          <button
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              background: "#10b981",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "all 0.3s",
            }}
            onMouseOver={e => e.currentTarget.style.background = "#047857"}
            onMouseOut={e => e.currentTarget.style.background = "#10b981"}
          >
            Go to Docs
          </button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <input
          type="text"
          placeholder="Enter TikTok URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ padding: "10px", width: "80%", marginRight: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            borderRadius: "6px",
            background: "#3b82f6",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "all 0.3s",
          }}
          onMouseOver={e => e.currentTarget.style.background = "#1e40af"}
          onMouseOut={e => e.currentTarget.style.background = "#3b82f6"}
        >
          Download
        </button>
      </form>

      {loading && <p style={{ textAlign: "center", marginTop: 20 }}>Loading...</p>}

      {result && (
        <pre
          style={{
            background: "#f3f4f6",
            padding: 15,
            borderRadius: 8,
            marginTop: 20,
            overflowX: "auto",
          }}
        >
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
                }
