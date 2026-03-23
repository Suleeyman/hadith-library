type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
}

export default function PageHeader({ eyebrow, title, subtitle }: Props) {
  return (
    <header className="space-y-3">
      {!!eyebrow && (
        <p className="text-xs uppercase tracking-[0.35em] text-secondary">
          {eyebrow}
        </p>
      )}
      <h1 className="text-4xl font-semibold text-foreground">{title}</h1>
      {!!subtitle && (
        <p className="max-w-2xl text-base text-muted-foreground">{subtitle}</p>
      )}
    </header>
  )
}
