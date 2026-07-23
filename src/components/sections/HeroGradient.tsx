"use client"

import { useEffect, useRef } from "react"

// Lazy, luxurious follow: lower = more lag behind the cursor
const RESPONSE = 2.2
// Secondary blob moves slightly away from the cursor for parallax depth
const SECONDARY_FACTOR = -0.35

export function HeroGradient() {
  const pinkRef = useRef<HTMLDivElement>(null)
  const indigoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pink = pinkRef.current
    const indigo = indigoRef.current
    const parent = pink?.parentElement?.parentElement
    if (!pink || !indigo || !parent) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reducedMotion) return

    let raf = 0
    let running = false
    let lastTime = 0
    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now

      const alpha = 1 - Math.exp(-dt * RESPONSE)
      current.x += (target.x - current.x) * alpha
      current.y += (target.y - current.y) * alpha

      pink.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`
      indigo.style.transform =
        `translate3d(${current.x * SECONDARY_FACTOR}px, ${current.y * SECONDARY_FACTOR}px, 0)`

      // Stop when settled to avoid idle work
      if (Math.abs(target.x - current.x) < 0.1 && Math.abs(target.y - current.y) < 0.1) {
        current.x = target.x
        current.y = target.y
        running = false
        return
      }
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (running) return
      running = true
      lastTime = performance.now()
      raf = requestAnimationFrame(tick)
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect()
      target.x = e.clientX - rect.left - rect.width / 2
      target.y = e.clientY - rect.top - rect.height / 2
      start()
    }

    const onMouseLeave = () => {
      target.x = 0
      target.y = 0
      start()
    }

    parent.addEventListener("mousemove", onMouseMove, { passive: true })
    parent.addEventListener("mouseleave", onMouseLeave)

    return () => {
      cancelAnimationFrame(raf)
      parent.removeEventListener("mousemove", onMouseMove)
      parent.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
    >
      {/* Outer div: JS mouse-tracked transform. Inner div: autonomous CSS drift. */}
      <div ref={pinkRef} className="absolute left-1/2 top-[30%]">
        <div className="hero-blob hero-blob-pink" />
      </div>
      <div ref={indigoRef} className="absolute left-[30%] top-[55%]">
        <div className="hero-blob hero-blob-indigo" />
      </div>
    </div>
  )
}
