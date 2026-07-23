import { ImageResponse } from "next/og"
import { OG_SIZE, OG_CONTENT_TYPE, loadManrope, manropeFonts, renderDefaultOg } from "@/lib/og"
import { getPostBySlug } from "@/lib/supabase/blog"

export const alt = "Aronix blog post"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    return await generatePostOg(params)
  } catch {
    return renderDefaultOg()
  }
}

async function generatePostOg(params: Promise<{ slug: string }>) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return renderDefaultOg()

  const manrope = await loadManrope()
  const title =
    post.title.length > 90 ? `${post.title.slice(0, 87)}...` : post.title

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
              display: "flex",
              alignItems: "center",
              marginBottom: 32,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: "#FFFFFF",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                backgroundColor: "#EA4B71",
                borderRadius: 6,
                padding: "6px 14px",
              }}
            >
              {post.category}
            </div>
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
              fontSize: 20,
              fontWeight: 800,
              color: "#FFDFF0",
            }}
          >
            {post.author}
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#EA4B71",
            }}
          >
            aronix.io/blog
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
