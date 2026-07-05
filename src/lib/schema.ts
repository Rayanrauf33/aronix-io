import type { BlogPost } from "@/types"

const SITE_URL = "https://aronix.io"
const SITE_NAME = "Aronix"
const LOGO_URL = `${SITE_URL}/icon-512x512.png`

/**
 * Safely serialise a schema object for embedding in a `<script>` tag.
 * Replaces `<` with `\u003c` to prevent the HTML parser from seeing
 * `</script>` sequences inside JSON string values.
 */
export function toJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replaceAll("<", "\\u003c")
}

/* ------------------------------------------------------------------ */
/*  Organization                                                       */
/* ------------------------------------------------------------------ */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    description:
      "Aronix builds custom automation that connects your CRM, finance tools, and internal ops so your team stops firefighting and starts scaling.",
  }
}

/* ------------------------------------------------------------------ */
/*  WebSite                                                            */
/* ------------------------------------------------------------------ */

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  }
}

/* ------------------------------------------------------------------ */
/*  Article (blog posts)                                               */
/* ------------------------------------------------------------------ */

export function articleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    ...(post.cover_image ? { image: post.cover_image } : {}),
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Person" as const,
      name: post.author,
    },
    publisher: {
      "@type": "Organization" as const,
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject" as const,
        url: LOGO_URL,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage" as const,
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  }
}

/* ------------------------------------------------------------------ */
/*  BreadcrumbList                                                     */
/* ------------------------------------------------------------------ */

interface BreadcrumbItem {
  name: string
  path?: string
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem" as const,
      position: i + 1,
      name: item.name,
      ...(item.path ? { item: `${SITE_URL}${item.path}` } : {}),
    })),
  }
}

/* ------------------------------------------------------------------ */
/*  FAQPage                                                            */
/* ------------------------------------------------------------------ */

interface FaqItem {
  label: string
  content: string
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question" as const,
      name: faq.label,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: faq.content,
      },
    })),
  }
}
