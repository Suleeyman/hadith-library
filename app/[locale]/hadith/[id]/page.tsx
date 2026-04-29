import HadithMeta from '@/components/hadith/HadithMeta'
import HadithText from '@/components/hadith/HadithText'
import PageHeader from '@/components/ui/PageHeader'
import { ApiError, getBook, getEditions, getHadith } from '@/lib/api'
import { getLocalizedText, getUiStrings, isLocale, locales } from '@/lib/i18n'
import { getSiteUrl } from '@/lib/site'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 3600

const DESCRIPTION_LENGTH = 150

function truncate(value: string, max: number) {
  if (value.length <= max) return value
  return `${value.slice(0, max).trim()}...`
}

export async function generateMetadata(
  props: PageProps<'/[locale]/hadith/[id]'>
): Promise<Metadata> {
  const { locale, id } = await props.params

  if (!isLocale(locale)) notFound()

  try {
    const hadith = await getHadith(id, {
      lang: locale,
      arabic_diacritics: 'exclude',
    })
    const text = getLocalizedText(hadith.text, locale)
    const title = truncate(text || 'Hadith', 90)
    const description = truncate(text || '', DESCRIPTION_LENGTH)
    const siteUrl = getSiteUrl()
    const canonical = `${siteUrl}/${locale}/hadith/${id}`
    const languages = Object.fromEntries(
      locales.map((lang) => [lang, `${siteUrl}/${lang}/hadith/${id}`])
    )

    return {
      title,
      description,
      alternates: {
        canonical,
        languages,
      },
    }
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound()
    throw error
  }
}

export default async function HadithPage(
  props: PageProps<'/[locale]/hadith/[id]'>
) {
  const { locale, id } = await props.params

  if (!isLocale(locale)) notFound()

  const t = getUiStrings(locale)

  let hadith
  try {
    hadith = await getHadith(id, {
      lang: locale,
      arabic: "include"
    })
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound()
    throw error
  }

  const editions = await getEditions(locale, locale)
  const edition = editions.find((item) => item._id === hadith.editionId)
  let book = null
  if (edition) {
    try {
      book = await getBook(edition.slug, hadith.bookIndex, locale)
    } catch {
      book = null
    }
  }

  const indexLabel = `#${hadith.hadithIndex}${
    hadith.hadithIndexMinor ? `.${hadith.hadithIndexMinor}` : ''
  }`
  const editionLabel = edition
    ? getLocalizedText(edition.name, locale)
    : hadith.editionId
  const bookLabel = book
    ? getLocalizedText(book.name, locale)
    : `${t.bookLabel} ${hadith.bookIndex}`
  const subtitle = `${editionLabel} - ${bookLabel}`

  return (
    <article className="space-y-10">
      <PageHeader eyebrow={t.hadithsTitle} title={indexLabel} subtitle={subtitle} />
      <HadithText locale={locale} text={hadith.text} />
      <HadithMeta locale={locale} hadith={hadith} edition={edition} book={book} />
    </article>
  )
}
