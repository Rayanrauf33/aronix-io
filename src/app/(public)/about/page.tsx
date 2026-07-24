import type { Metadata } from "next"
import Image from "next/image"
import { Reveal } from "@/components/ui/Reveal"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { CtaBand } from "@/components/sections/CtaBand"
import { breadcrumbSchema, personSchema, toJsonLd } from "@/lib/schema"

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "About Aronix | Meet the Founders",
  description:
    "Ahmed and Rayan built Aronix to help service businesses stop losing leads and drowning in manual work. Meet the people behind the automation.",
  openGraph: {
    title: "About Aronix | Meet the Founders",
    description:
      "Ahmed and Rayan built Aronix to help service businesses stop losing leads and drowning in manual work.",
    url: "/about",
    siteName: "Aronix",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "About Aronix | Meet the Founders" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Aronix | Meet the Founders",
    description:
      "Ahmed and Rayan built Aronix to help service businesses stop losing leads and drowning in manual work.",
    images: ["/opengraph-image"],
  },
  alternates: { canonical: "/about" },
}

/* ------------------------------------------------------------------ */
/*  Founder data                                                       */
/* ------------------------------------------------------------------ */

/*
 * Photo placeholder note: each founder card currently shows an initials
 * avatar. Real headshots would meaningfully improve this page and should
 * be swapped in once available.
 */
const founders = [
  {
    image: "/Team/Ahmed.png",
    name: "Ahmed Asif",
    role: "Co-Founder",
    bio: "Ahmed builds the AI systems at Aronix, voice agents, lead response automation, and the automated workflows in between, for service businesses. Outside of client work, he writes about agentic AI security and practical deployment patterns for businesses adopting AI.",
    linkedin: "https://www.linkedin.com/in/ahmedasifchaudhary",
    linkedinLabel: "Ahmed Asif on LinkedIn",
  },
  {
    image: "/Team/Rayan-Profile-picture.png",
    imageScale: "scale(1.3)",
    name: "Muhammad Rayan",
    role: "Co-Founder",
    bio: "Rayan focuses on business process automation and operations. He works directly with clients to map their existing workflows, identify where manual work is costing the most, and oversee the build of the systems that replace it.",
    linkedin: "https://www.linkedin.com/in/muhammad-rayan-business-process-automation/",
    linkedinLabel: "Muhammad Rayan on LinkedIn",
  },
]

