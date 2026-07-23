import Link from "next/link"
import { Clock } from "lucide-react"
import type { BlogPost } from "@/types"
import { CategoryPill } from "@/components/ui/CategoryPill"
import { PostCover } from "@/components/ui/PostCover"
import { Avatar } from "@/components/ui/Avatar"
import { Button } from "@/components/ui/Button"

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="glass-card rounded-[16px] overflow-hidden flex flex-col">
      <Link href={`/blog/${post.slug}`} className="block">
        <PostCover src={post.cover_image} alt={post.title} category={post.category} />
      </Link>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <CategoryPill category={post.category} className="self-start" />
        <Link href={`/blog/${post.slug}`} className="no-underline">
          <h3
            className="text-[18px] text-[var(--ax-fg-1)]"
            style={{
              fontFamily: "var(--ax-font-display)",
              fontWeight: 700,
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
            }}
          >
            {post.title}
          </h3>
        </Link>
        <p className="text-[14px] leading-[1.6] text-[var(--ax-fg-2)] flex-1">{post.excerpt}</p>
        <div className="flex items-center gap-2.5 pt-3 border-t border-[var(--ax-border)]">
          <Avatar name={post.author} />
          <span className="text-[12px] text-[var(--ax-fg-2)]">
            <strong className="font-medium text-[var(--ax-fg-1)]">{post.author.split(" ")[0]}</strong>
            {" · "}
            {formatDate(post.created_at)}
          </span>
          <span
            className="ml-auto text-[10px] text-[var(--ax-fg-3)] flex items-center gap-1 whitespace-nowrap"
            style={{ fontFamily: "var(--ax-font-mono)", letterSpacing: "0.04em" }}
          >
            <Clock size={12} strokeWidth={1.75} aria-hidden="true" />
            {post.read_time}
          </span>
        </div>
      </div>
    </article>
  )
}

export function FeaturedPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="glass-card rounded-[24px] overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_44%] mb-12">
      <div className="p-10 lg:p-12 flex flex-col justify-between gap-7">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2.5">
            <span
              className="text-[10px] font-semibold uppercase px-2.5 py-1 rounded-[4px] bg-[var(--ax-slate-900)] text-white"
              style={{ fontFamily: "var(--ax-font-mono)", letterSpacing: "0.1em" }}
            >
              Featured
            </span>
            <CategoryPill category={post.category} />
          </div>
          <Link href={`/blog/${post.slug}`} className="no-underline">
            <h2
              className="text-[var(--ax-fg-1)]"
              style={{
                fontFamily: "var(--ax-font-display)",
                fontWeight: 800,
                fontSize: "clamp(24px, 2.5vw, 34px)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              {post.title}
            </h2>
          </Link>
          <p className="text-[16px] leading-[1.7] text-[var(--ax-fg-2)]">{post.excerpt}</p>
        </div>
        <div className="flex items-center justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-3">
            <Avatar name={post.author} size={40} fontSize={14} />
            <div>
              <div className="text-[14px] font-semibold text-[var(--ax-fg-1)]">{post.author}</div>
              <div className="text-[12px] text-[var(--ax-fg-3)]">
                {formatDate(post.created_at)} &middot; {post.read_time} read
              </div>
            </div>
          </div>
          <Button href={`/blog/${post.slug}`} variant="outline" size="sm">
            Read article
          </Button>
        </div>
      </div>
      <Link href={`/blog/${post.slug}`} className="block relative" aria-label={post.title}>
        <PostCover
          src={post.cover_image}
          alt={post.title}
          category={post.category}
          minHeight={340}
          rounded="0"
          priority
        />
      </Link>
    </article>
  )
}
