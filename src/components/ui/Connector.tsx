type Props = {
  active?: boolean
}

export function Connector({ active = false }: Props) {
  const color = active ? "var(--ax-primary)" : "var(--ax-border-strong)"
  return (
    <div
      className="wf-connector"
      style={{ background: color }}
      aria-hidden="true"
    >
      <span
        className="absolute right-0 top-1/2 -translate-y-1/2 border-y-[5px] border-y-transparent border-l-[7px]"
        style={{ borderLeftColor: color }}
      />
    </div>
  )
}
