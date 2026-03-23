import Link from 'next/link'
import type { AnchorHTMLAttributes } from 'react'

type Variant = 'primary' | 'ghost' | 'secondary'

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant
  href: string
}

export default function LinkButton({
  variant = 'ghost',
  href,
  children,
  className = '',
  ...props
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`btn btn-${variant} ${className}`}
      {...props}
    >
      {children}
    </Link>
  )
}