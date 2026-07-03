import { Eyebrow } from "@/components/ui/Eyebrow"

export function CaseStudiesHero() {
  return (
    <section
      className="px-5 sm:px-12 pt-[144px] pb-16"
      style={{ background: "var(--ax-soft-blush)" }}
      aria-labelledby="case-studies-heading"
    >
      <div className="max-w-[1280px] mx-auto">
        <Eyebrow className="mb-3.5">Case studies</Eyebrow>
        <h1
          id="case-studies-heading"
          className="text-[var(--ax-fg-1)] mb-4"
          style={{
            fontFamily: "var(--ax-font-display)",
            fontWeight: 800,
            fontSize: "clamp(40px, 5vw, 64px)",
            lineHeight: 1.06,
            letterSpacing: "-0.025em",
          }}
        >
          Real workflows, measured results
        </h1>
        <p className="text-[18px] leading-[1.6] text-[var(--ax-fg-2)] max-w-[560px]">
          How growing teams replaced their most expensive manual processes
          with automation that runs every day, without breaking.
        </p>
      </div>
    </section>
  )
}
