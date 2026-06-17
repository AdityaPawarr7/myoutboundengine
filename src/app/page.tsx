export default function Home() {
  const phases = [
    { n: 1, name: "Project scaffold + Vercel deploy", status: "active" },
    { n: 2, name: "Product context engine", status: "pending" },
    { n: 3, name: "Prospect ingestion (CSV)", status: "pending" },
    { n: 4, name: "AI sequence writer", status: "pending" },
    { n: 5, name: "Dynamic landing pages", status: "pending" },
    { n: 6, name: "Instantly export + A/B variants", status: "pending" },
    { n: 7, name: "Reply tracking + optimisation", status: "pending" },
    { n: 8, name: "Budget engine + Apollo", status: "pending" },
  ];

  return (
    <main
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "64px 24px",
      }}
    >
      <p style={{ color: "var(--accent)", fontWeight: 600, fontSize: 14 }}>
        OUTBOUND ENGINE
      </p>
      <h1 style={{ fontSize: 32, margin: "8px 0 12px", fontWeight: 700 }}>
        AI cold email machine
      </h1>
      <p style={{ color: "var(--text-muted)", marginBottom: 40 }}>
        Personalized multi-step sequences, A/B tested, exported to Instantly.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {phases.map((p) => (
          <div
            key={p.n}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 16px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              opacity: p.status === "pending" ? 0.5 : 1,
            }}
          >
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background:
                  p.status === "active" ? "var(--accent)" : "var(--surface-2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 600,
                flexShrink: 0,
              }}
            >
              {p.n}
            </span>
            <span style={{ fontSize: 15 }}>{p.name}</span>
            {p.status === "active" && (
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: 12,
                  color: "var(--accent)",
                  fontWeight: 600,
                }}
              >
                IN PROGRESS
              </span>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
