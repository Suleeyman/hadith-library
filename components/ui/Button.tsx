import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'ghost'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
}

const variantClasses: Record<Variant, string> = {
  primary: 'btn btn-primary',
  ghost: 'btn btn-ghost',
}

export function buttonClasses(variant: Variant = 'primary', className?: string) {
  const classes = variantClasses[variant]
  return className ? `${classes} ${className}` : classes
}

export default function Button({
  variant = 'primary',
  className,
  ...props
}: Props) {
  return <button className={buttonClasses(variant, className)} {...props} />
}
