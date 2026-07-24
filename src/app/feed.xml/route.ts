import { getPublishedPosts } from "@/lib/supabase/blog"

const SITE_URL = "https://aronix.io"

function escapeXml(str: string): string {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
}

function buildFeed(
  items: string,
  lastBuildDate: string,
): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Aronix Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Insights on automation, operations and growth from the Aronix team.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <image>
      <url>${SITE_URL}/icon-512x512.png</url>
      <title>Aronix Blog</title>
      <link>${SITE_URL}/blog</link>
    </image>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`
}

export async function GET() {
  try {
    const posts = await getPublishedPosts()

    const lastBuildDate =
      posts.length > 0
        ? new Date(
            Math.max(...posts.map((p) => new Date(p.updated_at).getTime())),
          ).toUTCString()
        : new Date().toUTCString()

    const items = posts
      .map(
        (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${encodeURI(post.slug)}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${encodeURI(post.slug)}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
      <category>${escapeXml(post.category)}</category>
    </item>`,
      )
      .join("\n")

    return new Response(buildFeed(items, lastBuildDate), {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=3600",
      },
    })
  } catch {
    return new Response(buildFeed("", new Date().toUTCString()), {
      status: 500,
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    })
  }
}
