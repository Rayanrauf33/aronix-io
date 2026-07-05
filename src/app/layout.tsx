import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Manrope, Inter, IBM_Plex_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "@/styles/app.css"
import "@/styles/blog.css"
import "@/styles/dashboard.css"

// Self-hosted via next/font: fonts are preloaded with the page instead of
// blocking first paint behind a CSS @import round-trip to Google
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://aronix.io"),
  title: {
    template: "%s | Aronix",
    default: "Aronix | Business Automation for Growing Companies",
  },
  description:
    "Aronix builds custom automation that connects your CRM, finance tools, and internal ops so your team stops firefighting and starts scaling.",
  openGraph: {
    siteName: "Aronix",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en-GB"
      suppressHydrationWarning
      className={`${manrope.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body suppressHydrationWarning>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
