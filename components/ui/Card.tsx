type Props = {
  children: React.ReactNode
  className?: string
}

export default function Card({ children }: Props) {

  return (
    <div className="card card-border bg-base-100">
      <div className="card-body p-6">{children}</div>
    </div>
  )
}
