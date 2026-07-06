import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Clock } from "lucide-react"
import { getPostBySlug, getRelatedPosts } from "@/lib/supabase/blog"
import { Avatar } from "@/components/ui/Avatar"
import { PostCover } from "@/components/ui/PostCover"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { Button } from "@/components/ui/Button"
import { SubscribeForm } from "@/components/ui/SubscribeForm"
import { PostCard } from "@/components/cards/BlogPostCard"
import { articleSchema, breadcrumbSchema, toJsonLd } from "@/lib/schema"

export const revalidate = 60

type Params = Promise<{ slug: string }>

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: "Post not found" }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      siteName: "Aronix",
      locale: "en_GB",
      type: "article",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: [post.author],
    },
    alternates: { canonical: `/blog/${post.slug}` },
  }
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const related = await getRelatedPosts(post.id, 3)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(articleSchema(post)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title },
        ])) }}
      />
      <section
        className="px-5 sm:px-12 pt-[120px] pb-12"
        style={{ background: "var(--ax-soft-blush)" }}
        aria-labelledby="article-heading"
      >
        <div className="max-w-[1280px] mx-auto">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.category },
          ]} />
          <h1
            id="article-heading"
            className="text-[var(--ax-fg-1)] mb-7 max-w-[840px]"
            style={{
              fontFamily: "var(--ax-font-display)",
              fontWeight: 800,
              fontSize: "clamp(32px, 4vw, 52px)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
            }}
          >
            {post.title}
          </h1>
          <div className="flex items-center gap-3.5">
            <Avatar name={post.author} size={42} fontSize={15} />
            <div>
              <div className="text-[14px] text-[var(--ax-fg-2)]">
                <strong className="text-[var(--ax-fg-1)] font-semibold">{post.author}</strong>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-[var(--ax-fg-3)] mt-0.5">
                <span>{formatDate(post.created_at)}</span>
                <span aria-hidden="true">&middot;</span>
                <span className="flex items-center gap-1">
                  <Clock size={12} strokeWidth={1.75} aria-hidden="true" />
                  {post.read_time} read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-5 sm:px-12">
        <PostCover
          src={post.cover_image}
          alt={post.title}
          category={post.category}
          minHeight={380}
          rounded="0 0 24px 24px"
          priority
        />
      </div>

      <section className="px-5 sm:px-12 pt-14 pb-24" aria-label="Article body">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_292px] gap-12 lg:gap-[72px] items-start">
            <div>
              <p className="text-[19px] leading-[1.8] text-[var(--ax-fg-2)] mb-12 pb-10 border-b border-[var(--ax-border)]">
                {post.excerpt}
              </p>
              <div className="article-prose" dangerouslySetInnerHTML={{ __html: post.content }} />

              <div
                className="mt-14 p-10 rounded-[24px] border border-[var(--ax-border)]"
                style={{ background: "var(--ax-soft-blush)" }}
              >
                <Eyebrow className="mb-2.5">Ready to remove your own manual steps?</Eyebrow>
                <div
                  className="mb-3 text-[var(--ax-fg-1)]"
                  style={{
                    fontFamily: "var(--ax-font-display)",
                    fontWeight: 700,
                    fontSize: "22px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Book a free 45-minute workflow audit
                </div>
                <p className="text-[15px] leading-[1.65] text-[var(--ax-fg-2)] mb-6">
                  We&apos;ll map your highest-cost manual process and outline a realistic
                  automation plan. No obligation.
                </p>
                <Button
                  href="https://calendly.com/rayanrauf33/muhammad-rayan-15-minute-session"
                  variant="primary"
                  size="md"
                  trailingArrow
                >
                  Book an Automation Audit
                </Button>
              </div>
            </div>

            <aside className="flex flex-col gap-5 lg:sticky lg:top-[88px]">
              <div className="bg-white border border-[var(--ax-border)] rounded-[16px] p-6">
                <div className="flex items-center gap-3 mb-1">
                  <Avatar name={post.author} size={44} fontSize={16} />
                  <div>
                    <div
                      className="text-[15px] text-[var(--ax-fg-1)]"
                      style={{ fontFamily: "var(--ax-font-display)", fontWeight: 600 }}
                    >
                      {post.author}
                    </div>
                    {post.author_role && (
                      <div className="text-[12px] text-[var(--ax-fg-3)] mt-0.5">
                        {post.author_role}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div
                className="rounded-[16px] p-6"
                style={{ background: "var(--ax-gradient-dark-cta)" }}
              >
                <h4
                  className="text-white mb-2"
                  style={{ fontFamily: "var(--ax-font-display)", fontWeight: 700, fontSize: "16px", lineHeight: 1.3 }}
                >
                  Get insights like this fortnightly
                </h4>
                <p className="text-[13px] text-[var(--ax-fg-on-dark-2)] mb-3.5 leading-[1.55]">
                  Practical automation tactics and workflow ideas. No fluff.
                </p>
                <SubscribeForm variant="sidebar" />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section
          className="px-5 sm:px-12 py-20"
          style={{ background: "var(--ax-soft-blush)" }}
          aria-labelledby="related-heading"
        >
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-10">
              <Eyebrow className="mb-3.5">Continue reading</Eyebrow>
              <h2
                id="related-heading"
                className="text-[var(--ax-fg-1)]"
                style={{
                  fontFamily: "var(--ax-font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(24px, 2.5vw, 32px)",
                  letterSpacing: "-0.015em",
                  lineHeight: 1.2,
                }}
              >
                More from the Aronix blog
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
