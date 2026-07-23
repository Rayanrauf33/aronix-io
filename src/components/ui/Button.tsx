import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react"

type Variant = "primary" | "outline" | "ghost" | "dark"
type Size = "sm" | "md" | "lg"

const variantClasses: Record<Variant, string> = {
  primary: "bg-[var(--ax-pink-700)] text-white border-transparent hover:bg-[var(--ax-pink-800)] hover:shadow-[var(--ax-shadow-pink)]",
  outline: "bg-transparent text-[var(--ax-fg-1)] border-[var(--ax-fg-1)] hover:bg-[var(--ax-fg-1)] hover:text-white",
  ghost:   "bg-transparent text-[var(--ax-primary-dark)] border-transparent hover:bg-[var(--ax-pink-50)]",
  dark:    "bg-white text-[var(--ax-fg-1)] border-transparent hover:bg-[var(--ax-soft-blush)]",
}

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px] gap-2",
  md: "h-11 px-6 text-[15px] gap-2",
  lg: "h-13 px-8 text-[16px] gap-2",
}

type BaseProps = {
  variant?: Variant
  size?: Size
  trailingArrow?: boolean
  className?: string
  children: React.ReactNode
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never }
type LinkProps   = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
type Props = ButtonProps | LinkProps

export function Button({
  variant = "primary",
  size = "md",
  trailingArrow = false,
  className,
  children,
  ...rest
}: Props) {
  const classes = cn(
    "inline-flex items-center justify-center font-semibold border whitespace-nowrap",
    "transition-all duration-150 ease-out",
    "focus-visible:outline-2 focus-visible:outline-[var(--ax-primary)] focus-visible:outline-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none",
    "rounded-[12px]",
    variantClasses[variant],
    sizeClasses[size],
    className,
  )

  const content = (
    <>
      {children}
      {trailingArrow && <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />}
    </>
  )

  if ("href" in rest && rest.href) {
    const { href, ...linkRest } = rest as LinkProps
    return <Link href={href} className={classes} {...(linkRest as object)}>{content}</Link>
  }
  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  )
}
