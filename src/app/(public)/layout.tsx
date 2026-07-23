import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { organizationSchema, webSiteSchema, toJsonLd } from "@/lib/schema"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(organizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(webSiteSchema()) }}
      />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
