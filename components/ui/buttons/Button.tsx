import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'ghost' | 'secondary'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
}

export default function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}