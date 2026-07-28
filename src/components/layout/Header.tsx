"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu,
  X,
  LayoutDashboard,
  Search,
  ChevronDown,
  Phone,
  MessageCircle,
  Zap,
  Network,
  ArrowRightLeft,
  Globe,
  MapPin,
  ArrowRight,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { cn } from "@/lib/utils"

const CALENDLY_URL = "https://calendly.com/rayanrauf33/muhammad-rayan-15-minute-session"

const navLinks = [
  { label: "Home",     href: "/" },
  { label: "Services", href: "/services" },
  { label: "Blog",     href: "/blog" },
  { label: "Contact",  href: "/contact" },
]

type ServiceEntry = {
  label: string
  href: string
  icon: LucideIcon
  description: string
}

type Pillar = {
  label: string
  services: ServiceEntry[]
}

const servicePillars: Pillar[] = [
  {
    label: "Lead Capture & Response",
    services: [
      {
        label: "AI Voice Agents",
        href: "/services/ai-voice-agents",
        icon: Phone,
        description: "Answered in two rings, every call.",
      },
      {
        label: "AI Chat & Booking",
        href: "/services/ai-chat-booking",
        icon: MessageCircle,
        description: "Books appointments without human input.",
      },
      {
        label: "Instant Lead Response",
        href: "/services/instant-lead-response",
        icon: Zap,
        description: "Every new lead replied within 60 seconds.",
      },
    ],
  },
  {
    label: "Workflow & Systems",
    services: [
      {
        label: "Workflow Automation",
        href: "/services/workflow-automation",
        icon: Network,
        description: "Recurring tasks running without your team.",
      },
      {
        label: "CRM Integrations",
        href: "/services/crm-integrations",
        icon: ArrowRightLeft,
        description: "Your tools connected, data flows automatically.",
      },
    ],
  },
  {
    label: "Websites & Growth",
    services: [
      {
        label: "Websites",
        href: "/services/websites",
        icon: Globe,
        description: "Built to turn visitors into enquiries.",
      },
      {
        label: "Local SEO",
        href: "/services/local-seo",
        icon: MapPin,
        description: "Top three on Google local search.",
      },
    ],
  },
]

const allServiceLinks: ServiceEntry[] = servicePillars.flatMap((p) => p.services)

export function Header() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const [mobileServices, setMobileServices] = useState(false)
  const pathname = usePathname()
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const servicesTriggerRef = useRef<HTMLDivElement>(null)
  const megaMenuRef = useRef<HTMLDivElement>(null)

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
    <>
    <header
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-24px)] max-w-[1200px] rounded-2xl overflow-visible glass-navbar",
        open && "glass-navbar-open",
      )}
      role="banner"
      onKeyDown={(e) => {
        if (e.key === "Escape") setDropdown(false)
      }}
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
                  ref={servicesTriggerRef}
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}
                  onFocus={openDropdown}
                  onBlur={(e) => {
                    if (
                      !e.currentTarget.contains(e.relatedTarget as Node) &&
                      !megaMenuRef.current?.contains(e.relatedTarget as Node)
                    ) {
                      setDropdown(false)
                    }
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
            <Button href={CALENDLY_URL} variant="primary" size="sm">
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

      {/* ── Mobile menu ──────────────────────────────────────────── */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-white/30 px-5 py-4 max-h-[calc(100vh-6rem)] overflow-y-auto overscroll-contain"
        >
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
                        {allServiceLinks.map(({ label: sLabel, href: sHref, icon: Icon, description }) => (
                          <Link
                            key={sHref}
                            href={sHref}
                            onClick={() => setOpen(false)}
                            className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-[8px] hover:bg-[var(--ax-slate-200)]"
                          >
                            <Icon
                              size={14}
                              strokeWidth={1.75}
                              className="mt-[3px] shrink-0 text-[var(--ax-fg-3)]"
                              aria-hidden="true"
                            />
                            <div className="min-w-0">
                              <span className="block text-[14px] font-medium text-[var(--ax-fg-1)]">
                                {sLabel}
                              </span>
                              <span className="block text-[12px] text-[var(--ax-fg-3)] leading-snug mt-0.5">
                                {description}
                              </span>
                            </div>
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
              href={CALENDLY_URL}
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

    {/* ── Services mega menu (desktop only) ─────────────────────────
        Rendered as a fixed sibling of <header>, NOT a child of it.
        This prevents the header's backdrop-filter from expanding its
        paint region to cover the mega menu, which would produce a large
        gray blurred rectangle below the nav bar. */}
    {dropdown && (
      <div
        ref={megaMenuRef}
        className="ax-megamenu fixed hidden md:block z-40"
        style={{
          /* header top (top-4=16px) + header height (h-16=64px) + gap (8px) */
          top: "88px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "660px",
          maxWidth: "calc(100vw - 64px)",
          background: "var(--ax-surface)",
          border: "1px solid var(--ax-border)",
          borderRadius: "var(--ax-radius-lg)",
          boxShadow: "var(--ax-shadow-lg)",
        }}
        role="navigation"
        aria-label="Services submenu"
        onMouseEnter={openDropdown}
        onMouseLeave={closeDropdown}
        onKeyDown={(e) => {
          if (e.key === "Escape") setDropdown(false)
        }}
        onBlur={(e) => {
          if (
            !e.currentTarget.contains(e.relatedTarget as Node) &&
            !servicesTriggerRef.current?.contains(e.relatedTarget as Node)
          ) {
            setDropdown(false)
          }
        }}
      >
        {/* Three-column grid */}
        <div className="p-5 grid grid-cols-3 gap-x-5">
          {servicePillars.map((pillar) => (
            <div key={pillar.label}>
              <Eyebrow tone="muted" as="div" className="mb-3">
                {pillar.label}
              </Eyebrow>
              <div className="flex flex-col gap-0.5">
                {pillar.services.map(({ label: sLabel, href: sHref, icon: Icon, description }) => {
                  const active = mounted && pathname === sHref
                  return (
                    <Link
                      key={sHref}
                      href={sHref}
                      className={cn(
                        "group flex items-start gap-2.5 px-2.5 py-2 rounded-[var(--ax-radius-sm)] transition-colors duration-150",
                        active
                          ? "bg-[var(--ax-surface-tint)]"
                          : "hover:bg-[var(--ax-surface-tint)]",
                      )}
                    >
                      <Icon
                        size={14}
                        strokeWidth={1.75}
                        className="mt-[3px] shrink-0 text-[var(--ax-fg-3)]"
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <span
                          className={cn(
                            "block text-[13px] font-semibold leading-tight transition-colors duration-150",
                            active
                              ? "text-[var(--ax-primary)]"
                              : "text-[var(--ax-fg-1)] group-hover:text-[var(--ax-primary)]",
                          )}
                        >
                          {sLabel}
                        </span>
                        <span className="block text-[11px] leading-snug mt-0.5 text-[var(--ax-fg-3)]">
                          {description}
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mx-5" style={{ borderTop: "1px solid var(--ax-border)" }} aria-hidden="true" />

        {/* Bottom CTA row */}
        <div className="px-5 py-3 flex items-center justify-between">
          <span className="text-[12px] text-[var(--ax-fg-3)]">
            Not sure where to start?
          </span>
          <Link
            href={CALENDLY_URL}
            className="inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--ax-primary)] hover:text-[var(--ax-primary-dark)] transition-colors duration-150"
          >
            Book an Audit
            <ArrowRight size={12} strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </div>
      </div>
    )}
    </>
  )
}
