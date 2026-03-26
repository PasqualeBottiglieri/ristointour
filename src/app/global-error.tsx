"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Playfair+Display:wght@700;900&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              body { margin: 0; font-family: 'Inter', sans-serif; background: #fafaf9; color: #1b3a2d; }
              .serif { font-family: 'Playfair Display', serif; }
            `,
          }}
        />
      </head>
      <body>
        <main
          role="alert"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "5rem 1rem",
          }}
        >
          <div style={{ maxWidth: "32rem", textAlign: "center" }}>
            <a
              href="/"
              className="serif"
              style={{
                fontSize: "1.875rem",
                fontWeight: 900,
                color: "#1b3a2d",
                textDecoration: "none",
                display: "inline-block",
                marginBottom: "3rem",
              }}
            >
              Ristointour
            </a>

            <div style={{ marginBottom: "2rem" }}>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "96px", color: "#f86d16", opacity: 0.8 }}
              >
                error_outline
              </span>
            </div>

            <h1
              className="serif"
              style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "1rem" }}
            >
              Qualcosa non ha funzionato
            </h1>
            <p
              style={{
                color: "#78716c",
                marginBottom: "2.5rem",
                lineHeight: 1.6,
              }}
            >
              Si è verificato un errore imprevisto. Riprova o torna alla
              homepage.
            </p>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={reset}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "#f86d16",
                  color: "#fff",
                  padding: "0.75rem 2rem",
                  borderRadius: "9999px",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                  refresh
                </span>
                Riprova
              </button>
              <a
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "#1b3a2d",
                  color: "#fff",
                  padding: "0.75rem 2rem",
                  borderRadius: "9999px",
                  fontWeight: 700,
                  textDecoration: "none",
                  fontSize: "1rem",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                  home
                </span>
                Homepage
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
