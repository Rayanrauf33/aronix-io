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
    sameAs: [
      "https://www.linkedin.com/company/aronix/",
      "https://www.instagram.com/aronix.io/",
    ],
    // TODO: add telephone once contact number is confirmed
    // telephone: "",
    // TODO: add contactPoint once contact details are confirmed
    // contactPoint: { "@type": "ContactPoint", telephone: "", contactType: "customer service" },
    // TODO: add address once physical/registered address is confirmed
    // address: { "@type": "PostalAddress", addressCountry: "" },
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
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
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
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebPage" as const,
      "@id": `${SITE_URL}/blog`,
    },
  }
}

/* ------------------------------------------------------------------ */
/*  Article (case studies)                                             */
/* ------------------------------------------------------------------ */

export function caseStudyArticleSchema(cs: import("@/types").CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    description: cs.summary,
    datePublished: cs.created_at,
    dateModified: cs.updated_at,
    author: {
      "@type": "Organization" as const,
      name: SITE_NAME,
      url: SITE_URL,
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
      "@id": `${SITE_URL}/case-studies/${cs.slug}`,
    },
    isPartOf: {
      "@type": "WebPage" as const,
      "@id": `${SITE_URL}/case-studies`,
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

/* ------------------------------------------------------------------ */
/*  Service                                                            */
/* ------------------------------------------------------------------ */

export function serviceSchema({
  name,
  description,
  url,
}: {
  name: string
  description: string
  url: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${url}`,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    // TODO: confirm and re-add correct areaServed once service geography is confirmed
    serviceType: name,
  }
}
