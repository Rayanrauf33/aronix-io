"use client"

import { useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { Button } from "@/components/ui/Button"

const CALENDLY = "https://calendly.com/rayanrauf33/muhammad-rayan-15-minute-session"

/* ------------------------------------------------------------------ */
/*  Local pack data                                                     */
/* ------------------------------------------------------------------ */

const packResults = [
  { rank: 1, name: "Your Business", stars: 4.9, reviews: 127, category: "Dental Clinic", isYours: true },
  { rank: 2, name: "Comfort Dental Care", stars: 4.7, reviews: 83, category: "Dentist", isYours: false },
  { rank: 3, name: "City Smiles Dental", stars: 4.5, reviews: 41, category: "Dental Office", isYours: false },
]

/* ------------------------------------------------------------------ */
/*  Star row                                                            */
/* ------------------------------------------------------------------ */

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating)
  return (
    <span className="flex items-center gap-[2px]" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="9" height="9" viewBox="0 0 10 10">
          <polygon
            points="5,0.5 6.12,3.76 9.51,3.76 6.87,5.56 7.87,8.94 5,7.06 2.13,8.94 3.13,5.56 0.49,3.76 3.88,3.76"
            fill={i <= full ? "#FBBC04" : "rgba(255,255,255,0.15)"}
          />
        </svg>
      ))}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function LocalPackHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("seo-pack-reduced")
      return
    }
    requestAnimationFrame(() => el.classList.add("seo-pack-ready"))
  }, [])

  return (
    <>
      <style>{`
        /* ---- Hero copy entrance ------------------------------------ */
        @keyframes seo-hero-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .seo-hero-copy > * {
          opacity: 0;
          animation: seo-hero-in 0.7s cubic-bezier(0.16,1,0.3,1) both;
        }
        .seo-hero-copy > *:nth-child(1) { animation-delay: 0.05s; }
        .seo-hero-copy > *:nth-child(2) { animation-delay: 0.15s; }
        .seo-hero-copy > *:nth-child(3) { animation-delay: 0.25s; }
        .seo-hero-copy > *:nth-child(4) { animation-delay: 0.38s; }

        /* ---- Pack card entrance ------------------------------------ */
        @media (scripting: enabled) {
          .seo-result { opacity: 0; transform: translateY(6px); }
          .seo-badge  { opacity: 0; transform: scale(0.9); }
        }

        @keyframes seo-result-in {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes seo-badge-in {
          to { opacity: 1; transform: scale(1); }
        }

        .seo-pack-ready .seo-r3    { animation: seo-result-in 0.45s cubic-bezier(0.16,1,0.3,1) 0.2s  both; }
        .seo-pack-ready .seo-r2    { animation: seo-result-in 0.45s cubic-bezier(0.16,1,0.3,1) 0.42s both; }
        .seo-pack-ready .seo-r1    { animation: seo-result-in 0.45s cubic-bezier(0.16,1,0.3,1) 0.64s both; }
        .seo-pack-ready .seo-badge { animation: seo-badge-in  0.4s  cubic-bezier(0.34,1.56,0.64,1) 0.92s both; }

        /* ---- Pack card itself slides in --------------------------- */
        .seo-pack-card {
          opacity: 0;
          transform: translateY(20px) scale(0.98);
          animation: seo-card-in 0.65s cubic-bezier(0.16,1,0.3,1) 0.1s both;
        }
        @keyframes seo-card-in {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ---- Reduced motion: show everything immediately ---------- */
        .seo-pack-reduced .seo-result,
        .seo-pack-reduced .seo-badge,
        .seo-pack-reduced .seo-pack-card { opacity: 1 !important; transform: none !important; }
      `}</style>

      <section
        className="px-5 sm:px-12 pt-[144px] pb-20 min-h-[100vh] flex items-center"
        style={{ background: "var(--ax-surface-dark)" }}
        aria-labelledby="seo-hero-heading"
      >
        <div className="max-w-[var(--ax-container)] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: copy ── */}
          <div className="seo-hero-copy">
            <Eyebrow tone="accent" className="mb-4">Local SEO</Eyebrow>
            <h1
              id="seo-hero-heading"
              className="text-[var(--ax-fg-on-dark)] mb-6"
              style={{
                fontFamily: "var(--ax-font-display)",
                fontWeight: 800,
                fontSize: "var(--ax-fs-display)",
                lineHeight: "var(--ax-lh-tight)",
                letterSpacing: "var(--ax-tracking-tight)",
              }}
            >
              Show up when local customers are searching.
            </h1>
            <p
              className="text-[var(--ax-fg-on-dark-2)] mb-10 leading-[1.65]"
              style={{ fontSize: "var(--ax-fs-body-lg)" }}
            >
              When someone searches &ldquo;dentist near me&rdquo; or &ldquo;HVAC
              repair [your city],&rdquo; there are three businesses at the top of
              Google and then there&apos;s everyone else. Local SEO is the work
              that puts your business in those three spots instead of a
              competitor&apos;s.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href={CALENDLY} variant="dark" size="lg">
                Get a free SEO audit
              </Button>
              <Button
                href={CALENDLY}
                variant="outline"
                size="lg"
                className="text-white border-white/30 hover:bg-white/10 hover:text-white hover:border-white/60"
              >
                Book a Call
              </Button>
            </div>
          </div>

          {/* ── Right: local pack simulation (hidden on mobile) ── */}
          <div
            ref={containerRef}
            className="hidden lg:block"
            aria-hidden="true"
          >
            <div
              className="seo-pack-card rounded-[var(--ax-radius-xl)] overflow-hidden"
              style={{
                background: "var(--ax-surface-dark-alt)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
              }}
            >
              {/* Search bar */}
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
              >
                <Search size={13} className="text-[var(--ax-fg-on-dark-2)] shrink-0" />
                <span
                  className="text-[13px] text-[var(--ax-fg-on-dark-2)] flex-1"
                  style={{ fontFamily: "var(--ax-font-mono)" }}
                >
                  dentist near me
                </span>
                <span className="text-[11px] text-[var(--ax-fg-on-dark-2)] opacity-40">
                  Google
                </span>
              </div>

              {/* Map strip */}
              <div
                className="h-16 relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #111a11 0%, #0d130d 50%, #11111a 100%)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 48px), repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 48px)",
                  }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: "var(--ax-primary)",
                      boxShadow: "0 0 0 5px rgba(234,75,113,0.2)",
                    }}
                  />
                </div>
              </div>

              {/* Results */}
              <div>
                {packResults.map((r) => (
                  <div
                    key={r.rank}
                    className={`seo-result seo-r${r.rank} flex items-start gap-4 px-5 py-4`}
                    style={{
                      background: r.isYours ? "rgba(234,75,113,0.07)" : undefined,
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {/* Rank circle */}
                    <div
                      className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold mt-0.5"
                      style={{
                        background: r.isYours ? "var(--ax-primary)" : "rgba(255,255,255,0.08)",
                        color: r.isYours ? "#fff" : "var(--ax-fg-on-dark-2)",
                        fontFamily: "var(--ax-font-display)",
                      }}
                    >
                      {r.rank}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <span
                          className="text-[14px] font-semibold text-[var(--ax-fg-on-dark)] leading-none"
                          style={{ fontFamily: "var(--ax-font-display)" }}
                        >
                          {r.name}
                        </span>
                        {r.isYours && (
                          <span
                            className="seo-badge text-[9px] font-bold uppercase tracking-[0.08em] px-1.5 py-0.5 rounded-full"
                            style={{
                              background: "var(--ax-primary)",
                              color: "#fff",
                              fontFamily: "var(--ax-font-mono)",
                            }}
                          >
                            Your business
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Stars rating={r.stars} />
                        <span className="text-[12px] text-[var(--ax-fg-on-dark-2)]">
                          {r.stars} ({r.reviews})
                        </span>
                        <span className="text-[12px] text-[var(--ax-fg-on-dark-2)] opacity-40">
                          &middot;
                        </span>
                        <span className="text-[12px] text-[var(--ax-fg-on-dark-2)]">
                          {r.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
