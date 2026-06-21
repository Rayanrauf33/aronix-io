import { cn } from "@/lib/utils"

type Variant = "outline" | "soft"
type Size = "sm" | "md"

const variants: Record<Variant, string> = {
  outline: "bg-white border-[var(--ax-border)] text-[var(--ax-fg-2)]",
  soft:    "bg-[var(--ax-slate-200)] border-transparent text-[var(--ax-fg-2)]",
}

const sizes: Record<Size, string> = {
  sm: "h-7 px-2.5 text-[11px] tracking-[0.02em]",
  md: "h-9 px-4 text-[12px]",
}

type Props = {
  variant?: Variant
  size?: Size
  mono?: boolean
  className?: string
  children: React.ReactNode
}

export function Chip({ variant = "outline", size = "sm", mono = true, className, children }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full border font-medium whitespace-nowrap",
        mono && "font-mono",
        variants[variant],
        sizes[size],
        className,
      )}
      style={mono ? { fontFamily: "var(--ax-font-mono)" } : undefined}
    >
      {children}
    </span>
  )
}
