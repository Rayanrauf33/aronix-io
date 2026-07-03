import { Eyebrow } from "@/components/ui/Eyebrow"

const steps = [
  { n: "01", t: "Workflow Audit",     d: "We map every manual step — what triggers it, who does it, and what breaks when it goes wrong." },
  { n: "02", t: "System Design",      d: "We design the automation logic, select the right tools, and define the monitoring layer." },
  { n: "03", t: "Build & Test",       d: "We build in sprints, test against your real data, and fix edge cases before go-live." },
  { n: "04", t: "Handover & Monitor", d: "You get documentation, a monitoring dashboard, and a team that stays accountable." },
]

export function HowItWorks() {
  return (
    <section
      className="px-12 py-24"
      aria-labelledby="hiw-heading"
      style={{ background: "var(--ax-surface-dark)" }}
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-14 mx-auto max-w-[640px]">
          <Eyebrow className="mb-3.5">Our process</Eyebrow>
          <h2
            id="hiw-heading"
            className="text-[var(--ax-fg-on-dark)] mb-4"
            style={{
              fontFamily: "var(--ax-font-display)",
              fontWeight: 700,
              fontSize: "clamp(32px, 3.5vw, 48px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            From audit to automation in four weeks
          </h2>
          <p className="text-[18px] leading-[1.6] text-[var(--ax-fg-on-dark-2)]">
            We work alongside your team, not around them. Every automation is tested and
            monitored before it touches live data.
          </p>
        </div>

        {/* Steps with horizontal connector line */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-0">
          <div
            className="hidden lg:block absolute top-[22px] left-[10%] right-[10%] h-px bg-white/10"
            aria-hidden="true"
          />
          {steps.map(({ n, t, d }) => (
            <div key={n} className="hiw-step text-center px-5 relative z-10">
              <div className="hiw-badge">{n}</div>
              <h3
                className="mb-2.5 text-[18px] text-[var(--ax-fg-on-dark)]"
                style={{ fontFamily: "var(--ax-font-display)", fontWeight: 600 }}
              >
                {t}
              </h3>
              <p className="text-[14px] leading-[1.6] text-[var(--ax-fg-on-dark-2)]">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
