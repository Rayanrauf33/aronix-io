import { Eyebrow } from "@/components/ui/Eyebrow"

type Props = {
  count?: number
}

export function BlogHero({ count }: Props) {
  return (
    <section
      className="px-5 sm:px-12 pt-[144px] pb-16"
      style={{ background: "var(--ax-gradient-hero-wash)" }}
      aria-labelledby="blog-heading"
    >
      <div className="max-w-[1280px] mx-auto flex items-end justify-between gap-12 flex-wrap">
        <div className="max-w-[640px]">
          <Eyebrow className="mb-3.5">Aronix Blog</Eyebrow>
          <h1
            id="blog-heading"
            className="text-[var(--ax-fg-1)] mb-4"
            style={{
              fontFamily: "var(--ax-font-display)",
              fontWeight: 800,
              fontSize: "clamp(40px, 5vw, 64px)",
              lineHeight: 1.06,
              letterSpacing: "-0.025em",
            }}
          >
            Insights on automation,<br />operations &amp; growth
          </h1>
          <p className="text-[18px] leading-[1.6] text-[var(--ax-fg-2)] max-w-[480px]">
            Practical thinking on how growing teams remove manual work and build reliable systems.
          </p>
        </div>
        {typeof count === "number" && count > 0 && (
          <div className="text-right shrink-0">
            <div
              className="text-[var(--ax-fg-1)]"
              style={{
                fontFamily: "var(--ax-font-display)",
                fontWeight: 800,
                fontSize: "52px",
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              {count}
            </div>
            <div
              className="text-[11px] uppercase text-[var(--ax-fg-3)] mt-1"
              style={{ fontFamily: "var(--ax-font-mono)", letterSpacing: "0.08em" }}
            >
              {count === 1 ? "Article published" : "Articles published"}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
