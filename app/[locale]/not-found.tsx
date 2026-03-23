import LinkButton from '@/components/ui/buttons/LinkButton'
import Container from '@/components/ui/Container'

export default function NotFound() {
  return (
    <div className="py-16">
      <Container>
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">Page not found</h1>
          <p className="text-sm text-muted-foreground">
            The page you are looking for does not exist.
          </p>
          <LinkButton href="/">
            Go home
          </LinkButton>
        </div>
      </Container>
    </div>
  )
}
