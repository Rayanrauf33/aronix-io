import { SubscribeForm } from "@/components/ui/SubscribeForm"

type Props = {
  title?: string
  lead?: string
}

export function NewsletterBand({
  title = "Get automation insights in your inbox",
  lead = "Practical tactics, case studies and workflow ideas. No fluff. Fortnightly.",
}: Props) {
  return (
    <section
      className="text-center px-5 sm:px-12 py-20"
      style={{ background: "var(--ax-gradient-dark-cta)" }}
      aria-labelledby="newsletter-heading"
    >
      <h2
        id="newsletter-heading"
        className="text-white mx-auto mb-4"
        style={{
          fontFamily: "var(--ax-font-display)",
          fontWeight: 800,
          fontSize: "clamp(32px, 4vw, 50px)",
          lineHeight: 1.1,
          letterSpacing: "-0.025em",
          maxWidth: "580px",
        }}
      >
        {title}
      </h2>
      <p className="text-[17px] text-[var(--ax-fg-on-dark-2)] mb-9">{lead}</p>
      <SubscribeForm variant="dark-band" />
    </section>
  )
}
