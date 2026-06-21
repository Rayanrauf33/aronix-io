import { Eyebrow } from "@/components/ui/Eyebrow"

export function ContactHero() {
  return (
    <section
      className="px-12 pt-[144px] pb-16"
      style={{ background: "var(--ax-soft-blush)" }}
      aria-labelledby="contact-heading"
    >
      <div className="max-w-[1280px] mx-auto">
        <Eyebrow className="mb-3.5">Get in touch</Eyebrow>
        <h1
          id="contact-heading"
          className="text-[var(--ax-fg-1)]"
          style={{
            fontFamily: "var(--ax-font-display)",
            fontWeight: 800,
            fontSize: "clamp(40px, 5vw, 64px)",
            lineHeight: 1.06,
            letterSpacing: "-0.025em",
          }}
        >
          Book your free automation audit
        </h1>
      </div>
    </section>
  )
}
