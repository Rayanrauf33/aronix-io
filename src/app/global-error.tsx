"use client"

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en-GB">
      <head>
        <title>Something went wrong | Aronix</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Manrope', 'Inter', Arial, sans-serif",
          backgroundColor: "#FFFFFF",
          color: "#0A0A0A",
        }}
      >
        <div style={{ textAlign: "center", padding: "40px 20px", maxWidth: 480 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#EA4B71",
              marginBottom: 16,
              fontFamily: "'IBM Plex Mono', monospace",
            }}
          >
            Error
          </p>
          <h1
            style={{
              fontSize: 36,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              margin: "0 0 16px",
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.65,
              color: "#3D3D3D",
              margin: "0 0 32px",
            }}
          >
            We hit an unexpected error. You can try again or go back to the
            home page.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            <button
              onClick={() => reset()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: 44,
                padding: "0 24px",
                fontSize: 15,
                fontWeight: 600,
                color: "#FFFFFF",
                backgroundColor: "#A82949",
                border: "none",
                borderRadius: 12,
                cursor: "pointer",
                fontFamily: "inherit",
                outline: "none",
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = "0 0 0 2px #EA4B71"
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: 44,
                padding: "0 24px",
                fontSize: 15,
                fontWeight: 600,
                color: "#0A0A0A",
                backgroundColor: "transparent",
                border: "1px solid #0A0A0A",
                borderRadius: 12,
                cursor: "pointer",
                fontFamily: "inherit",
                textDecoration: "none",
                outline: "none",
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = "0 0 0 2px #EA4B71"
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
