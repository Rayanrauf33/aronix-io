"use client"

import { useEffect, useRef } from "react"

// Response rate for exponential smoothing: higher = snappier settle.
// Time-based so the feel is identical at 60Hz and 120Hz.
// Phones track the finger much more tightly: the lazy desktop glide
// reads as lag under direct touch.
const RESPONSE = 9
const RESPONSE_MOBILE = 15

export function useScrollProgress(
  onProgress: (progress: number) => void,
): React.RefObject<HTMLDivElement> {
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)
  const activeRef = useRef(false)
  const currentRef = useRef(0)
  const lastTimeRef = useRef(0)
  const snapRef = useRef(true)
  const lastSentRef = useRef(-1)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reducedMotion) {
      onProgress(1)
      return
    }

    const response = window.innerWidth < 640 ? RESPONSE_MOBILE : RESPONSE

    // Scroll span is cached, not read per frame: window.innerHeight
    // changes continuously on mobile as the browser toolbar collapses,
    // which warps progress mid-scroll (jitter). Width-only resize checks
    // ignore that toolbar noise, same trick as the scatter icons.
    let totalScroll = 0
    let lastWidth = 0
    const measure = () => {
      totalScroll = el.offsetHeight - window.innerHeight
      lastWidth = window.innerWidth
    }
    measure()
    const onResize = () => {
      if (window.innerWidth !== lastWidth) measure()
    }
    window.addEventListener("resize", onResize)

    const tick = (now: number) => {
      if (!activeRef.current) return
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05)
      lastTimeRef.current = now

      const rect = el.getBoundingClientRect()
      const target = totalScroll > 0
        ? Math.max(0, Math.min(1, -rect.top / totalScroll))
        : 0

      // Snap on (re)activation: prevents a visible replay when the page
      // loads mid-runway or the user scrolls back into the section fast
      let current = currentRef.current
      if (snapRef.current) {
        current = target
        snapRef.current = false
      } else {
        // Frame-rate independent inertia: glide towards the target
        const alpha = 1 - Math.exp(-dt * response)
        current += (target - current) * alpha
        if (Math.abs(target - current) < 0.0004) current = target
      }
      currentRef.current = current

      // Skip style writes once settled: no scroll input means no work
      if (current !== lastSentRef.current) {
        lastSentRef.current = current
        onProgress(current)
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          activeRef.current = true
          snapRef.current = true
          lastTimeRef.current = performance.now()
          rafRef.current = requestAnimationFrame(tick)
        } else {
          activeRef.current = false
          cancelAnimationFrame(rafRef.current)
        }
      },
      { threshold: 0 },
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", onResize)
      activeRef.current = false
      cancelAnimationFrame(rafRef.current)
    }
  }, [onProgress])

  return containerRef
}
