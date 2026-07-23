"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Workflow, Server, Zap, Code } from "lucide-react"
import type { LucideIcon } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Tool data                                                           */
/* ------------------------------------------------------------------ */

type Tool = {
  name: string
  desc: string
  icon: LucideIcon
}

const tools: Tool[] = [
  { name: "Make", desc: "Complex multi-step workflows with visual logic", icon: Workflow },
  { name: "n8n", desc: "Self-hosted automation for data-sensitive environments", icon: Server },
  { name: "Zapier", desc: "Quick integrations between common SaaS tools", icon: Zap },
  { name: "Direct API", desc: "Custom integrations when off-the-shelf won't cut it", icon: Code },
]

/* ------------------------------------------------------------------ */
/*  CSS hover style (replaces conflicting Framer Motion whileHover)     */
/* ------------------------------------------------------------------ */

const toolCardHoverStyle = `
.ax-tool-card {
  transition: border-color 200ms, transform 200ms;
}
.ax-tool-card:hover {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--ax-primary) 30%, transparent);
}
`

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function ToolGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const reduce = useReducedMotion()
  const show = inView || !!reduce

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
      <style dangerouslySetInnerHTML={{ __html: toolCardHoverStyle }} />
      {tools.map((tool, i) => {
        const Icon = tool.icon
        return (
          <motion.div
            key={tool.name}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
          >
            <div
              className="ax-tool-card rounded-[var(--ax-radius-lg)] border border-white/10 p-6 cursor-default h-full"
              style={{ background: "var(--ax-surface-dark-alt)" }}
            >
              <div
                className="w-10 h-10 rounded-[var(--ax-radius-sm)] flex items-center justify-center mb-4"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <Icon size={20} className="text-[var(--ax-fg-on-dark-2)]" aria-hidden="true" />
              </div>
              <h3
                className="text-[22px] text-white mb-2"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                }}
              >
                {tool.name}
              </h3>
              <p
                className="text-[14px] leading-[1.6] m-0"
                style={{ color: "var(--ax-fg-on-dark-2)" }}
              >
                {tool.desc}
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
