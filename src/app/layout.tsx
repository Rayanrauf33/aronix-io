import type { Metadata } from "next"
import "@/styles/app.css"
import "@/styles/blog.css"

export const metadata: Metadata = {
  title: {
    template: `%s | Aronix`,
    default: "Aronix",
  },
  description: "Editorial clarity meets operational intelligence.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  )
}
