import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { CaseStudy } from "@/types"

type Props = {
  caseStudy: CaseStudy
}

export function CaseStudyCard({ caseStudy }: Props) {
  const { slug, title, client, industry, summary, results } = caseStudy
  return (
    <Link
      href={`/case-studies/${slug}`}
      className="glass-card block rounded-[16px] p-7 sm:p-8 no-underline"
      aria-label={`Read case study: ${title}`}
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="glass-chip">{industry}</span>
        <span className="text-[13px] text-[var(--ax-fg-3)]">{client}</span>
      </div>

      <h3
        className="text-[var(--ax-fg-1)] mb-3"
        style={{
          fontFamily: "var(--ax-font-display)",
          fontWeight: 700,
          fontSize: "clamp(20px, 2vw, 24px)",
          lineHeight: 1.25,
          letterSpacing: "-0.015em",
        }}
      >
        {title}
      </h3>

      <p className="text-[15px] leading-[1.6] text-[var(--ax-fg-2)] mb-6">
        {summary}
      </p>

      <dl className="flex flex-wrap gap-x-8 gap-y-3 mb-6 m-0">
        {results.map(({ value, label }) => (
          <div key={label}>
            <dt
              className="text-[22px] text-[var(--ax-fg-1)]"
              style={{ fontFamily: "var(--ax-font-display)", fontWeight: 800 }}
            >
              {value}
            </dt>
            <dd className="m-0 text-[12px] text-[var(--ax-fg-3)]">{label}</dd>
          </div>
        ))}
      </dl>

      <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--ax-primary)]">
        Read case study
        <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
      </span>
    </Link>
  )
}
