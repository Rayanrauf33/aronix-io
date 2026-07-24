import Image from "next/image"
import Link from "next/link"

const socialLinks = [
  {
    label: "Facebook",
    href: "#", // TODO: add real Facebook URL once confirmed
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/aronix/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/aronix.io/",
    path: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z",
  },
  {
    label: "X",
    href: "#", // TODO: add real X/Twitter URL once confirmed
    path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  },
]

const columns = [
  {
    heading: "Services",
    links: [
      { label: "AI Voice Agents",      href: "/services/ai-voice-agents" },
      { label: "AI Chat & Booking",    href: "/services/ai-chat-booking" },
      { label: "Instant Lead Response", href: "/services/speed-to-lead" },
      { label: "Websites",             href: "/services/websites" },
      { label: "Workflow Automation",   href: "/services/workflow-automation" },
      { label: "CRM Integrations",     href: "/services/crm-integrations" },
      { label: "Local SEO",            href: "/services/local-seo" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About",        href: "/about" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Blog",         href: "/blog" },
      { label: "Contact",      href: "/contact" },
    ],
  },
  {
    heading: "Get Started",
    links: [
      { label: "Book an Audit", href: "https://calendly.com/rayanrauf33/muhammad-rayan-15-minute-session" },
      { label: "Services",      href: "/services" },
    ],
  },
]

export function Footer() {
  return (
    <footer
      className="px-5 sm:px-12 pt-16 pb-8 text-[var(--ax-fg-on-dark-2)]"
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
            <div className="flex items-center gap-3 mb-4">
              {socialLinks.map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--ax-fg-on-dark-2)] hover:text-white transition-colors duration-150 ease-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-[18px] h-[18px]"
                    aria-hidden="true"
                  >
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
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
            <Link href="/contact" className="hover:text-white transition-colors duration-150 ease-out">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
