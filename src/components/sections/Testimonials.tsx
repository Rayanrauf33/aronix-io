import { Eyebrow } from "@/components/ui/Eyebrow"

const testimonials = [
  {
    quote: "They removed 14 manual steps from our CRM workflow in our first month. The team barely noticed because it just… worked.",
    author: "Jamie R.",
    role: "Head of Revenue Ops · Series-B SaaS",
    surface: "blush" as const,
  },
  {
    quote: "Our finance close went from 5 days to 6 hours. We didn't hire a single new person to do it.",
    author: "Priya M.",
    role: "CFO · 80-person consultancy",
    surface: "white" as const,
  },
  {
    quote: "Aronix built us a monitoring layer that catches errors before our team even knows they happened.",
    author: "Tom S.",
    role: "CTO · Growth-stage e-commerce",
    surface: "blush" as const,
  },
]

export function Testimonials() {
  return (
    <section className="px-12 py-24" aria-labelledby="testimonials-heading">
      <div className="max-w-[1280px] mx-auto">

        <div className="text-center mb-14">
          <Eyebrow className="mb-3.5">Client results</Eyebrow>
          <h2
            id="testimonials-heading"
            className="text-[var(--ax-fg-1)]"
            style={{
              fontFamily: "var(--ax-font-display)",
              fontWeight: 700,
              fontSize: "clamp(32px, 3.5vw, 48px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Real outcomes from real teams
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map(({ quote, author, role, surface }) => (
            <figure
              key={author}
              className="relative m-0 p-10 px-8 rounded-[24px]"
              style={{
                background: surface === "blush" ? "var(--ax-soft-blush)" : "#fff",
                border: surface === "white" ? "1px solid var(--ax-border)" : "none",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-3 left-6 leading-none select-none"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 800,
                  fontSize: "80px",
                  color: "var(--ax-pink-500)",
                  opacity: 0.15,
                }}
              >
                &rdquo;
              </span>
              <blockquote
                className="m-0 relative text-[var(--ax-fg-1)]"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 500,
                  fontSize: "clamp(20px, 2.5vw, 26px)",
                  lineHeight: 1.45,
                  letterSpacing: "-0.01em",
                }}
              >
                {quote}
              </blockquote>
              <div
                className="w-10 h-px my-6"
                style={{ background: "var(--ax-border)", margin: "24px 0 16px" }}
                aria-hidden="true"
              />
              <figcaption>
                <div className="text-[16px] font-semibold text-[var(--ax-fg-1)]">{author}</div>
                <div className="text-[14px] text-[var(--ax-fg-3)]">{role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
