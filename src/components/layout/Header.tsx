"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, LayoutDashboard, Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Home",     href: "/" },
  { label: "Services", href: "/services" },
  { label: "Blog",     href: "/blog" },
  { label: "Contact",  href: "/contact" },
]

const serviceLinks = [
  { label: "AI Voice Agents",      href: "/services/ai-voice-agents" },
  { label: "AI Chat & Booking",    href: "/services/ai-chat-booking" },
  { label: "Instant Lead Response", href: "/services/speed-to-lead" },
  { label: "Websites",             href: "/services/websites" },
  { label: "Workflow Automation",   href: "/services/workflow-automation" },
  { label: "CRM Integrations",     href: "/services/crm-integrations" },
  { label: "Local SEO",            href: "/services/local-seo" },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const [mobileServices, setMobileServices] = useState(false)
  const pathname = usePathname()
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => { setMounted(true) }, [])

  function openDropdown() {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setDropdown(true)
  }

  function closeDropdown() {
    dropdownTimeout.current = setTimeout(() => setDropdown(false), 150)
  }

  const isServicesActive = mounted && pathname.startsWith("/services")

  return (
    <header
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-24px)] max-w-[1200px] rounded-2xl overflow-visible glass-navbar",
        open && "glass-navbar-open",
      )}
      role="banner"
    >
      <div className="px-5 sm:px-8 h-16 flex items-center justify-between gap-8">

        <Link href="/" aria-label="Aronix home" className="flex items-center shrink-0">
          <Image src="/aronix-logo.png" alt="Aronix" width={100} height={28} className="h-7 w-auto" priority />
        </Link>

        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-2">
          {navLinks.map(({ label, href }) => {
            if (label === "Services") {
              return (
                <div
                  key={href}
                  className="relative"
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}
                  onFocus={openDropdown}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      setDropdown(false)
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setDropdown(false)
                  }}
                >
                  <Link
                    href={href}
                    aria-haspopup="true"
                    aria-expanded={dropdown}
                    className={cn(
                      "px-3.5 py-2 text-[15px] rounded-[8px] transition-colors duration-150 ease-out inline-flex items-center gap-1",
                      isServicesActive
                        ? "text-[var(--ax-fg-1)] font-semibold"
                        : "text-[var(--ax-fg-2)] font-medium hover:text-[var(--ax-fg-1)] hover:bg-[var(--ax-slate-200)]",
                    )}
                  >
                    {label}
                    <ChevronDown
                      size={14}
                      strokeWidth={2}
                      className={cn(
                        "transition-transform duration-150",
                        dropdown && "rotate-180",
                      )}
                      aria-hidden="true"
                    />
                  </Link>

                  {dropdown && (
                    <div
                      className="absolute top-full left-0 mt-2 w-[240px] rounded-[12px] border border-[var(--ax-border)] py-2 shadow-lg"
                      style={{
                        background: "rgba(255, 255, 255, 0.92)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                      }}
                      role="navigation"
                      aria-label="Services submenu"
                    >
                      {serviceLinks.map(({ label: sLabel, href: sHref }) => {
                        const active = mounted && pathname === sHref
                        return (
                          <Link
                            key={sHref}
                            href={sHref}
                            className={cn(
                              "block px-4 py-2.5 text-[14px] transition-colors duration-100",
                              active
                                ? "text-[var(--ax-fg-1)] font-semibold bg-[var(--ax-slate-100)]"
                                : "text-[var(--ax-fg-2)] font-medium hover:text-[var(--ax-fg-1)] hover:bg-[var(--ax-slate-100)]",
                            )}
                          >
                            {sLabel}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            }

            const active = mounted && pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "px-3.5 py-2 text-[15px] rounded-[8px] transition-colors duration-150 ease-out",
                  active
                    ? "text-[var(--ax-fg-1)] font-semibold"
                    : "text-[var(--ax-fg-2)] font-medium hover:text-[var(--ax-fg-1)] hover:bg-[var(--ax-slate-200)]",
                )}
              >
                {label}
              </Link>
            )
          })}
          <Link
            href="/search"
            className="ml-1 p-2 rounded-[8px] text-[var(--ax-fg-2)] hover:text-[var(--ax-fg-1)] hover:bg-[var(--ax-slate-200)] transition-colors"
            title="Search"
            aria-label="Search"
          >
            <Search size={18} />
          </Link>
          <Link
            href="/dashboard"
            className="p-2 rounded-[8px] text-[var(--ax-fg-2)] hover:text-[var(--ax-fg-1)] hover:bg-[var(--ax-slate-200)] transition-colors"
            title="Dashboard"
            aria-label="Dashboard"
          >
            <LayoutDashboard size={18} />
          </Link>
          <div className="ml-1">
            <Button
              href="https://calendly.com/rayanrauf33/muhammad-rayan-15-minute-session"
              variant="primary"
              size="sm"
            >
              Book an Audit
            </Button>
          </div>
        </nav>

        <button
          type="button"
          className="md:hidden p-2 rounded-[8px] text-[var(--ax-fg-2)] hover:bg-[var(--ax-slate-200)] hover:text-[var(--ax-fg-1)] transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} strokeWidth={1.75} aria-hidden="true" /> : <Menu size={22} strokeWidth={1.75} aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="md:hidden border-t border-white/30 px-5 py-4">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {navLinks.map(({ label, href }) => {
              if (label === "Services") {
                return (
                  <div key={href}>
                    <button
                      type="button"
                      onClick={() => setMobileServices((s) => !s)}
                      className="w-full px-3.5 py-3 text-[15px] font-medium text-[var(--ax-fg-1)] rounded-[8px] hover:bg-[var(--ax-slate-200)] flex items-center justify-between"
                      aria-expanded={mobileServices}
                      aria-controls="mobile-services-submenu"
                    >
                      {label}
                      <ChevronDown
                        size={16}
                        strokeWidth={2}
                        className={cn(
                          "transition-transform duration-150",
                          mobileServices && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    </button>
                    {mobileServices && (
                      <div id="mobile-services-submenu" className="flex flex-col gap-0.5 pl-3 pb-1">
                        <Link
                          href="/services"
                          onClick={() => setOpen(false)}
                          className="px-3.5 py-2.5 text-[14px] font-medium text-[var(--ax-fg-2)] rounded-[8px] hover:bg-[var(--ax-slate-200)]"
                        >
                          All Services
                        </Link>
                        {serviceLinks.map(({ label: sLabel, href: sHref }) => (
                          <Link
                            key={sHref}
                            href={sHref}
                            onClick={() => setOpen(false)}
                            className="px-3.5 py-2.5 text-[14px] font-medium text-[var(--ax-fg-2)] rounded-[8px] hover:bg-[var(--ax-slate-200)]"
                          >
                            {sLabel}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="px-3.5 py-3 text-[15px] font-medium text-[var(--ax-fg-1)] rounded-[8px] hover:bg-[var(--ax-slate-200)]"
                >
                  {label}
                </Link>
              )
            })}
            <Link
              href="/search"
              onClick={() => setOpen(false)}
              className="px-3.5 py-3 text-[15px] font-medium text-[var(--ax-fg-1)] rounded-[8px] hover:bg-[var(--ax-slate-200)] flex items-center gap-2"
            >
              <Search size={18} />
              Search
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="px-3.5 py-3 text-[15px] font-medium text-[var(--ax-fg-1)] rounded-[8px] hover:bg-[var(--ax-slate-200)] flex items-center gap-2"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
            <Button
              href="https://calendly.com/rayanrauf33/muhammad-rayan-15-minute-session"
              variant="primary"
              size="md"
              className="mt-2 w-full"
            >
              Book an Audit
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
