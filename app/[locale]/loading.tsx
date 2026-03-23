import Container from '@/components/ui/Container'

export default function Loading() {
  return (
    <div className="py-12">
      <Container>
        <div className="space-y-4">
          <div className="skeleton h-6 w-40" />
          <div className="skeleton h-10 w-2/3" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-5/6" />
        </div>
      </Container>
    </div>
  )
}
