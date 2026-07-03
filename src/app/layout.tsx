import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "@/styles/app.css"
import "@/styles/blog.css"
import "@/styles/dashboard.css"

export const metadata: Metadata = {
  title: {
    template: "%s | Aronix",
    default: "Aronix",
  },
  description: "Editorial clarity meets operational intelligence.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
