import { ImageResponse } from "next/og"
import { OG_SIZE, OG_CONTENT_TYPE, loadManrope, manropeFonts, renderDefaultOg } from "@/lib/og"
import { getCaseStudyBySlug } from "@/lib/supabase/case-studies"

export const alt = "Aronix case study"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    return await generateCaseStudyOg(params)
  } catch {
    return renderDefaultOg()
  }
}

async function generateCaseStudyOg(params: Promise<{ slug: string }>) {
  const { slug } = await params
  const cs = await getCaseStudyBySlug(slug)
  if (!cs) return renderDefaultOg()

  const manrope = await loadManrope()
  const title =
    cs.title.length > 90 ? `${cs.title.slice(0, 87)}...` : cs.title

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          backgroundColor: "#5C1126",
          padding: "56px 64px",
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

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: "#EA4B71",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              marginBottom: 24,
            }}
          >
            Case Study
          </div>

          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 20,
              fontWeight: 800,
              color: "#FFDFF0",
            }}
          >
            <span>{cs.client}</span>
            <span style={{ color: "#EA4B71" }}>{"\u00B7"}</span>
            <span>{cs.industry}</span>
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#EA4B71",
            }}
          >
            aronix.io
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: manropeFonts(manrope),
    },
  )
}
