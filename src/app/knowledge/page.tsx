"use client";

import { useState } from "react";

interface ExtractedContext {
  id: string;
  name: string;
  icp: string;
  valueProps: string;
  objections: string;
  differentiators: string;
}

const card: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius)",
  padding: "20px 22px",
};

const fieldLabel: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: 0.4,
  color: "var(--accent)",
  textTransform: "uppercase",
  marginBottom: 8,
};

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div style={card}>
      <div style={fieldLabel}>{label}</div>
      <div style={{ whiteSpace: "pre-wrap", fontSize: 15 }}>{value || "—"}</div>
    </div>
  );
}

export default function KnowledgeBasePage() {
  const [rawInput, setRawInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ExtractedContext | null>(null);

  async function analyze() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/context", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawInput }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setResult(data.context);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 760, margin: "0 auto", padding: "56px 24px" }}>
      <a href="/" style={{ color: "var(--text-muted)", fontSize: 14 }}>
        ← back
      </a>
      <h1 style={{ fontSize: 28, fontWeight: 700, margin: "16px 0 8px" }}>
        Product knowledge base
      </h1>
      <p style={{ color: "var(--text-muted)", marginBottom: 28 }}>
        Describe your product or service. Paste a pitch, a website blurb, sales
        notes — anything. Claude distills it into the structure every email
        draws from.
      </p>

      <textarea
        value={rawInput}
        onChange={(e) => setRawInput(e.target.value)}
        placeholder="e.g. We're an AI scheduling tool for field-service teams. We cut dispatcher admin time by 40% and reduce missed appointments..."
        rows={9}
        style={{
          width: "100%",
          background: "var(--surface)",
          color: "var(--text)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: 16,
          fontSize: 15,
          fontFamily: "inherit",
          resize: "vertical",
        }}
      />

      <button
        onClick={analyze}
        disabled={loading || rawInput.trim().length < 20}
        style={{
          marginTop: 14,
          background: loading ? "var(--surface-2)" : "var(--accent)",
          color: "#fff",
          border: "none",
          borderRadius: "var(--radius)",
          padding: "12px 22px",
          fontSize: 15,
          fontWeight: 600,
          opacity: rawInput.trim().length < 20 ? 0.5 : 1,
        }}
      >
        {loading ? "Analyzing…" : "Analyze with Claude"}
      </button>

      {error && (
        <p style={{ color: "var(--danger)", marginTop: 16, fontSize: 14 }}>
          {error}
        </p>
      )}

      {result && (
        <div style={{ marginTop: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>
            {result.name}
          </h2>
          <p style={{ color: "var(--success)", fontSize: 14, marginBottom: 20 }}>
            ✓ Saved to knowledge base
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Field label="Ideal customer profile" value={result.icp} />
            <Field label="Value propositions" value={result.valueProps} />
            <Field label="Likely objections" value={result.objections} />
            <Field label="Differentiators" value={result.differentiators} />
          </div>
        </div>
      )}
    </main>
  );
}
