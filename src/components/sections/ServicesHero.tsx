import { Eyebrow } from "@/components/ui/Eyebrow"

export function ServicesHero() {
  return (
    <section
      className="px-5 sm:px-12 pt-[144px] pb-16"
      style={{ background: "var(--ax-soft-blush)" }}
      aria-labelledby="services-heading"
    >
      <div className="max-w-[1280px] mx-auto">
        <Eyebrow className="mb-3.5">All services</Eyebrow>
        <h1
          id="services-heading"
          className="text-[var(--ax-fg-1)] mb-5"
          style={{
            fontFamily: "var(--ax-font-display)",
            fontWeight: 800,
            fontSize: "clamp(40px, 5vw, 64px)",
            lineHeight: 1.06,
            letterSpacing: "-0.025em",
          }}
        >
          The right automation for every workflow
        </h1>
        <p className="text-[18px] leading-[1.6] text-[var(--ax-fg-2)] max-w-[560px]">
          We cover every part of the operational stack, from CRM and finance
          to internal processes and custom integrations.
        </p>
      </div>
    </section>
  )
}
