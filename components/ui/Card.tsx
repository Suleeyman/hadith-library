type Props = {
  children: React.ReactNode
  className?: string
}

export default function Card({ className, children }: Props) {

  return (
    <div className="card card-border bg-base-100 shadow-sm">
      <div className="card-body p-6">{children}</div>
    </div>
  )
}
