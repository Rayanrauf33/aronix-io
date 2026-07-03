"use client"

import { useEffect, useRef } from "react"

type Props = {
  children: React.ReactNode
}

export function Reveal({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("reveal-visible")
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-visible")
          observer.disconnect()
          // Once the entrance finishes, strip the transition and transform
          // so the block becomes a plain static element again (no lingering
          // transition bookkeeping, no stacking context from the transform)
          el.addEventListener(
            "transitionend",
            () => el.classList.add("reveal-done"),
            { once: true },
          )
        }
      },
      // Fire as soon as the block crosses 80px into the viewport, so even
      // very tall sections reveal without a dead gap
      { threshold: 0, rootMargin: "0px 0px -80px 0px" },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="reveal">
      {children}
    </div>
  )
}
