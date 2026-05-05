async function getTrinoInfo() {
  const base = process.env.TRINO_URL ?? "http://localhost:8080";
  try {
    const res = await fetch(`${base}/v1/info`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return { ok: false as const, error: `${res.status} ${res.statusText}` };
    }
    const data = (await res.json()) as Record<string, unknown>;
    return { ok: true as const, data };
  } catch (e) {
    return { ok: false as const, error: e instanceof Error ? e.message : String(e) };
  }
}

export default async function Home() {
  const info = await getTrinoInfo();
  const publicUi =
    process.env.NEXT_PUBLIC_TRINO_UI ?? "http://localhost:8080";

  return (
    <main
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
        Trino Analytics (local)
      </h1>
      <p style={{ opacity: 0.85, marginBottom: "1.5rem" }}>
        Minimal shell for Docker Compose. Open Trino’s Web UI from your host using
        the links below; this page checks the coordinator from the frontend
        container via <code>TRINO_URL</code>.
      </p>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
          Coordinator (server-side check)
        </h2>
        {info.ok ? (
          <pre
            style={{
              background: "#1a2230",
              padding: "1rem",
              borderRadius: 8,
              overflow: "auto",
              fontSize: "0.85rem",
            }}
          >
            {JSON.stringify(info.data, null, 2)}
          </pre>
        ) : (
          <p style={{ color: "#f87171" }}>
            Could not reach Trino at{" "}
            <code>{process.env.TRINO_URL ?? "(unset)"}</code>: {info.error}
          </p>
        )}
      </section>

      <section>
        <h2 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Open Trino</h2>
        <p style={{ marginBottom: "0.75rem" }}>
          From your machine (host browser):
        </p>
        <ul style={{ lineHeight: 1.8 }}>
          <li>
            <a href={`${publicUi}/ui`} target="_blank" rel="noreferrer">
              Trino Web UI → {publicUi}/ui
            </a>
          </li>
          <li>
            <a href={`${publicUi}/v1/info`} target="_blank" rel="noreferrer">
              REST /v1/info
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
