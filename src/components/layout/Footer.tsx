import Image from "next/image"
import Link from "next/link"

const columns = [
  {
    heading: "Services",
    links: [
      { label: "CRM Integration", href: "/services#crm" },
      { label: "Finance Ops",     href: "/services#finance" },
      { label: "Internal Ops",    href: "/services#ops" },
      { label: "Marketing Ops",   href: "/services#marketing" },
      { label: "Custom Builds",   href: "/services#custom" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About",        href: "/about" },
      { label: "Case Studies", href: "/case-study" },
      { label: "Process",      href: "/services#process" },
      { label: "Blog",         href: "/blog" },
      { label: "Careers",      href: "/careers" },
    ],
  },
  {
    heading: "Get Started",
    links: [
      { label: "Book an Audit", href: "https://calendly.com/rayanrauf33/muhammad-rayan-15-minute-session" },
      { label: "Pricing",       href: "/pricing" },
      { label: "FAQ",           href: "/faq" },
      { label: "Contact Us",    href: "/contact" },
    ],
  },
]

export function Footer() {
  return (
    <footer
      className="px-12 pt-16 pb-8 text-[var(--ax-fg-on-dark-2)]"
      style={{ background: "var(--ax-surface-dark)" }}
      role="contentinfo"
    >
      <div className="max-w-[1280px] mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">

          {/* Brand */}
          <div>
            <Link href="/" aria-label="Aronix home" className="inline-flex">
              <Image src="/aronix-logo-white.png" alt="Aronix" width={100} height={26} className="h-[26px] w-auto" />
            </Link>
            <p className="my-4 text-[14px] leading-[1.7] max-w-[280px] text-[var(--ax-fg-on-dark-2)]">
              AI-powered business process automation. We remove the manual work so your
              team can focus on what matters.
            </p>
            <div
              className="inline-flex items-center gap-2 text-[11px] uppercase"
              style={{
                fontFamily: "var(--ax-font-mono)",
                letterSpacing: "0.08em",
                color: "var(--ax-success)",
              }}
            >
              <span className="pulse-dot" aria-hidden="true" />
              All systems operational
            </div>
          </div>

          {/* Nav columns */}
          {columns.map(({ heading, links }) => (
            <nav key={heading} aria-label={`${heading} links`}>
              <h4 className="text-white text-[14px] font-semibold mb-4 m-0" style={{ fontFamily: "var(--ax-font-body)" }}>
                {heading}
              </h4>
              <ul className="flex flex-col gap-2.5 list-none p-0 m-0" role="list">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-[14px] text-[var(--ax-fg-on-dark-2)] hover:text-white transition-colors duration-150 ease-out"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="h-px mb-6 bg-[var(--ax-slate-800)]" />

        <div className="flex flex-wrap items-center justify-between gap-2 text-[13px] text-[var(--ax-slate-600)]">
          <span>&copy; {new Date().getFullYear()} Aronix. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors duration-150 ease-out">Privacy Policy</Link>
            <Link href="/terms"   className="hover:text-white transition-colors duration-150 ease-out">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
