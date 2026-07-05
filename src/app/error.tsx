"use client"

import Link from "next/link"
import { Header } from "@/components/layout/Header"

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
        <section className="px-5 sm:px-12 pt-[144px] pb-24 text-center">
          <div className="max-w-[560px] mx-auto">
            <span
              className="block text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--ax-primary)] mb-4"
              style={{ fontFamily: "var(--ax-font-mono)" }}
            >
              Error
            </span>
            <h1
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
              <button
                onClick={() => reset()}
                className="inline-flex items-center justify-center font-semibold border whitespace-nowrap transition-all duration-150 ease-out focus-visible:outline-2 focus-visible:outline-[var(--ax-primary)] focus-visible:outline-offset-2 rounded-[12px] bg-[var(--ax-pink-700)] text-white border-transparent hover:bg-[var(--ax-pink-800)] hover:shadow-[var(--ax-shadow-pink)] h-11 px-6 text-[15px]"
              >
                Try again
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center font-semibold border whitespace-nowrap transition-all duration-150 ease-out focus-visible:outline-2 focus-visible:outline-[var(--ax-primary)] focus-visible:outline-offset-2 rounded-[12px] bg-transparent text-[var(--ax-fg-1)] border-[var(--ax-fg-1)] hover:bg-[var(--ax-fg-1)] hover:text-white h-11 px-6 text-[15px]"
              >
                Go home
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
