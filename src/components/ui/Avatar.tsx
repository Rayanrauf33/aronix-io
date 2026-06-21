const palette = [
  "var(--ax-pink-600)",
  "var(--ax-info-text)",
  "var(--ax-accent-deep)",
  "var(--ax-slate-700)",
]

function hashColor(name: string): string {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0
  return palette[h % palette.length]
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")
}

type Props = {
  name: string
  size?: number
  fontSize?: number
}

export function Avatar({ name, size = 28, fontSize = 10 }: Props) {
  return (
    <div
      aria-hidden="true"
      className="rounded-full inline-flex items-center justify-center font-semibold text-white shrink-0"
      style={{
        width: size,
        height: size,
        fontSize,
        background: hashColor(name),
        fontFamily: "var(--ax-font-mono)",
      }}
    >
      {initials(name)}
    </div>
  )
}
