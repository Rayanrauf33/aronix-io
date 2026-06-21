import Image from "next/image"
import { categoryGradient } from "@/components/ui/CategoryPill"

type Props = {
  src: string | null
  alt: string
  category: string
  className?: string
  aspectRatio?: string
  minHeight?: number
  rounded?: string
  priority?: boolean
}

export function PostCover({
  src,
  alt,
  category,
  className,
  aspectRatio = "56.25%",
  minHeight,
  rounded,
  priority,
}: Props) {
  const wrapperStyle = minHeight
    ? { minHeight, position: "relative" as const, borderRadius: rounded, overflow: "hidden" as const }
    : { paddingTop: aspectRatio, position: "relative" as const, borderRadius: rounded, overflow: "hidden" as const }

  return (
    <div className={className} style={wrapperStyle}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover"
          priority={priority}
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: categoryGradient(category) }}
        />
      )}
    </div>
  )
}
