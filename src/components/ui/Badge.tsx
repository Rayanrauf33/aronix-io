import { cn } from "@/lib/utils"

type Variant = "pink" | "indigo" | "blue" | "green" | "neutral"

const variantClasses: Record<Variant, string> = {
  pink: "bg-[--ax-pale-pink] text-[--ax-primary-dark] border-[--ax-soft-blush]",
  indigo: "bg-[#EEF0F9] text-[#3B4A8F] border-[#C7CEEF]",
  blue: "bg-[#EFF8FD] text-[#1A5F7A] border-[#BDE0F0]",
  green: "bg-[#F0FDF4] text-[#14532D] border-[#BBF7D0]",
  neutral: "bg-[--ax-slate-100] text-[--ax-fg-2] border-[--ax-border]",
}

type Props = {
  variant?: Variant
  className?: string
  children: React.ReactNode
}

export function Badge({ variant = "neutral", className, children }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-[--ax-radius-pill]",
        "text-[12px] font-semibold border",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
