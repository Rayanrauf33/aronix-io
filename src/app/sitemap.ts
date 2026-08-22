import type { MetadataRoute } from "next"
import { getPublishedPosts } from "@/lib/supabase/blog"
import { getPublishedCaseStudies } from "@/lib/supabase/case-studies"

export const revalidate = 3600

const SITE_URL = "https://aronix.io"

// lastModified must be bumped by hand whenever a route's actual content changes.
// Do not replace with new Date() here, search engines discount a sitemap where
// every static URL always reports "just changed".
const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; lastModified: string }[] = [
  { path: "/",                             priority: 1.0, changeFrequency: "weekly",  lastModified: "2026-07-24" },
  { path: "/services",                     priority: 0.9, changeFrequency: "monthly", lastModified: "2026-08-23" },
  { path: "/services/ai-voice-agents",     priority: 0.8, changeFrequency: "monthly", lastModified: "2026-08-23" },
  { path: "/services/instant-lead-response", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-08-23" },
  { path: "/services/ai-chat-booking",     priority: 0.8, changeFrequency: "monthly", lastModified: "2026-08-23" },
  { path: "/services/workflow-automation",  priority: 0.8, changeFrequency: "monthly", lastModified: "2026-08-23" },
  { path: "/services/crm-integrations",    priority: 0.8, changeFrequency: "monthly", lastModified: "2026-08-23" },
  { path: "/services/websites",            priority: 0.8, changeFrequency: "monthly", lastModified: "2026-08-23" },
  { path: "/services/local-seo",           priority: 0.8, changeFrequency: "monthly", lastModified: "2026-08-23" },
  { path: "/case-studies",                 priority: 0.8, changeFrequency: "weekly",  lastModified: "2026-07-24" },
  { path: "/blog",                         priority: 0.8, changeFrequency: "daily",   lastModified: "2026-07-24" },
  { path: "/contact",                      priority: 0.7, changeFrequency: "monthly", lastModified: "2026-08-23" },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, caseStudies] = await Promise.all([
    getPublishedPosts(),
    getPublishedCaseStudies(),
  ])

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${SITE_URL}/case-studies/${cs.slug}`,
    lastModified: new Date(cs.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticEntries, ...blogEntries, ...caseStudyEntries]
}
