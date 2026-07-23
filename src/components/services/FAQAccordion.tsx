"use client"

import { useState, useId } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export type FAQItem = {
  question: string
  answer: React.ReactNode
}

type Props = {
  items: FAQItem[]
  defaultOpen?: number
  className?: string
}

export function FAQAccordion({ items, defaultOpen = 0, className }: Props) {
  const [open, setOpen] = useState<number>(defaultOpen)
  const id = useId()

  const toggle = (i: number) => setOpen((cur) => (cur === i ? -1 : i))

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    let next = -1
    if (e.key === "ArrowDown") next = (i + 1) % items.length
    else if (e.key === "ArrowUp") next = (i - 1 + items.length) % items.length
    else if (e.key === "Home") next = 0
    else if (e.key === "End") next = items.length - 1
    else return

    e.preventDefault()
    const el = document.getElementById(`${id}-trigger-${next}`)
    el?.focus()
  }

  return (
    <div
      className={cn("border-t border-[var(--ax-border)]", className)}
      role="region"
      aria-label="Frequently asked questions"
    >
      {items.map((item, i) => {
        const expanded = open === i
        const triggerId = `${id}-trigger-${i}`
        const panelId = `${id}-panel-${i}`

        return (
          <div key={i} className="border-b border-[var(--ax-border)]">
            <h3 className="m-0">
              <button
                type="button"
                id={triggerId}
                onClick={() => toggle(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                aria-expanded={expanded}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 min-h-[56px] py-4 px-1 bg-transparent text-left text-[18px] font-semibold text-[var(--ax-fg-1)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--ax-primary)] focus-visible:outline-offset-2 rounded-[4px]"
                style={{ fontFamily: "var(--ax-font-display)" }}
              >
                <span>{item.question}</span>
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
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!expanded}
              className="grid transition-[grid-template-rows] duration-200 ease-out"
              style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="px-1 pb-6 text-[16px] leading-[1.6] text-[var(--ax-fg-2)]">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
