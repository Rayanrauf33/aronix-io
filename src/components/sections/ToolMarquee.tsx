"use client"

import { useRef, useEffect, useCallback } from "react"
import Image from "next/image"

type Tool = { name: string; icon: string }

type Props = {
  tools: Tool[]
  label?: string
  pauseOnHover?: boolean
}

const MAX_SCALE = 1.5
const RANGE = 180

function getScale(dist: number): number {
  if (dist >= RANGE) return 1
  return 1 + (MAX_SCALE - 1) * Math.cos((dist / RANGE) * Math.PI * 0.5)
}

export function ToolMarquee({ tools, label, pauseOnHover = true }: Props) {
  const items = [...tools, ...tools]
  const trackRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)
  const mouseXRef = useRef(0)
  const hoveringRef = useRef(false)

  const applyScales = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const children = track.children
    const mx = mouseXRef.current
    const active = hoveringRef.current

    for (let i = 0; i < children.length; i++) {
      const el = children[i] as HTMLElement
      let s = 1

      if (active) {
        const rect = el.getBoundingClientRect()
        const center = rect.left + rect.width / 2
        s = getScale(Math.abs(mx - center))
      }

      el.style.transform = s === 1 ? "" : `scale(${s})`
    }

    if (active && !pauseOnHover) {
      rafRef.current = requestAnimationFrame(applyScales)
    }
  }, [pauseOnHover])

  const onMove = useCallback((e: React.MouseEvent) => {
    mouseXRef.current = e.clientX
    if (pauseOnHover) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(applyScales)
    }
  }, [applyScales, pauseOnHover])

  const onEnter = useCallback((e: React.MouseEvent) => {
    hoveringRef.current = true
    mouseXRef.current = e.clientX
    if (pauseOnHover) {
      const track = trackRef.current
      if (track) track.style.animationPlayState = "paused"
    }
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(applyScales)
  }, [applyScales, pauseOnHover])

  const onLeave = useCallback(() => {
    hoveringRef.current = false
    if (pauseOnHover) {
      const track = trackRef.current
      if (track) track.style.animationPlayState = "running"
    }
    cancelAnimationFrame(rafRef.current)
    applyScales()
  }, [applyScales, pauseOnHover])

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className="marquee-section">
      {label && (
        <div
          className="text-[11px] uppercase text-[var(--ax-fg-3)] mb-5 text-center"
          style={{ fontFamily: "var(--ax-font-mono)", letterSpacing: "0.06em" }}
        >
          {label}
        </div>
      )}
      <div
        className="marquee"
        role="list"
        aria-label="Supported integrations"
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <div ref={trackRef} className="marquee-track">
          {items.map(({ name, icon }, i) => (
            <div
              key={`${name}-${i}`}
              role="listitem"
              className="marquee-item"
              title={name}
            >
              <Image src={icon} alt={name} width={40} height={40} className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
