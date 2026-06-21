import { cn } from "@/lib/utils"

type Tone = "accent" | "muted"

const tones: Record<Tone, string> = {
  accent: "text-[var(--ax-primary)]",
  muted:  "text-[var(--ax-fg-3)]",
}

type Props = {
  tone?: Tone
  as?: "span" | "div"
  className?: string
  children: React.ReactNode
}

export function Eyebrow({ tone = "accent", as: As = "span", className, children }: Props) {
  return (
    <As
      className={cn(
        "block text-[11px] font-medium uppercase tracking-[0.1em]",
        tones[tone],
        className,
      )}
      style={{ fontFamily: "var(--ax-font-mono)" }}
    >
      {children}
    </As>
  )
}
