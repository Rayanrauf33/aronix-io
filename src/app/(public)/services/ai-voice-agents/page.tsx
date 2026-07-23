import type { Metadata } from "next"
import {
  Phone,
  Bot,
  CalendarCheck,
  MessageSquareText,
  UserCheck,
  Mic,
  Clock,
  Shield,
  Play,
  Stethoscope,
  Wrench,
  UtensilsCrossed,
} from "lucide-react"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { Button } from "@/components/ui/Button"
import { Reveal } from "@/components/ui/Reveal"
import { FAQAccordion } from "@/components/services/FAQAccordion"
import { ServiceCTA } from "@/components/services/ServiceCTA"
import { StatCountUp } from "@/components/ui/StatCountUp"
import { CallFlowDiagram } from "@/components/services/voice/CallFlowDiagram"
import { VoiceHeroCard } from "@/components/services/voice/VoiceHeroCard"
import { breadcrumbSchema, faqSchema, serviceSchema, toJsonLd } from "@/lib/schema"

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "AI Voice Agents for Service Businesses",
  description:
    "An AI receptionist that answers in two rings, books appointments into your calendar, and texts you a summary of every call. Nights and weekends included.",
  openGraph: {
    title: "AI Voice Agents for Service Businesses | Aronix",
    description:
      "An AI receptionist that answers in two rings, books appointments into your calendar, and texts you a summary of every call. Nights and weekends included.",
    url: "/services/ai-voice-agents",
    siteName: "Aronix",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "AI Voice Agents | Aronix" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Voice Agents for Service Businesses | Aronix",
    description: "An AI receptionist that answers in two rings, books appointments into your calendar, and texts you a summary of every call. Nights and weekends included.",
    images: ["/opengraph-image"],
  },
  alternates: { canonical: "/services/ai-voice-agents" },
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const CALENDLY =
  "https://calendly.com/rayanrauf33/muhammad-rayan-15-minute-session"

const stats = [
  { num: 62, suffix: "%", lbl: "Calls to small businesses that go unanswered" },
  { num: 85, suffix: "%", lbl: "Of missed callers who never call back" },
  { num: 1200, prefix: "$", comma: true, lbl: "Average value of a missed home services call" },
  { num: 45, suffix: "%", lbl: "Of high-intent calls that come in after hours" },
]

const buildFeatures = [
  {
    icon: Bot,
    title: "Always on",
    desc: "We build you an AI receptionist trained on your business. It knows your services, your prices, your hours, and your service area. It answers in two rings, every time, including nights, weekends, and the lunch rush.",
  },
  {
    icon: CalendarCheck,
    title: "Books real appointments",
    desc: "It holds a normal conversation. It answers the common questions, handles the back-and-forth, and books the appointment directly into your calendar. Real slots only, so it can\u2019t double-book you.",
  },
  {
    icon: UserCheck,
    title: "Smart escalation",
    desc: "When a call needs a human, it doesn\u2019t guess. It takes the caller\u2019s details, tells them someone will follow up, and texts you right away. You set the rules for what counts as urgent.",
  },
  {
    icon: MessageSquareText,
    title: "Instant summaries",
    desc: "After every call you get a text summary: who called, what they wanted, what got booked. Nothing sits in voicemail. Nothing gets lost.",
  },
]

const processSteps = [
  {
    n: "01",
    t: "Map",
    d: "We listen to how your calls actually go today. What people ask, what gets booked, and where calls get missed.",
  },
  {
    n: "02",
    t: "Build",
    d: "We train the agent on your services, scripts, and calendar. It sounds like your business because it\u2019s built from your business.",
  },
  {
    n: "03",
    t: "Test",
    d: "We throw real scenarios at it until it stops breaking. Odd questions, impatient callers, tricky bookings. You approve it before it ever takes a live call.",
  },
  {
    n: "04",
    t: "Launch and tune",
    d: "It goes live on your existing number. We review the recordings in the first weeks and tighten anything that\u2019s off, then keep tuning monthly.",
  },
]

const includedItems = [
  { icon: Phone, text: "Your voice agent, live on your existing phone number" },
  { icon: CalendarCheck, text: "Direct booking into the calendar you already use" },
  { icon: MessageSquareText, text: "SMS summary to your phone after every call" },
  { icon: Mic, text: "Call recordings and transcripts in a simple dashboard" },
  { icon: Shield, text: "Escalation rules you control, so urgent calls reach a human fast" },
  { icon: Clock, text: "Monthly review and tuning" },
]

