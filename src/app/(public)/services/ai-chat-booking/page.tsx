import type { Metadata } from "next"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { Button } from "@/components/ui/Button"
import { Reveal } from "@/components/ui/Reveal"
import { FAQAccordion } from "@/components/services/FAQAccordion"
import { ServiceCTA } from "@/components/services/ServiceCTA"
import { ChatHeroBrowser } from "@/components/services/chat/ChatHeroBrowser"
import { BeforeAfterCards } from "@/components/services/chat/BeforeAfterCards"
import { ChatFeatureReveal } from "@/components/services/chat/ChatFeatureReveal"
import { ChatFlowTimeline } from "@/components/services/chat/ChatFlowTimeline"
import { HorizontalScrollSteps } from "@/components/services/chat/HorizontalScrollSteps"
import { TerminalWindow } from "@/components/services/chat/TerminalWindow"
import { IndustryTiles } from "@/components/services/chat/IndustryTiles"
import { ChatPricingCard } from "@/components/services/chat/ChatPricingCard"
import { breadcrumbSchema, faqSchema, serviceSchema, toJsonLd } from "@/lib/schema"

/* ------------------------------------------------------------------ */
/*  Metadata                                                            */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "AI Chat & Booking for Service Businesses",
  description:
    "An AI chat agent on your website that answers questions, qualifies visitors, and books appointments directly into your calendar. Works while you sleep.",
  openGraph: {
    title: "AI Chat & Booking for Service Businesses | Aronix",
    description:
      "An AI chat agent on your website that answers questions, qualifies visitors, and books appointments directly into your calendar. Works while you sleep.",
    url: "/services/ai-chat-booking",
    siteName: "Aronix",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "AI Chat & Booking | Aronix" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Chat & Booking for Service Businesses | Aronix",
    description: "An AI chat agent on your website that answers questions, qualifies visitors, and books appointments directly into your calendar. Works while you sleep.",
    images: ["/opengraph-image"],
  },
  alternates: { canonical: "/services/ai-chat-booking" },
}

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const CALENDLY =
  "https://calendly.com/rayanrauf33/muhammad-rayan-15-minute-session"

const stats = [
  { val: "1-3%", lbl: "Average conversion rate for a service business website" },
  { val: "42%", lbl: "Of website visitors who expect a response within 60 seconds" },
  { val: "5x", lbl: "More likely to qualify a lead if you engage within 5 minutes of first contact" },
  { val: "79%", lbl: "Of consumers prefer live chat for quick questions" },
]

const faqItems = [
  {
    question: "Is this just a basic chatbot with preset answers?",
    answer:
      "No. It\u2019s a conversational AI agent that handles open-ended questions, not a button tree. It can respond to questions it wasn\u2019t explicitly trained on by reasoning from your knowledge base, the same way a well-briefed member of staff would.",
  },
  {
    question: "What if it gets something wrong?",
    answer:
      "Every conversation is logged. If it gives a wrong answer, we catch it in the monthly review and update the knowledge base so it doesn\u2019t happen again. For anything genuinely sensitive like pricing disputes or complaints, we set escalation rules so those conversations route to you directly.",
  },
  {
    question: "Can it book into my existing calendar system?",
    answer:
      "Yes, as long as your calendar has an integration available. We check this during the audit. The common ones like Google Calendar, Calendly, and Acuity all connect cleanly.",
  },
  {
    question: "Will visitors know they\u2019re talking to an AI?",
    answer:
      "We configure the agent to be transparent about being an AI assistant where that\u2019s the right call for your market. Some businesses prefer this framed as a virtual assistant. We discuss this with you during setup and handle it in a way that fits your brand.",
  },
  {
    question: "Can it handle multiple languages?",
    answer:
      "Yes. If a meaningful portion of your website visitors aren\u2019t native English speakers, we can configure the agent to detect the language and respond accordingly. Worth raising during the audit if this applies to you.",
  },
  {
    question: "What happens when I add new services or change my pricing?",
    answer:
      "You let us know and we update the knowledge base. That\u2019s included in the monthly management. You\u2019re not maintaining a complex system yourself.",
  },
]

