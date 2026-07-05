import Link from "next/link"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/Button"
import { Eyebrow } from "@/components/ui/Eyebrow"

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section
          className="px-5 sm:px-12 pt-[144px] pb-24 text-center"
          style={{ background: "var(--ax-soft-blush)" }}
        >
          <div className="max-w-[560px] mx-auto">
            <Eyebrow className="mb-4">404</Eyebrow>
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
              Page not found
            </h1>
            <p className="text-[16px] leading-[1.65] text-[var(--ax-fg-2)] mb-10">
              The page you are looking for does not exist or has been moved.
              Here are some helpful links instead.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href="/" variant="primary" size="md">
                Home
              </Button>
              <Button href="/services" variant="outline" size="md">
                Services
              </Button>
              <Button href="/blog" variant="outline" size="md">
                Blog
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