const industries = [
  { icon: Stethoscope, name: "Healthcare", desc: "Clinics, dental, and medical practices" },
  { icon: Wrench, name: "Home Services", desc: "HVAC, plumbing, and electrical" },
  { icon: UtensilsCrossed, name: "Hospitality", desc: "Salons, restaurants, and hotels" },
]

const faqItems = [
  {
    question: "Will it sound robotic?",
    answer:
      "Listen to the demo above and judge for yourself. We tune the voice, pacing, and script to match how your front desk actually talks. Callers are informed they\u2019re speaking with an AI assistant where that\u2019s required.",
  },
  {
    question: "What happens when it can\u2019t answer something?",
    answer:
      "It doesn\u2019t make things up. It takes the caller\u2019s name, number, and question, tells them a human will follow up, and texts you immediately. You decide which situations get escalated straight to your phone.",
  },
  {
    question: "Do I need to change my phone number?",
    answer:
      "No. It runs on your existing number. We can have it answer every call, or only pick up when your team hasn\u2019t answered within a few rings.",
  },
  {
    question: "Can it double-book me or make up prices?",
    answer:
      "It books through your real calendar, so it can only take open slots. Prices and policies come from the information you approve during setup, and every call is recorded so anything off gets caught and fixed.",
  },
  {
    question: "How long until it\u2019s live?",
    answer:
      "A few weeks from kickoff to launch depending on scope \u2014 we\u2019ll confirm an exact timeline after the audit. Most of that is testing, because we don\u2019t put it on live calls until you\u2019ve approved how it handles the hard ones.",
  },
  {
    question: "What if it doesn\u2019t work for my business?",
    answer:
      "Then we\u2019ll say so before you pay for a build. The audit exists to check whether your call volume and job value actually justify this. Sometimes the honest answer is a simple missed-call text-back instead, and that\u2019s a smaller project.",
  },
]

