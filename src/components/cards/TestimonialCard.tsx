import { cn } from "@/lib/utils"

type Props = {
  quote: string
  author: string
  role: string
  company: string
  initials: string
  accentColor?: string
  className?: string
}

export function TestimonialCard({
  quote,
  author,
  role,
  company,
  initials,
  accentColor = "var(--ax-primary)",
  className,
}: Props) {
  return (
    <figure
      className={cn(
        "flex flex-col gap-6 p-6 rounded-[--ax-radius-lg]",
        "glass-card",
        className,
      )}
    >
      {/* Quote mark */}
      <span
        className="text-[40px] leading-none font-serif select-none"
        style={{ color: accentColor }}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <blockquote>
        <p className="s-body text-[--ax-fg-1] leading-relaxed">{quote}</p>
      </blockquote>

      <figcaption className="flex items-center gap-3 mt-auto">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold text-white shrink-0"
          style={{ background: accentColor }}
          aria-hidden="true"
        >
          {initials}
        </div>
        <div>
          <p className="text-[14px] font-semibold text-[--ax-fg-1] leading-tight">{author}</p>
          <p className="text-[13px] text-[--ax-fg-3] leading-tight mt-0.5">
            {role}, {company}
          </p>
        </div>
      </figcaption>
    </figure>
  )
}
