type Props = {
  active?: boolean
}

export function Connector({ active = false }: Props) {
  const color = active ? "var(--ax-primary)" : "var(--ax-border-strong)"
  return (
    <div
      className="relative w-8 h-0.5 mx-0.5 shrink-0"
      style={{ background: color, marginTop: "23px" }}
      aria-hidden="true"
    >
      <span
        className="absolute right-0 top-1/2 -translate-y-1/2 border-y-[5px] border-y-transparent border-l-[7px]"
        style={{ borderLeftColor: color }}
      />
    </div>
  )
}
