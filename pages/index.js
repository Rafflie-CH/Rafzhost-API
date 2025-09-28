import { useState } from "react";

// --- FUNGSI UTILITY BARU ---
// Fungsi untuk membuat cURL Command
const generateCurlCommand = (url, method = 'GET') => {
    return `curl -X ${method} '${url}'`;
};

// Fungsi untuk membuat Request URL
const generateRequestUrl = (id, params) => {
    // Meniru environment Next.js Vercel: asumsi domain https://rafzhost-api.vercel.app/
    const baseUrl = "https://rafzhost-api.vercel.app"; 
    return `${baseUrl}/api/${id}?${params}`;
};
// --- AKHIR FUNGSI UTILITY ---

function ApiCard({ id, title, fields }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [headers, setHeaders] = useState("");
  const [requestUrl, setRequestUrl] = useState(""); // State baru untuk Request URL
  const [curlCommand, setCurlCommand] = useState(""); // State baru untuk cURL
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Code'); 

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult("Loading...");
    setHeaders("");
    setActiveTab('Code');

    const form = new FormData(e.target);
    const params = new URLSearchParams(form).toString();
    
    // Set Request URL dan cURL command sebelum fetch
    const generatedUrl = generateRequestUrl(id, params);
    setRequestUrl(generatedUrl);
    setCurlCommand(generateCurlCommand(generatedUrl));

    try {
      const res = await fetch(`/api/${id}?${params}`);
      
      // 1. Ambil Response Body (JSON)
      const json = await res.json();
      setResult(JSON.stringify(json, null, 2));

      // 2. Ambil Response Headers
      let headerText = '';
      for (const [key, value] of res.headers.entries()) {
        headerText += `${key}: ${value}\n`;
      }
      setHeaders(headerText);
      
    } catch (err) {
      setResult("Error: " + err.message);
      setHeaders("");
    }
    setLoading(false);
  }

  const renderTabContent = () => {
    if (loading) return "Loading...";

    if (activeTab === 'Code') {
      return result;
    } else if (activeTab === 'Details') {
      return headers || "Headers tidak tersedia atau request belum dieksekusi.";
    }
    return "";
  };
  
  const getTabStyle = (tabName) => ({
      ...styles.tabButton,
      backgroundColor: activeTab === tabName ? styles.button.background : '#2a2a44',
  });

  return (
    <div style={styles.card}>
      {/* Header card yang bisa diklik untuk membuka/menutup */}
      <div style={styles.cardHeader} onClick={() => setIsOpen(!isOpen)}>
        <h2 style={{ margin: 0, color: '#e6e6e6' }}>{title} <span style={styles.apiPath}>GET /api/{id}</span></h2>
        <span style={styles.arrow}>{isOpen ? '▼' : '▶'}</span>
      </div>

      {isOpen && ( // Konten hanya render jika card terbuka
        <div>
          {/* BAGIAN PARAMETERS */}
          <div style={styles.section}>
            <h3>Parameters</h3>
            <form id={`${id}-form`} onSubmit={onSubmit}>
              {fields.map(f => (
                <div key={f.name} style={{ marginBottom: 8 }}>
                  <label style={{ display: "block", marginBottom: 4, color: '#a0a0a0' }}>{f.label}</label>
                  <input name={f.name} placeholder={f.placeholder || ""} defaultValue={f.default || ""} style={styles.input} />
                </div>
              ))}
              <button type="submit" style={styles.button}>Execute</button>
            </form>
          </div>

          {/* BAGIAN RESPONS LENGKAP */}
          <div style={styles.responseContainer}>
            
            {/* 1. cURL Command */}
            {curlCommand && (
                <div style={styles.codeBlock}>
                    <p style={styles.codeLabel}>cURL</p>
                    <pre style={styles.curlPre}>{curlCommand}</pre>
                </div>
            )}
            
            {/* 2. Request URL */}
            {requestUrl && (
                <div style={styles.codeBlock}>
                    <p style={styles.codeLabel}>Request URL</p>
                    <pre style={styles.curlPre}>{requestUrl}</pre>
                </div>
            )}

            {/* 3. Response Body (Tabs) */}
            <h3>Server Response</h3>
            
            <div style={styles.tabs}>
                <button style={getTabStyle('Code')} onClick={() => setActiveTab('Code')}>
                    Response Body (Code)
                </button>
                <button style={getTabStyle('Details')} onClick={() => setActiveTab('Details')}>
                    Response Headers (Details)
                </button>
            </div>
            
            <pre style={styles.pre}>
                {renderTabContent()}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Inter, Arial, sans-serif",
    background: "#0f0f1a",
    color: "#e6e6e6",
    minHeight: "100vh",
    padding: 24
  },
  header: {
    textAlign: "center",
    marginBottom: 24,
    fontSize: '1.8rem'
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 16,
    maxWidth: 900,
    margin: "0 auto"
  },
  card: {
    background: "#1a1a2e",
    borderRadius: 8,
    overflow: 'hidden',
    border: '1px solid #2a2a44'
  },
  cardHeader: {
    background: "#2a2a44",
    padding: "12px 18px",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    borderBottom: '1px solid #3a3a5e'
  },
  apiPath: {
    fontSize: '0.8rem',
    color: '#a0a0a0',
    marginLeft: 10
  },
  arrow: {
    color: '#7c3aed',
    fontSize: '1.2rem',
    fontWeight: 'bold'
  },
  section: {
    padding: 18,
    borderBottom: '1px solid #2a2a44'
  },
  responseContainer: {
    padding: "18px 18px 0 18px",
  },
  codeBlock: {
    marginBottom: 10,
    marginTop: 10
  },
  codeLabel: {
    margin: '0 0 5px 0',
    fontSize: '0.9rem',
    color: '#a0a0a0'
  },
  curlPre: {
    background: "#05050a",
    padding: 10,
    borderRadius: 4,
    color: "#e6e6e6",
    fontSize: '0.8rem',
    overflowX: 'auto', // Scroll horizontal untuk URL/cURL yang sangat panjang
    whiteSpace: 'pre',
    wordBreak: 'normal'
  },
  tabs: {
    display: 'flex',
    marginBottom: 8,
    marginTop: 10,
    borderBottom: '1px solid #3a3a5e',
    paddingBottom: 5,
  },
  tabButton: {
    padding: '6px 12px',
    borderRadius: 4,
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    marginRight: 8,
    fontSize: '0.8rem'
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 4,
    border: "1px solid #3a3a5e",
    marginBottom: 6,
    background: "#0f0f1a",
    color: "#e6e6e6",
    boxSizing: 'border-box'
  },
  button: {
    background: "#7c3aed",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: 4,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: '0.9rem'
  },
  pre: { // Response Body (Code)
    background: "#05050a",
    padding: 12,
    borderRadius: 4,
    color: "#7eff7e",
    marginTop: 8,
    marginBottom: 18,
    minHeight: 60,
    whiteSpace: 'pre-wrap', // FIX WORD WRAP
    wordBreak: 'break-all',  // FIX WORD WRAP
    overflow: 'auto',
    fontSize: '0.85rem'
  }
};

export default function Home() {
  const cards = [
    { id: "downloader/tiktok", title: "TikTok Downloader", fields: [{ name: "url", label: "Video URL", placeholder: "https://www.tiktok.com/..." }] },
    { id: "downloader/instagram", title: "Instagram Downloader", fields: [{ name: "url", label: "Post URL", placeholder: "https://www.instagram.com/..." }] },
    { id: "downloader/youtube", title: "YouTube Downloader", fields: [{ name: "url", label: "Video URL", placeholder: "https://www.youtube.com/watch?v=..." }] },
    { id: "ai/copilot", title: "AI Copilot", fields: [{ name: "text", label: "Text", placeholder: "Tanyakan apa saja..." }, { name: "model", label: "Model", default: "gpt-5" }] },
    { id: "search/pinterest", title: "Pinterest Search", fields: [{ name: "query", label: "Query", placeholder: "Ide desain rumah" }] },
    { id: "tools/shortlink", title: "Shortlink Generator", fields: [{ name: "url", label: "URL", placeholder: "https://example.com/url-panjang" }] }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>🚀 Rafzhost API Dashboard</h1>
        <p style={{ color: "#bbb", fontSize: '1rem' }}>Test endpoint langsung dari sini. Dokumentasi Swagger tersedia di <a href="/api/docs" style={{ color: '#7c3aed', fontWeight: 'bold' }}>/api/docs</a>.</p>
      </div>

      <div style={styles.grid}>
        {cards.map(c => (
          <ApiCard key={c.id} {...c} />
        ))}
      </div>
    </div>
  );
}
