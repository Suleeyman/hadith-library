'use client'

import Button from '@/components/ui/buttons/Button'
import LinkButton from '@/components/ui/buttons/LinkButton'
import Container from '@/components/ui/Container'
import { useEffect } from 'react'

export default function Error({
  error,
  unstable_retryAction,
}: {
  error: Error & { digest?: string }
  unstable_retryAction: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="py-16">
      <Container>
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">Something went wrong</h1>
          <p className="text-sm text-muted-foreground">
            We hit an unexpected error. Try again or head back home.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={unstable_retryAction}>
              Try again
            </Button>
            <LinkButton href="/">
              Go home
            </LinkButton>
          </div>
        </div>
      </Container>
    </div>
  )
}
