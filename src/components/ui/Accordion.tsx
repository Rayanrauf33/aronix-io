"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export type AccordionItem = {
  label: string
  content: React.ReactNode
}

type Props = {
  items: AccordionItem[]
  defaultOpen?: number
  className?: string
}

export function Accordion({ items, defaultOpen = -1, className }: Props) {
  const [open, setOpen] = useState<number>(defaultOpen)
  const toggle = (i: number) => setOpen((cur) => (cur === i ? -1 : i))

  return (
    <div
      className={cn(
        "border-t border-[var(--ax-border)]",
        className,
      )}
    >
      {items.map((it, i) => {
        const expanded = open === i
        return (
          <div key={i} className="border-b border-[var(--ax-border)]">
            <h3 className="m-0">
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={expanded}
              aria-controls={`accordion-panel-${i}`}
              id={`accordion-trigger-${i}`}
              className="flex w-full items-center justify-between gap-4 min-h-[56px] py-4 px-1 bg-transparent text-left text-[18px] font-semibold text-[var(--ax-fg-1)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--ax-primary)] focus-visible:outline-offset-2 rounded-[4px]"
              style={{ fontFamily: "var(--ax-font-display)" }}
            >
              <span>{it.label}</span>
              <ChevronDown
                size={20}
                strokeWidth={1.75}
                aria-hidden="true"
                className="shrink-0 transition-transform duration-200 ease-out text-[var(--ax-fg-3)]"
                style={{ transform: expanded ? "rotate(180deg)" : "none" }}
              />
            </button>
            </h3>
            <div
              id={`accordion-panel-${i}`}
              role="region"
              aria-labelledby={`accordion-trigger-${i}`}
              aria-hidden={!expanded}
              className="grid transition-[grid-template-rows] duration-200 ease-out"
              style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="px-1 pb-6 text-[16px] leading-[1.6] text-[var(--ax-fg-2)]">
                  {it.content}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
