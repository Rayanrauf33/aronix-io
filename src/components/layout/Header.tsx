"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Home",     href: "/" },
  { label: "Services", href: "/services" },
  { label: "Blog",     href: "/blog" },
  { label: "Contact",  href: "/contact" },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setMounted(true) }, [])

  return (
    <header
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-24px)] max-w-[1200px] rounded-2xl overflow-hidden glass-navbar",
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
            href="/dashboard"
            className="ml-1 p-2 rounded-[8px] text-[var(--ax-fg-2)] hover:text-[var(--ax-fg-1)] hover:bg-[var(--ax-slate-200)] transition-colors"
            title="Dashboard"
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
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="px-3.5 py-3 text-[15px] font-medium text-[var(--ax-fg-1)] rounded-[8px] hover:bg-[var(--ax-slate-200)]"
              >
                {label}
              </Link>
            ))}
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
