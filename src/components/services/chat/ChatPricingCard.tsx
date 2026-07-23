import { Button } from "@/components/ui/Button"

const CALENDLY =
  "https://calendly.com/rayanrauf33/muhammad-rayan-15-minute-session"

export function ChatPricingCard() {
  return (
    <div
      className="max-w-[560px] mx-auto rounded-[var(--ax-radius-xl)] border border-[var(--ax-border)] p-8 sm:p-10"
      style={{
        background: "var(--ax-surface)",
        boxShadow: "var(--ax-shadow-lg)",
      }}
    >
      {/* Price */}
      <div className="text-center">
        <div
          className="text-[14px] font-medium text-[var(--ax-fg-3)] mb-1"
          style={{ fontFamily: "var(--ax-font-display)" }}
        >
          Starting from
        </div>
        <div
          className="text-[var(--ax-fg-1)]"
          style={{
            fontFamily: "var(--ax-font-display)",
            fontWeight: 800,
            fontSize: "clamp(36px, 4vw, 48px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          $79<span className="text-[20px] font-semibold text-[var(--ax-fg-3)]">/month</span>
        </div>
      </div>

      {/* Divider */}
      <div
        className="h-px w-full bg-[var(--ax-border)] my-6"
        aria-hidden="true"
      />

      {/* Features */}
      <div className="flex flex-col gap-2 mb-8">
        <span className="text-[14px] text-[var(--ax-fg-3)]">No hourly billing</span>
        <span className="text-[14px] text-[var(--ax-fg-3)]">Full cost agreed before we start</span>
        <span className="text-[14px] text-[var(--ax-fg-3)]">Audit cost credited toward your build</span>
      </div>

      {/* CTA */}
      <Button href={CALENDLY} variant="primary" size="lg" className="w-full justify-center">
        Book an Audit
      </Button>
    </div>
  )
}
