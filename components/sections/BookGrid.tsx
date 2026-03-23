import Card from '@/components/ui/Card'
import type { Book } from '@/lib/api'
import { getLocalizedText, type Locale } from '@/lib/i18n'
import Link from 'next/link'

type Props = {
  books: Book[]
  locale: Locale
  slug: string
  booksLabel: string
  hadithsLabel: string
}

export default function BookGrid({ books, locale, slug, booksLabel, hadithsLabel }: Props) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {books.map((book) => (
        <Link
          key={book._id}
          href={`/${locale}/book/${slug}/${book.bookIndex}`}
          className="group"
        >
          <Card className="transition hover:-translate-y-1 p-5">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {booksLabel} {book.bookIndex}
            </div>
            <h2 className="mt-3 text-xl font-semibold text-foreground group-hover:text-secondary">
              {getLocalizedText(book.name, locale)}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {book.hadithCount} {hadithsLabel}
            </p>
          </Card>
        </Link>
      ))}
    </div>
  )
}
