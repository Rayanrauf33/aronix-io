import { ImageResponse } from "next/og"

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = "image/png"

export async function loadManrope(): Promise<ArrayBuffer> {
  const css = await fetch(
    "https://fonts.googleapis.com/css2?family=Manrope:wght@800",
    {
      headers: {
        // Old Safari UA intentionally: Google Fonts returns woff (not woff2)
        // which is the format Satori/ImageResponse can parse.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
      next: { revalidate: 86400 },
    }
  ).then((r) => r.text())

  // Google Fonts returns multiple @font-face blocks ordered by script
  // (Vietnamese, Latin Extended, Latin). The last URL is the Latin subset
  // which has the broadest glyph coverage for English content.
  const urls = [...css.matchAll(/url\(([^)]+)\)/g)].map((m) => m[1])
  const url = urls[urls.length - 1]
  if (!url) throw new Error("Failed to extract Manrope font URL")

  return fetch(url, { next: { revalidate: 86400 } }).then((r) =>
    r.arrayBuffer()
  )
}

export function manropeFonts(data: ArrayBuffer) {
  return [
    { name: "Manrope", data, weight: 800 as const, style: "normal" as const },
  ]
}

export async function renderDefaultOg(): Promise<ImageResponse> {
  const manrope = await loadManrope()

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#5C1126",
          padding: "60px 80px",
          fontFamily: "Manrope",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #EA4B71, #6475BD)",
          }}
        />
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            marginBottom: 24,
          }}
        >
          Aronix
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#FFDFF0",
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: 700,
          }}
        >
          Business Automation for Growing Companies
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 18,
            color: "#EA4B71",
            fontWeight: 800,
          }}
        >
          aronix.io
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: manropeFonts(manrope),
    },
  )
}
