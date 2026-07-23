import { Accordion, type AccordionItem } from "@/components/ui/Accordion"
import { Eyebrow } from "@/components/ui/Eyebrow"

type Props = {
  eyebrow?: string
  title?: string
  items: AccordionItem[]
  defaultOpen?: number
}

export function Faq({
  eyebrow = "Common questions",
  title = "Everything you need to know about working with us",
  items,
  defaultOpen = 0,
}: Props) {
  return (
    <section
      className="px-5 sm:px-12 py-24"
      style={{ background: "var(--ax-soft-blush)" }}
      aria-labelledby="faq-heading"
    >
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-14">
          <Eyebrow className="mb-3.5">{eyebrow}</Eyebrow>
          <h2
            id="faq-heading"
            className="text-[var(--ax-fg-1)]"
            style={{
              fontFamily: "var(--ax-font-display)",
              fontWeight: 700,
              fontSize: "clamp(28px, 3vw, 38px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h2>
        </div>
        <Accordion items={items} defaultOpen={defaultOpen} />
      </div>
    </section>
  )
}
