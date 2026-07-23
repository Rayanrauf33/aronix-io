import { Button } from "@/components/ui/Button"

type Props = {
  headline: string
  sub: string
  calendlyUrl?: string
  buttonLabel?: string
}

const DEFAULT_CALENDLY = "https://calendly.com/rayanrauf33/muhammad-rayan-15-minute-session"

export function ServiceCTA({
  headline,
  sub,
  calendlyUrl = DEFAULT_CALENDLY,
  buttonLabel = "Book a Free Audit",
}: Props) {
  return (
    <section
      className="text-center px-5 sm:px-12 py-20"
      style={{ background: "var(--ax-gradient-dark-cta)" }}
      aria-labelledby="service-cta-heading"
    >
      <h2
        id="service-cta-heading"
        className="text-white mx-auto"
        style={{
          fontFamily: "var(--ax-font-display)",
          fontWeight: 800,
          fontSize: "var(--ax-fs-h1)",
          lineHeight: "var(--ax-lh-tight)",
          letterSpacing: "var(--ax-tracking-tight)",
          maxWidth: "var(--ax-reading-width)",
          margin: "0 auto 20px",
        }}
      >
        {headline}
      </h2>
      <p
        className="mb-10 max-w-[560px] mx-auto"
        style={{ fontSize: "var(--ax-fs-body-lg)", color: "var(--ax-fg-on-dark-2)", lineHeight: 1.6 }}
      >
        {sub}
      </p>
      <Button href={calendlyUrl} variant="dark" size="lg" trailingArrow>
        {buttonLabel}
      </Button>
    </section>
  )
}
