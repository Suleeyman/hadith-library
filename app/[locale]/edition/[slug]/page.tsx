import BookGrid from '@/components/sections/BookGrid'
import PageHeader from '@/components/ui/PageHeader'
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
    edition = await getEdition(slug, locale)
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound()
    throw error
  }

  const title = getLocalizedText(edition.name, locale)
  const subtitle = `${edition.bookCount} ${t.booksTitle} - ${edition.hadithCount} ${t.hadithsTitle}`

  return (
    <section className="space-y-10">
      <PageHeader eyebrow={t.editionsTitle} title={title} subtitle={subtitle} />
      <BookGrid
        books={edition.books}
        locale={locale}
        slug={edition.slug}
        booksLabel={t.bookLabel}
        hadithsLabel={t.hadithsTitle}
      />
    </section>
  )
}