const LINKEDIN_ICON_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: toJsonLd(breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About" },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: toJsonLd(personSchema({
            name: "Ahmed Asif",
            jobTitle: "Co-Founder",
            sameAs: "https://www.linkedin.com/in/ahmedasifchaudhary",
          })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: toJsonLd(personSchema({
            name: "Muhammad Rayan",
            jobTitle: "Co-Founder",
            sameAs: "https://www.linkedin.com/in/muhammad-rayan-business-process-automation/",
          })),
        }}
      />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section
        className="px-5 sm:px-12 pt-[176px] pb-28"
        aria-labelledby="about-heading"
      >
        <div className="max-w-[var(--ax-container)] mx-auto">
          <Eyebrow className="mb-5">The team</Eyebrow>
          <h1
            id="about-heading"
            className="text-[var(--ax-fg-1)] mb-7"
            style={{
              fontFamily: "var(--ax-font-display)",
              fontWeight: 800,
              fontSize: "clamp(40px, 5.5vw, 72px)",
              lineHeight: 1.08,
              letterSpacing: "var(--ax-tracking-tight)",
              maxWidth: "620px",
            }}
          >
            The people behind Aronix.
          </h1>
          <p
            className="text-[var(--ax-fg-2)]"
            style={{
              fontFamily: "var(--ax-font-body)",
              fontSize: "var(--ax-fs-body-lg)",
              lineHeight: "var(--ax-lh-relaxed)",
              maxWidth: "500px",
            }}
          >
            A small team with a focused mission: remove the manual work that is
            slowing your business down.
          </p>
        </div>
      </section>

      {/* ── Founder cards ─────────────────────────────────────────── */}
      <section
        className="px-5 sm:px-12 pb-28"
        aria-labelledby="founders-heading"
      >
        <h2 id="founders-heading" className="sr-only">Founders</h2>
        <div className="max-w-[var(--ax-container)] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-[900px]">
            {founders.map((founder) => (
              <Reveal key={founder.name}>
                <article
                  className="flex flex-col h-full rounded-[var(--ax-radius-xl)] p-8 sm:p-10"
                  style={{
                    background: "var(--ax-bg)",
                    border: "1px solid var(--ax-border)",
                  }}
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 mb-7">
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                      style={founder.imageScale ? { transform: founder.imageScale, transformOrigin: "center" } : undefined}
                    />
                  </div>

                  {/* Name and title */}
                  <div className="mb-6">
                    <p
                      className="text-[var(--ax-fg-1)] mb-1.5"
                      style={{
                        fontFamily: "var(--ax-font-display)",
                        fontWeight: 600,
                        fontSize: "20px",
                        lineHeight: 1.2,
                      }}
                    >
                      {founder.name}
                    </p>
                    <p
                      className="text-[var(--ax-fg-3)]"
                      style={{
                        fontFamily: "var(--ax-font-mono)",
                        fontSize: "11px",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {founder.role}
                    </p>
                  </div>

                  {/* Bio */}
                  <p
                    className="text-[var(--ax-fg-2)] flex-1"
                    style={{
                      fontFamily: "var(--ax-font-body)",
                      fontSize: "16px",
                      lineHeight: 1.8,
                    }}
                  >
                    {founder.bio}
                  </p>

                  {/* LinkedIn */}
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={founder.linkedinLabel}
                    className="mt-8 inline-flex items-center gap-2 transition-colors duration-150 hover:text-[var(--ax-fg-1)]"
                    style={{
                      color: "var(--ax-fg-3)",
                      fontFamily: "var(--ax-font-body)",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="15"
                      height="15"
                      fill="currentColor"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d={LINKEDIN_ICON_PATH} />
                    </svg>
                    LinkedIn
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why we started this ───────────────────────────────────── */}
      <Reveal>
        <section
          className="px-5 sm:px-12 py-28"
          style={{ background: "var(--ax-slate-100)" }}
          aria-labelledby="mission-heading"
        >
          <div className="max-w-[640px] mx-auto">
            <Eyebrow className="mb-5">Why we started this</Eyebrow>
            <h2
              id="mission-heading"
              className="text-[var(--ax-fg-1)] mb-10"
              style={{
                fontFamily: "var(--ax-font-display)",
                fontWeight: 700,
                fontSize: "clamp(26px, 3vw, 36px)",
                lineHeight: 1.2,
                letterSpacing: "-0.015em",
              }}
            >
              Good businesses losing ground to manual work they never chose.
            </h2>
            <div
              className="space-y-7 text-[var(--ax-fg-2)]"
              style={{
                fontFamily: "var(--ax-font-body)",
                fontSize: "17px",
                lineHeight: 1.8,
              }}
            >
              <p>
                Service businesses run on people. Quotes, bookings, follow-ups,
                month-end close. All of it falls on a small team that is already
                stretched. The result is leads going cold while someone is with
                another customer, admin tasks pushing into evenings, and growth
                stalling because there are not enough hours.
              </p>
              <p>
                We kept seeing the same pattern. Good businesses, run by people
                who knew exactly what they were doing, losing ground not because
                of anything wrong with their work but because the manual processes
                they relied on stopped scaling. The fix was not hiring more people.
                It was automating the repetitive parts so the team already there
                could focus on higher-value work.
              </p>
              <p
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(20px, 2.2vw, 26px)",
                  lineHeight: 1.35,
                  color: "var(--ax-fg-1)",
                  letterSpacing: "-0.01em",
                  marginTop: "2.5rem",
                  marginBottom: "1.25rem",
                  paddingLeft: "1.25rem",
                  borderLeft: "3px solid var(--ax-primary)",
                }}
              >
                Most automation tools assume you have a technical team and an IT
                budget. We assume you have a business to run.
              </p>
              <p>
                We build the systems, manage them, and make sure they work. You get
                the results without needing to become a software company.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── CTA band -- matches the closing pattern on all other pages ── */}
      <CtaBand />
    </>
  )
}
