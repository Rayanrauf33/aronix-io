# Skill: Scaffold a new component

## Where it lives
| Type | Folder |
|---|---|
| Base primitive (button, input, badge) | src/components/ui/ |
| Site-wide structural piece | src/components/layout/ |
| Full page section | src/components/sections/ |
| Dashboard-only | src/components/dashboard/ |

## Rules
- Named export. Never default export from a component file.
- "use client" only if the component uses state, effects, refs, or event handlers.
- cn() from @/lib/utils for all conditional class logic.
- Props interface directly above the component, named <ComponentName>Props.
- No inline style attributes. Tailwind for layout/spacing. CSS variables for brand tokens.
- All colour values from --ax-* variables only.

## Server component template
```tsx
import { cn } from "@/lib/utils"

interface ExampleCardProps {
  title: string
  description?: string
  className?: string
}

export function ExampleCard({ title, description, className }: ExampleCardProps) {
  return (
    <div className={cn("rounded-lg border p-6", className)}
         style={{ background: "var(--ax-surface)", borderColor: "var(--ax-border)" }}>
      <h2 className="text-lg font-semibold" style={{ color: "var(--ax-fg-1)" }}>{title}</h2>
      {description && (
        <p className="mt-2 text-sm" style={{ color: "var(--ax-fg-2)" }}>{description}</p>
      )}
    </div>
  )
}
```

## Client component template
```tsx
"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface ToggleProps {
  label: string
  className?: string
}

export function Toggle({ label, className }: ToggleProps) {
  const [on, setOn] = useState(false)

  return (
    <button
      onClick={() => setOn((prev) => !prev)}
      className={cn("rounded px-4 py-2 text-sm font-medium transition-colors", className)}
      style={{
        background: on ? "var(--ax-primary)" : "var(--ax-slate-200)",
        color: on ? "var(--ax-fg-on-dark)" : "var(--ax-fg-2)"
      }}
    >
      {label}
    </button>
  )
}
```

## Checklist
- [ ] Named export
- [ ] Props interface above the component
- [ ] cn() for conditional classes
- [ ] "use client" only if genuinely needed
- [ ] No hardcoded hex colours
- [ ] No em dashes in comments
