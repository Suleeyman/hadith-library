import ArabicToggle from '@/components/hadith/ArabicToggle'
import HadithList from '@/components/sections/HadithList'
import PageHeader from '@/components/ui/PageHeader'
import Pagination from '@/components/ui/Pagination'
import { ApiError, getBook, getHadithsByBook } from '@/lib/api'
import { getLocalizedText, getUiStrings, isLocale } from '@/lib/i18n'
import { parseArabicDiacritics, parsePage } from '@/lib/query'
import { notFound } from 'next/navigation'

const PAGE_SIZE = 20

export const revalidate = 3600

export default async function BookPage(
  props: PageProps<'/[locale]/book/[slug]/[bookIndex]'>
) {
  const { locale, slug, bookIndex } = await props.params

  if (!isLocale(locale)) notFound()

  const index = Number(bookIndex)
  if (!Number.isFinite(index)) notFound()

  const searchParams = await props.searchParams
  const page = parsePage(searchParams?.page)
  const arabic = parseArabicDiacritics(searchParams?.arabic_diacritics)
  const t = getUiStrings(locale)

  let book
  let hadiths
  try {
    book = await getBook(slug, index, locale)
    hadiths = await getHadithsByBook(slug, index, {
      lang: locale,
      page,
      page_size: PAGE_SIZE,
      arabic_diacritics: arabic.param,
    })
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound()
    throw error
  }

  const title = getLocalizedText(book.name, locale)
  const subtitle = `${book.hadithCount} ${t.hadithsTitle}`

  return (
    <section className="space-y-10">
      <PageHeader eyebrow={t.booksTitle} title={title} subtitle={subtitle} />
      <ArabicToggle enabled={arabic.enabled} />
      <HadithList items={hadiths.items} locale={locale} showArabic={arabic.enabled} />
      <Pagination
        page={hadiths.page}
        pageSize={hadiths.page_size}
        total={hadiths.total}
        basePath={`/${locale}/book/${slug}/${index}`}
        query={arabic.enabled ? { arabic_diacritics: 'include' } : undefined}
      />
    </section>
  )
}
