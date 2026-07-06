"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { analytics, trackEvent } from "@/lib/analytics"

function getCtaLabel(el: HTMLElement): string | null {
  const text = el.textContent?.trim()
  if (!text) return null
  return text.length > 60 ? text.slice(0, 57) + "..." : text
}

export function AnalyticsEvents() {
  const pathname = usePathname()
  const depthsRef = useRef(new Set<number>())

  // Track CTA clicks and external link clicks via delegation
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement
      const link = target.closest("a[href]") as HTMLAnchorElement | null
      const button = target.closest("button") as HTMLButtonElement | null

      if (link) {
        const href = link.getAttribute("href") ?? ""

        // Book a Call / Calendly clicks
        if (href.includes("calendly.com")) {
          analytics.bookAuditClick(pathname)
          return
        }

        // External link clicks
        if (href.startsWith("http") && !href.includes("aronix.io")) {
          analytics.externalLinkClick(href, getCtaLabel(link) ?? href)
          return
        }
      }

      // Button CTA clicks (non-link buttons with meaningful text)
      if (button && !link) {
        const label = getCtaLabel(button)
        if (label && button.type !== "button") {
          analytics.ctaClick(label, pathname)
        }
      }
    }

    document.addEventListener("click", handleClick, { capture: true })
    return () => document.removeEventListener("click", handleClick, { capture: true })
  }, [pathname])

  // Track scroll depth milestones
  useEffect(() => {
    depthsRef.current = new Set<number>()

    function handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return
      const pct = Math.round((window.scrollY / scrollHeight) * 100)

      for (const milestone of [25, 50, 75, 90]) {
        if (pct >= milestone && !depthsRef.current.has(milestone)) {
          depthsRef.current.add(milestone)
          trackEvent("scroll_depth", { depth: milestone, page: pathname })
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  return null
}
