"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/Button"

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <>
      <Header />
      <main>
        <section
          className="px-5 sm:px-12 pt-[144px] pb-24 text-center"
          aria-labelledby="error-heading"
        >
          <div className="max-w-[560px] mx-auto">
            <span
              className="block text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--ax-primary-dark)] mb-4"
              style={{ fontFamily: "var(--ax-font-mono)" }}
            >
              Error
            </span>
            <h1
              id="error-heading"
              className="text-[var(--ax-fg-1)] mb-4"
              style={{
                fontFamily: "var(--ax-font-display)",
                fontWeight: 800,
                fontSize: "clamp(36px, 4vw, 52px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Something went wrong
            </h1>
            <p className="text-[16px] leading-[1.65] text-[var(--ax-fg-2)] mb-10">
              We hit an unexpected error loading this page. You can try again
              or head back to the home page.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="primary" size="md" onClick={() => reset()}>
                Try again
              </Button>
              <Button href="/" variant="outline" size="md">
                Go home
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
