import { Button } from "@/components/ui/Button"

type Cta = {
  label: string
  href: string
  variant?: "dark" | "ghost" | "primary"
  trailingArrow?: boolean
}

type Props = {
  title?: string
  lead?: string
  primaryCta?: Cta
  secondaryCta?: Cta | null
}

const defaultPrimary: Cta = {
  label: "Book an Automation Audit",
  href: "https://calendly.com/rayanrauf33/muhammad-rayan-15-minute-session",
  variant: "dark",
  trailingArrow: true,
}

const defaultSecondary: Cta = {
  label: "View all services",
  href: "/services",
  variant: "ghost",
}

export function CtaBand({
  title = "Ready to remove your most expensive manual process?",
  lead = "Book a free 45-minute workflow audit. We'll identify the steps worth automating first.",
  primaryCta = defaultPrimary,
  secondaryCta = defaultSecondary,
}: Props) {
  return (
    <section
      className="text-center px-12 py-20"
      style={{ background: "var(--ax-gradient-dark-cta)" }}
      aria-labelledby="cta-heading"
    >
      <h2
        id="cta-heading"
        className="text-white mx-auto"
        style={{
          fontFamily: "var(--ax-font-display)",
          fontWeight: 800,
          fontSize: "clamp(36px, 4vw, 56px)",
          lineHeight: 1.1,
          letterSpacing: "-0.025em",
          maxWidth: "720px",
          margin: "0 auto 20px",
        }}
      >
        {title}
      </h2>
      <p className="text-[18px] text-[var(--ax-fg-on-dark-2)] mb-10">{lead}</p>
      <div className="flex gap-3 justify-center flex-wrap">
        <Button
          href={primaryCta.href}
          variant={primaryCta.variant ?? "dark"}
          size="lg"
          trailingArrow={primaryCta.trailingArrow ?? true}
        >
          {primaryCta.label}
        </Button>
        {secondaryCta && (
          <Button
            href={secondaryCta.href}
            variant={secondaryCta.variant ?? "ghost"}
            size="lg"
            className={secondaryCta.variant === "ghost" ? "!text-white hover:!bg-white/10" : undefined}
            trailingArrow={secondaryCta.trailingArrow}
          >
            {secondaryCta.label}
          </Button>
        )}
      </div>
    </section>
  )
}