const faqSchemaItems = faqItems.map((f) => ({
  label: f.question,
  content: f.answer,
}))

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function AIChatBookingPage() {
  return (
    <>
      {/* -- Schema ------------------------------------------------- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: toJsonLd(breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "AI Chat & Booking" },
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
          name: "AI Chat & Booking",
          description: "An AI chat agent on your website that answers questions, qualifies visitors, and books appointments directly into your calendar. Works while you sleep.",
          url: "/services/ai-chat-booking",
        })) }}
      />

      {/* -- Hero --------------------------------------------------- */}
      <section
        className="px-5 sm:px-12 pt-[144px] pb-20 min-h-[100vh] flex items-center"
        style={{ background: "var(--ax-surface-dark)" }}
        aria-labelledby="chat-hero-heading"
      >
        <div className="max-w-[var(--ax-container)] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <div>
            <Eyebrow className="mb-4" tone="muted">AI Chat &amp; Booking</Eyebrow>
            <h1
              id="chat-hero-heading"
              className="text-[var(--ax-fg-on-dark)] mb-6"
              style={{
                fontFamily: "var(--ax-font-display)",
                fontWeight: 800,
                fontSize: "var(--ax-fs-display)",
                lineHeight: "var(--ax-lh-tight)",
                letterSpacing: "var(--ax-tracking-tight)",
              }}
            >
              Your website, working while you sleep.
            </h1>
            <p className="text-[var(--ax-fs-body-lg)] leading-[1.6] text-[var(--ax-fg-on-dark-2)] mb-10">
              Most business websites are expensive brochures. Visitors land,
              read a bit, and leave without making contact. An AI chat agent
              changes that. It greets them, answers their questions, and books
              the appointment before they close the tab.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="#demo" variant="primary" size="lg">
                See a live demo
              </Button>
              <Button href={CALENDLY} variant="outline" size="lg">
                Book an Audit
              </Button>
            </div>
          </div>

          {/* Right: browser mockup */}
          <ChatHeroBrowser />
        </div>
      </section>

      {/* -- Stat strip --------------------------------------------- */}
      <section
        aria-label="Website conversion statistics"
        className="px-5 sm:px-12 py-16"
        style={{ background: "var(--ax-surface-dark-alt)" }}
      >
        <div className="max-w-[var(--ax-container)] mx-auto">
          <dl className="flex items-stretch gap-6 flex-col sm:flex-row">
            {stats.map(({ val, lbl }, i) => (
              <div key={lbl} className="flex flex-1 items-stretch">
                <div className="flex-1 text-center py-8 px-6">
                  <dt
                    className="text-white"
                    style={{
                      fontFamily: "var(--ax-font-display)",
                      fontWeight: 800,
                      fontSize: "clamp(40px, 4vw, 56px)",
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {val}
                  </dt>
                  <dd className="text-[14px] text-[var(--ax-fg-on-dark-2)] mt-2">
                    {lbl}
                  </dd>
                </div>
                {i < stats.length - 1 && (
                  <div
                    className="hidden sm:block w-px self-stretch bg-white/10"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* -- The problem (Before / After) --------------------------- */}
      <Reveal>
        <section className="px-5 sm:px-12 py-20" aria-labelledby="chat-problem-heading">
          <div className="max-w-[var(--ax-container)] mx-auto">
            <div className="max-w-[620px] mb-12">
              <Eyebrow className="mb-3.5">What&apos;s happening on your website right now</Eyebrow>
              <h2
                id="chat-problem-heading"
                className="text-[var(--ax-fg-1)]"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                Your visitors have questions. Your website has a contact form.
              </h2>
            </div>
            <BeforeAfterCards />
          </div>
        </section>
      </Reveal>

      {/* -- What we build ------------------------------------------ */}
      <Reveal>
        <section
          className="px-5 sm:px-12 py-20"
          style={{ background: "var(--ax-surface-dark)" }}
          aria-labelledby="chat-build-heading"
        >
          <div className="max-w-[var(--ax-container)] mx-auto">
            <Eyebrow className="mb-6" tone="muted">What we build</Eyebrow>
            <div id="chat-build-heading" className="sr-only">What we build</div>
            <ChatFeatureReveal />
          </div>
        </section>
      </Reveal>

      {/* -- Chat flow timeline ------------------------------------- */}
      <Reveal>
        <section
          className="px-5 sm:px-12 py-20"
          style={{ background: "var(--ax-surface-dark)" }}
          aria-label="Chat agent flow timeline"
        >
          <div className="max-w-[var(--ax-container)] mx-auto">
            <div className="text-center mb-14 max-w-[640px] mx-auto">
              <Eyebrow className="mb-3.5" tone="muted">Chat agent flow</Eyebrow>
              <h2
                className="text-[var(--ax-fg-on-dark)]"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                Every conversation follows the same path
              </h2>
            </div>
            <ChatFlowTimeline />
            <p className="mt-10 text-center text-[13px] leading-[1.5] text-[var(--ax-fg-on-dark-2)] max-w-[480px] mx-auto">
              The pink path runs on its own, every conversation. The amber gate is
              where you stay in control.
            </p>
          </div>
        </section>
      </Reveal>

      {/* -- How it works (horizontal scroll) ----------------------- */}
      <section
        className="px-5 sm:px-12 py-20"
        style={{ background: "var(--ax-surface-dark)" }}
        aria-labelledby="chat-process-heading"
      >
        <div className="max-w-[var(--ax-container)] mx-auto">
          <div className="text-center mb-14 max-w-[640px] mx-auto">
            <Eyebrow className="mb-3.5" tone="muted">
              From setup to first booking
            </Eyebrow>
            <h2
              id="chat-process-heading"
              className="text-[var(--ax-fg-on-dark)]"
              style={{
                fontFamily: "var(--ax-font-display)",
                fontWeight: 700,
                fontSize: "var(--ax-fs-h2)",
                lineHeight: "var(--ax-lh-snug)",
                letterSpacing: "var(--ax-tracking-tight)",
              }}
            >
              From setup to first booking
            </h2>
          </div>
          <HorizontalScrollSteps />
        </div>
      </section>

      {/* -- What's included (terminal) ----------------------------- */}
      <Reveal>
        <section
          className="px-5 sm:px-12 py-20"
          style={{ background: "var(--ax-surface-dark)" }}
          aria-labelledby="chat-included-heading"
        >
          <div className="max-w-[var(--ax-container)] mx-auto">
            <div className="text-center mb-10">
              <Eyebrow className="mb-3.5" tone="muted">What&apos;s included</Eyebrow>
              <h2
                id="chat-included-heading"
                className="text-[var(--ax-fg-on-dark)]"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                Everything in the package
              </h2>
            </div>
            <TerminalWindow />
          </div>
        </section>
      </Reveal>

      {/* -- Who it's for ------------------------------------------- */}
      <Reveal>
        <section
          className="px-5 sm:px-12 py-20"
          style={{ background: "var(--ax-surface-dark)" }}
          aria-labelledby="chat-audience-heading"
        >
          <div className="max-w-[var(--ax-container)] mx-auto">
            <div className="max-w-[620px] mb-10">
              <Eyebrow className="mb-3.5" tone="muted">
                Built for businesses that pay for traffic and lose most of it
              </Eyebrow>
              <h2
                id="chat-audience-heading"
                className="text-[var(--ax-fg-on-dark)]"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                Who it works for
              </h2>
              <p className="text-[var(--ax-fs-body-lg)] leading-[1.7] text-[var(--ax-fg-on-dark-2)] mt-4">
                If you&apos;re running Google Ads or investing in SEO to bring
                people to your website, a chat agent is how you stop paying for
                visitors who leave without making contact.
              </p>
            </div>
            <IndustryTiles />
          </div>
        </section>
      </Reveal>

      {/* -- Pricing ------------------------------------------------ */}
      <Reveal>
        <section className="px-5 sm:px-12 py-20" aria-labelledby="chat-pricing-heading">
          <div className="max-w-[var(--ax-container)] mx-auto">
            <div className="text-center mb-10">
              <Eyebrow className="mb-3.5">What it costs</Eyebrow>
              <h2
                id="chat-pricing-heading"
                className="text-[var(--ax-fg-1)]"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                Simple, fixed pricing
              </h2>
            </div>
            <ChatPricingCard />
            <p className="mt-8 text-center text-[14px] leading-[1.6] text-[var(--ax-fg-3)] max-w-[480px] mx-auto">
              If your website traffic is too low for this to make a meaningful
              difference, we&apos;ll tell you during the audit. Sometimes the
              better move is getting more traffic first.
            </p>
          </div>
        </section>
      </Reveal>

      {/* -- FAQ ---------------------------------------------------- */}
      <Reveal>
        <section className="px-5 sm:px-12 py-20" aria-labelledby="chat-faq-heading">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center mb-14">
              <Eyebrow className="mb-3.5">Common questions</Eyebrow>
              <h2
                id="chat-faq-heading"
                className="text-[var(--ax-fg-1)]"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "var(--ax-fs-h2)",
                  lineHeight: "var(--ax-lh-snug)",
                  letterSpacing: "var(--ax-tracking-tight)",
                }}
              >
                Frequently asked questions
              </h2>
            </div>
            <FAQAccordion items={faqItems} defaultOpen={0} />
          </div>
        </section>
      </Reveal>

      {/* -- Final CTA ---------------------------------------------- */}
      <Reveal>
        <ServiceCTA
          headline="Find out how many visitors your website is losing."
          sub={"Book a 15-minute call. We\u2019ll look at your traffic and current conversion rate and show you what a chat agent would realistically recover. If the numbers don\u2019t justify it, we\u2019ll say so."}
          buttonLabel="Book an Audit"
        />
      </Reveal>
    </>
  )
}
