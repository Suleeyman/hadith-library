import { notFound } from 'next/navigation'
import { ApiError, getBook, getHadithsByBook } from '@/lib/api'
import { getLocalizedText, getUiStrings, isLocale } from '@/lib/i18n'
import HadithCard from '@/components/HadithCard'
import Pagination from '@/components/Pagination'

const PAGE_SIZE = 20

export const revalidate = 3600

function parsePage(value: unknown) {
  if (typeof value !== 'string') return 1
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
}

export default async function BookPage(
  props: PageProps<'/[locale]/book/[slug]/[bookIndex]'>
) {
  const { locale, slug, bookIndex } = await props.params

  if (!isLocale(locale)) notFound()

  const index = Number(bookIndex)
  if (!Number.isFinite(index)) notFound()

  const page = parsePage((await props.searchParams)?.page)
  const t = getUiStrings(locale)

  let book
  let hadiths
  try {
    book = await getBook(slug, index)
    hadiths = await getHadithsByBook(slug, index, {
      lang: locale,
      page,
      page_size: PAGE_SIZE,
    })
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound()
    throw error
  }

  return (
    <section className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-amber-700">{t.booksTitle}</p>
        <h1 className="text-4xl font-semibold text-slate-900">
          {getLocalizedText(book.name, locale)}
        </h1>
        <p className="text-sm text-slate-600">
          {book.hadithCount} {t.hadithsTitle}
        </p>
      </header>

      <div className="grid gap-6">
        {hadiths.items.map((hadith) => (
          <HadithCard key={hadith._id} hadith={hadith} locale={locale} />
        ))}
      </div>

      <Pagination
        page={hadiths.page}
        pageSize={hadiths.page_size}
        total={hadiths.total}
        basePath={`/${locale}/book/${slug}/${index}`}
      />
    </section>
  )
}
