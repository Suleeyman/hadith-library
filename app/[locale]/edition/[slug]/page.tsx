import Link from 'next/link'
import { ApiError, getEdition } from '@/lib/api'
import { getLocalizedText, getUiStrings, isLocale } from '@/lib/i18n'
import { notFound } from 'next/navigation'

export const revalidate = 3600

export default async function EditionPage(
  props: PageProps<'/[locale]/edition/[slug]'>
) {
  const { locale, slug } = await props.params

  if (!isLocale(locale)) notFound()

  const t = getUiStrings(locale)

  let edition
  try {
    edition = await getEdition(slug)
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound()
    throw error
  }

  return (
    <section className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-amber-700">{t.editionsTitle}</p>
        <h1 className="text-4xl font-semibold text-slate-900">
          {getLocalizedText(edition.name, locale)}
        </h1>
        <p className="text-sm text-slate-600">
          {edition.bookCount} {t.booksTitle} - {edition.hadithCount} {t.hadithsTitle}
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {edition.books.map((book) => (
          <Link
            key={book._id}
            href={`/${locale}/book/${edition.slug}/${book.bookIndex}`}
            className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm shadow-slate-200/40 transition hover:-translate-y-1"
          >
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
              {t.booksTitle} {book.bookIndex}
            </div>
            <h2 className="mt-3 text-xl font-semibold text-slate-900">
              {getLocalizedText(book.name, locale)}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {book.hadithCount} {t.hadithsTitle}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
