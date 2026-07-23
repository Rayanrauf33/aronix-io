import { Check } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Bad website mockup                                                  */
/* ------------------------------------------------------------------ */

function BadSite() {
  return (
    <div
      className="rounded-[var(--ax-radius-lg)] overflow-hidden border"
      style={{ borderColor: "color-mix(in srgb, var(--ax-error) 20%, transparent)" }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[var(--ax-slate-900)]">
        <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
        <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
        <span className="w-2 h-2 rounded-full bg-[#28C840]" />
        <div className="ml-2 flex-1 h-4 rounded-[var(--ax-radius-xs)] flex items-center px-2" style={{ background: "rgba(255,255,255,0.06)" }}>
          <span className="text-[8px] text-[var(--ax-slate-500)]" style={{ fontFamily: "var(--ax-font-mono)" }}>riverdaledental.com</span>
        </div>
      </div>

      {/* Site content */}
      <div className="p-3.5 space-y-2.5" style={{ background: "var(--ax-slate-100)" }}>
        {/* Overloaded nav */}
        <div className="flex gap-1.5 flex-wrap">
          {["Home", "About", "Services", "Team", "Gallery", "Blog", "Testimonials", "Contact"].map((n) => (
            <span key={n} className="text-[6px] text-[var(--ax-slate-600)]">{n}</span>
          ))}
        </div>

        {/* Generic hero */}
        <div className="text-[10px] font-bold text-[var(--ax-fg-1)] leading-[1.3]" style={{ fontFamily: "Georgia, serif" }}>
          Welcome to Riverside Dental, Your Local Family Dentist
        </div>

        {/* Wall of text */}
        <div className="space-y-1">
          {[100, 95, 100, 90, 100, 85].map((w, i) => (
            <div key={i} className="h-1 rounded bg-[var(--ax-slate-300)]" style={{ width: `${w}%` }} />
          ))}
        </div>

        {/* Contact form */}
        <div className="space-y-1.5 pt-1">
          <div className="text-[7px] text-[var(--ax-fg-3)] font-medium">Contact Us</div>
          {["Name", "Email", "Phone", "Address", "Service", "Date", "Message"].map((f) => (
            <div key={f} className="flex items-center gap-1">
              <span className="text-[5px] text-[var(--ax-slate-500)] w-8 shrink-0">{f}</span>
              <div className="h-2.5 flex-1 rounded-[2px] border border-[var(--ax-slate-300)] bg-[var(--ax-bg)]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Good website mockup                                                 */
/* ------------------------------------------------------------------ */

function GoodSite() {
  return (
    <div
      className="rounded-[var(--ax-radius-lg)] overflow-hidden border"
      style={{ borderColor: "color-mix(in srgb, var(--ax-success) 20%, transparent)" }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[var(--ax-slate-900)]">
        <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
        <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
        <span className="w-2 h-2 rounded-full bg-[#28C840]" />
        <div className="ml-2 flex-1 h-4 rounded-[var(--ax-radius-xs)] flex items-center px-2" style={{ background: "rgba(255,255,255,0.06)" }}>
          <span className="text-[8px] text-[var(--ax-slate-500)]" style={{ fontFamily: "var(--ax-font-mono)" }}>yourwebsite.com</span>
        </div>
      </div>

      {/* Site content */}
      <div className="p-3.5 space-y-2.5" style={{ background: "var(--ax-slate-100)" }}>
        {/* Clean nav */}
        <div className="flex items-center justify-between">
          <div className="h-2 w-12 rounded bg-[var(--ax-slate-700)]" />
          <div className="flex gap-2.5 items-center">
            <span className="text-[6px] text-[var(--ax-slate-600)]">Services</span>
            <span className="text-[6px] text-[var(--ax-slate-600)]">About</span>
            <span className="text-[6px] font-bold px-1.5 py-0.5 rounded-[3px]" style={{ background: "var(--ax-primary)", color: "white" }}>Book now</span>
          </div>
        </div>

        {/* Headline */}
        <div>
          <div className="text-[11px] font-bold text-[var(--ax-fg-1)] leading-[1.2]" style={{ fontFamily: "var(--ax-font-display)" }}>
            New patients seen within 48 hours.
          </div>
          <div className="text-[8px] text-[var(--ax-fg-3)] mt-1">Book online in 60 seconds.</div>
        </div>

        {/* CTA row */}
        <div className="flex items-center gap-2.5">
          <div
            className="h-5 px-3 rounded-[var(--ax-radius-xs)] flex items-center"
            style={{ background: "var(--ax-primary)" }}
          >
            <span className="text-[7px] font-semibold text-white">Book Now</span>
          </div>
          <span className="text-[7px] text-[var(--ax-fg-3)]">020 1234 5678</span>
        </div>

        {/* Hero image placeholder */}
        <div
          className="h-10 rounded-[var(--ax-radius-xs)] flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, var(--ax-slate-200) 0%, var(--ax-slate-300) 100%)" }}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[var(--ax-slate-400)]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>

        {/* Star rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} viewBox="0 0 12 12" className="w-2 h-2">
              <path d="M6 0l1.8 3.7 4.2.6-3 2.9.7 4.1L6 9.3 2.3 11.3l.7-4.1-3-2.9 4.2-.6z" fill="var(--ax-warning)" />
            </svg>
          ))}
          <span className="text-[6px] text-[var(--ax-fg-3)] ml-0.5">4.9 from 200+ reviews</span>
        </div>

        {/* Service pills */}
        <div className="flex gap-1">
          {["General", "Cosmetic", "Emergency"].map((s) => (
            <span
              key={s}
              className="text-[6px] px-1.5 py-0.5 rounded-full border border-[var(--ax-slate-300)] text-[var(--ax-slate-600)]"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Benefits */}
        <div className="space-y-1">
          {["Same-day appointments", "No referral needed", "Free initial consultation"].map((b) => (
            <div key={b} className="flex items-center gap-1">
              <Check size={8} className="text-[var(--ax-success)] shrink-0" strokeWidth={2.5} aria-hidden="true" />
              <span className="text-[6px] text-[var(--ax-fg-2)]">{b}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

export function SplitHero() {
  return (
    <div className="w-full">
      {/* Mobile: stacked, good site first */}
      <div className="lg:hidden flex flex-col gap-5">
        <div>
          <span
            className="block text-[10px] uppercase font-bold mb-2"
            style={{
              fontFamily: "var(--ax-font-body)",
              letterSpacing: "0.18em",
              color: "var(--ax-success)",
            }}
          >
            Your website
          </span>
          <GoodSite />
        </div>
        <div>
          <span
            className="block text-[10px] uppercase font-bold mb-2"
            style={{
              fontFamily: "var(--ax-font-body)",
              letterSpacing: "0.18em",
              color: "var(--ax-error)",
              opacity: 0.7,
            }}
          >
            Most websites
          </span>
          <BadSite />
        </div>
      </div>

      {/* Desktop: stacked overlap */}
      <div className="hidden lg:block relative">
        {/* Bad site - behind, dimmed */}
        <div className="relative" style={{ opacity: 0.45 }}>
          <span
            className="block text-[10px] uppercase font-bold mb-2"
            style={{
              fontFamily: "var(--ax-font-body)",
              letterSpacing: "0.18em",
              color: "var(--ax-error)",
              opacity: 0.7,
            }}
          >
            Most websites
          </span>
          <BadSite />
        </div>

        {/* Good site - in front, overlapping upward */}
        <div
          className="relative z-[2] -mt-[12%]"
          style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.2))" }}
        >
          <span
            className="block text-[10px] uppercase font-bold mb-2"
            style={{
              fontFamily: "var(--ax-font-body)",
              letterSpacing: "0.18em",
              color: "var(--ax-success)",
            }}
          >
            Your website
          </span>
          <GoodSite />
        </div>
      </div>
    </div>
  )
}