const faqSchemaItems = faqItems.map((f) => ({
  label: f.question,
  content: f.answer,
}))

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AIVoiceAgentsPage() {
  return (
    <>
      {/* ── Schema ──────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: toJsonLd(breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "AI Voice Agents" },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchema(faqSchemaItems)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(serviceSchema({
          name: "AI Voice Agents",
          description: "An AI receptionist that answers in two rings, books appointments into your calendar, and texts you a summary of every call. Nights and weekends included.",
          url: "/services/ai-voice-agents",
        })) }}
      />

      {/* ── Hero (split layout) ────────────────────────── */}
      <Reveal>
        <section
          className="px-5 sm:px-12 pt-[144px] pb-20 min-h-[100vh] flex items-center"
          style={{ background: "var(--ax-soft-blush)" }}
          aria-labelledby="voice-hero-heading"
        >
          <div className="max-w-[var(--ax-container)] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: copy */}
            <div>
              <Eyebrow className="mb-4">AI Voice Agents</Eyebrow>
              <h1
                id="voice-hero-heading"
                className="text-[var(--ax-fg-1)] mb-6"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 800,
                  fontSize: "var(--ax-fs-display)",
                  lineHeight: "var(--ax-lh-tight)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                Every call answered. Every job booked.
              </h1>
              <p className="text-[var(--ax-fs-body-lg)] leading-[1.6] text-[var(--ax-fg-2)] mb-10">
                An AI receptionist that picks up in two rings, answers questions
                about your business, and books the appointment straight into your
                calendar. Built for service businesses where a missed call is a
                lost job.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href="#demo" variant="primary" size="lg">
                  Hear it take a real call
                </Button>
                <Button href={CALENDLY} variant="outline" size="lg">
                  Book an Audit
                </Button>
              </div>
            </div>

            {/* Right: call simulation card */}
            <div className="hidden lg:block">
              <VoiceHeroCard />
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── The problem ─────────────────────────────────── */}
      <Reveal>
        <section className="px-5 sm:px-12 py-20" aria-labelledby="problem-heading">
          <div className="max-w-[620px] mx-auto">
            <Eyebrow className="mb-3.5">Why this matters</Eyebrow>
            <h2
              id="problem-heading"
              className="sr-only"
            >
              Why this matters
            </h2>
            <div className="text-[var(--ax-fs-body-lg)] leading-[1.7] text-[var(--ax-fg-2)] flex flex-col gap-5">
              <p className="m-0">
                62% of calls to small businesses go unanswered. Of the people
                who don&apos;t reach you, 85% never call back. They call the
                next business on Google.
              </p>
              <p className="m-0">
                Voicemail doesn&apos;t save you. Around 8 in 10 callers hang up
                without leaving a message, so you never even find out the job
                existed.
              </p>
              <p className="m-0">
                For a home services company, the average missed call is worth
                around $1,200. Miss two a day and you&apos;re funding a
                competitor&apos;s good month.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Stat strip (count-up on scroll) ──────────── */}
      <section
        aria-label="Missed call statistics"
        className="px-5 sm:px-12 py-16"
        style={{ background: "var(--ax-surface-dark)" }}
      >
        <div className="max-w-[var(--ax-container)] mx-auto">
          <StatCountUp stats={stats} />
        </div>
      </section>

      {/* ── What we build (sticky left + scrolling cards) ── */}
      <Reveal>
        <section className="px-5 sm:px-12 py-20" aria-labelledby="build-heading">
          <div className="max-w-[var(--ax-container)] mx-auto">
            {/* Two-column: sticky heading + cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div className="lg:sticky lg:top-[120px] lg:self-start">
                <Eyebrow className="mb-3.5">What we build</Eyebrow>
                <h2
                  id="build-heading"
                  className="text-[var(--ax-fg-1)] mb-0"
                  style={{
                    fontFamily: "var(--ax-font-display)",
                    fontWeight: 700,
                    fontSize: "var(--ax-fs-h2)",
                    lineHeight: "var(--ax-lh-snug)",
                    letterSpacing: "var(--ax-tracking-tight)",
                  }}
                >
                  What we build
                </h2>
              </div>

              <div className="flex flex-col gap-5">
                {buildFeatures.map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="glass-card rounded-[var(--ax-radius-xl)] p-6 sm:p-8"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-[var(--ax-radius-pill)] flex items-center justify-center shrink-0"
                        style={{
                          background: "var(--ax-pink-50)",
                          color: "var(--ax-primary)",
                        }}
                      >
                        <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                      </div>
                      <h3
                        className="text-[18px] text-[var(--ax-fg-1)] m-0"
                        style={{
                          fontFamily: "var(--ax-font-display)",
                          fontWeight: 600,
                        }}
                      >
                        {title}
                      </h3>
                    </div>
                    <p className="text-[var(--ax-fs-body-lg)] leading-[1.7] text-[var(--ax-fg-2)] m-0">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Call flow diagram (outside grid so sticky heading cannot overlap) */}
            <div className="mt-16">
              <CallFlowDiagram />
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── How it works (2x2 grid with watermark numbers) ── */}
      <Reveal>
        <section
          className="px-5 sm:px-12 py-20"
          style={{ background: "var(--ax-surface-dark)" }}
          aria-labelledby="process-heading"
        >
          <div className="max-w-[var(--ax-container)] mx-auto">
            <div className="text-center mb-14 max-w-[640px] mx-auto">
              <Eyebrow className="mb-3.5" tone="muted">
                From first call to fully live
              </Eyebrow>
              <h2
                id="process-heading"
                className="text-[var(--ax-fg-on-dark)]"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                From first call to fully live
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {processSteps.map(({ n, t, d }) => (
                <div
                  key={n}
                  className="relative rounded-[var(--ax-radius-xl)] border border-white/8 p-8 sm:p-10 overflow-hidden"
                  style={{ background: "var(--ax-surface-dark-alt)" }}
                >
                  {/* Watermark number */}
                  <span
                    className="absolute top-4 right-6 select-none pointer-events-none"
                    aria-hidden="true"
                    style={{
                      fontFamily: "var(--ax-font-display)",
                      fontWeight: 800,
                      fontSize: "clamp(80px, 8vw, 120px)",
                      lineHeight: 1,
                      color: "rgba(255, 255, 255, 0.04)",
                    }}
                  >
                    {n}
                  </span>

                  <div className="relative z-10">
                    <div className="hiw-badge mb-5" style={{ margin: "0 0 20px" }}>{n}</div>
                    <h3
                      className="mb-2.5 text-[20px] text-[var(--ax-fg-on-dark)]"
                      style={{
                        fontFamily: "var(--ax-font-display)",
                        fontWeight: 600,
                      }}
                    >
                      {t}
                    </h3>
                    <p className="text-[15px] leading-[1.6] text-[var(--ax-fg-on-dark-2)] m-0">
                      {d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── What's included (2x3 icon card grid) ────────── */}
      <Reveal>
        <section
          className="px-5 sm:px-12 py-20"
          style={{ background: "var(--ax-slate-100)" }}
          aria-labelledby="included-heading"
        >
          <div className="max-w-[var(--ax-container)] mx-auto">
            <div className="text-center mb-12">
              <Eyebrow className="mb-3.5">What&apos;s included</Eyebrow>
              <h2
                id="included-heading"
                className="text-[var(--ax-fg-1)]"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                Everything in the box
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {includedItems.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="rounded-[var(--ax-radius-lg)] border border-[var(--ax-border)] p-6 text-center"
                  style={{ background: "var(--ax-bg)" }}
                >
                  <div
                    className="w-12 h-12 rounded-[var(--ax-radius-pill)] mx-auto mb-4 flex items-center justify-center"
                    style={{
                      background: "var(--ax-pink-50)",
                      color: "var(--ax-primary)",
                    }}
                  >
                    <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <p className="text-[15px] leading-[1.5] text-[var(--ax-fg-2)] m-0">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Who it's for + industry tiles ───────────────── */}
      <Reveal>
        <section
          className="px-5 sm:px-12 py-20"
          style={{ background: "var(--ax-soft-blush)" }}
          aria-labelledby="audience-heading"
        >
          <div className="max-w-[620px] mx-auto">
            <Eyebrow className="mb-3.5">
              Built for businesses that live on the phone
            </Eyebrow>
            <h2 id="audience-heading" className="sr-only">
              Built for businesses that live on the phone
            </h2>
            <div className="text-[var(--ax-fs-body-lg)] leading-[1.7] text-[var(--ax-fg-2)] flex flex-col gap-5 mb-10">
              <p className="m-0">
                Dental and medical clinics, where every unanswered ring is a
                patient booking somewhere else. HVAC, plumbing, and electrical,
                where your techs are on ladders and can&apos;t pick up. Salons,
                med spas, restaurants, and hotels, where the phone rings hardest
                exactly when your staff is busiest.
              </p>
              <p className="m-0">
                If most of your new business starts with a phone call, this is
                for you.
              </p>
            </div>

            {/* Industry tiles */}
            <div className="flex flex-col gap-3">
              {industries.map(({ icon: Icon, name, desc }) => (
                <div
                  key={name}
                  className="flex items-center gap-4 rounded-[var(--ax-radius-lg)] border border-[var(--ax-border)] p-4"
                  style={{ background: "var(--ax-bg)" }}
                >
                  <div
                    className="w-10 h-10 rounded-[var(--ax-radius-pill)] flex items-center justify-center shrink-0"
                    style={{
                      background: "var(--ax-pink-50)",
                      color: "var(--ax-primary)",
                    }}
                  >
                    <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <div>
                    <div
                      className="text-[15px] font-semibold text-[var(--ax-fg-1)]"
                      style={{ fontFamily: "var(--ax-font-display)" }}
                    >
                      {name}
                    </div>
                    <div className="text-[13px] text-[var(--ax-fg-3)]">
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Demo (dark audio player card) ───────────────── */}
      <Reveal>
        <section
          id="demo"
          className="px-5 sm:px-12 py-20"
          aria-labelledby="demo-heading"
        >
          <div className="max-w-[620px] mx-auto">
            <Eyebrow className="mb-3.5">Hear it for yourself</Eyebrow>
            <h2 id="demo-heading" className="sr-only">
              Hear it for yourself
            </h2>
            <p className="text-[var(--ax-fs-body-lg)] leading-[1.6] text-[var(--ax-fg-2)] mb-8">
              Don&apos;t take our word for how it sounds. This is the agent
              taking a real booking call, unedited.
            </p>

            {/* Audio player card */}
            <div
              className="rounded-[var(--ax-radius-xl)] p-8"
              style={{ background: "var(--ax-surface-dark)" }}
            >
              <div
                className="text-[11px] uppercase tracking-[0.1em] text-[var(--ax-fg-on-dark-2)] mb-6"
                style={{ fontFamily: "var(--ax-font-mono)" }}
              >
                Demo: Booking call
              </div>
              <div className="flex items-center gap-5">
                <div
                  className="w-14 h-14 rounded-[var(--ax-radius-pill)] flex items-center justify-center shrink-0 cursor-pointer"
                  style={{ background: "var(--ax-primary)" }}
                  role="img"
                  aria-label="Play button (audio coming soon)"
                >
                  <Play
                    size={22}
                    fill="white"
                    stroke="white"
                    className="ml-0.5"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  {/* Progress bar */}
                  <div
                    className="h-1.5 rounded-[var(--ax-radius-pill)] mb-2.5 overflow-hidden"
                    style={{ background: "var(--ax-slate-800)" }}
                  >
                    <div
                      className="h-full rounded-[var(--ax-radius-pill)]"
                      style={{ background: "var(--ax-primary)", width: 0 }}
                    />
                  </div>
                  <div
                    className="flex justify-between text-[12px] text-[var(--ax-fg-on-dark-2)]"
                    style={{ fontFamily: "var(--ax-font-mono)" }}
                  >
                    <span>0:00</span>
                    <span>2:34</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Pricing (centered card) ─────────────────────── */}
      <Reveal>
        <section
          className="px-5 sm:px-12 py-20"
          style={{ background: "var(--ax-soft-blush)" }}
          aria-labelledby="pricing-heading"
        >
          <div className="max-w-[480px] mx-auto">
            <div
              className="rounded-[var(--ax-radius-xl)] border border-[var(--ax-border)] p-8 sm:p-10 text-center"
              style={{ background: "var(--ax-bg)" }}
            >
              <Eyebrow className="mb-3">What it costs</Eyebrow>
              <div className="mb-1">
                <span
                  className="text-[var(--ax-fg-3)] text-[15px] font-medium"
                  style={{ fontFamily: "var(--ax-font-display)" }}
                >
                  Starting from
                </span>
                <h2
                  id="pricing-heading"
                  className="text-[var(--ax-fg-1)] m-0"
                  style={{
                    fontFamily: "var(--ax-font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(36px, 4vw, 48px)",
                    lineHeight: 1.1,
                    letterSpacing: "var(--ax-tracking-tight)",
                  }}
                >
                  $0.06<span className="text-[20px] font-semibold text-[var(--ax-fg-3)]">/min</span>
                </h2>
              </div>
              <p className="text-[15px] text-[var(--ax-fg-2)] mb-6 m-0">
                Pay only for what the agent handles. No monthly minimums, no surprises.
              </p>

              <div
                className="h-px mb-6"
                style={{ background: "var(--ax-border)" }}
                aria-hidden="true"
              />

              <p className="text-[15px] leading-[1.6] text-[var(--ax-fg-2)] mb-8 m-0">
                You&apos;ll know the full cost before we build anything. No
                flat monthly fee, no surprises. If your call volume doesn&apos;t
                justify the build, we&apos;ll tell you on the first call.
              </p>

              <Button href={CALENDLY} variant="primary" size="lg">
                Book an Audit
              </Button>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── FAQ (pink left border on open items) ────────── */}
      <Reveal>
        <section className="px-5 sm:px-12 py-20" aria-labelledby="faq-heading">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center mb-14">
              <Eyebrow className="mb-3.5">FAQ</Eyebrow>
              <h2
                id="faq-heading"
                className="text-[var(--ax-fg-1)]"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                Common questions
              </h2>
            </div>
            <div className="faq-pink">
              <FAQAccordion items={faqItems} defaultOpen={0} />
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Final CTA ───────────────────────────────────── */}
      <Reveal>
        <ServiceCTA
          headline="Find out what your missed calls are costing you."
          sub={"Book a 15-minute call. We\u2019ll look at your call flow and tell you straight whether a voice agent makes sense for your business. If it doesn\u2019t, we\u2019ll say so."}
          buttonLabel="Book an Audit"
        />
      </Reveal>
    </>
  )
}
