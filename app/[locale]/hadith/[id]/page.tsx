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
    const hadith = await getHadith(id, { lang: locale })
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
    hadith = await getHadith(id, { lang: locale })
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound()
    throw error
  }

  const editions = await getEditions()
  const edition = editions.find((item) => item._id === hadith.editionId)
  let book = null
  if (edition) {
    try {
      book = await getBook(edition.slug, hadith.bookIndex)
    } catch {
      book = null
    }
  }

  const localizedText = getLocalizedText(hadith.text, locale)
  const arabicText = locale === 'ar' ? null : hadith.text?.ar
  const indexLabel = `#${hadith.hadithIndex}${
    hadith.hadithIndexMinor ? `.${hadith.hadithIndexMinor}` : ''
  }`

  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-amber-700">{t.hadithsTitle}</p>
        <h1 className="text-3xl font-semibold text-slate-900">{indexLabel}</h1>
        <p className="text-sm text-slate-600">
          {edition ? getLocalizedText(edition.name, locale) : hadith.editionId} -{' '}
          {book ? getLocalizedText(book.name, locale) : `Book ${hadith.bookIndex}`}
        </p>
      </header>

      <section className="rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-sm shadow-slate-200/50">
        {arabicText ? (
          <p
            className="text-arabic text-2xl leading-relaxed text-slate-900"
            dir="rtl"
            lang="ar"
          >
            {arabicText}
          </p>
        ) : null}
        <p className="mt-6 text-lg leading-relaxed text-slate-900">
          {localizedText}
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm shadow-slate-200/50">
          <h2 className="text-sm uppercase tracking-[0.3em] text-slate-500">Metadata</h2>
          <dl className="mt-4 space-y-3 text-sm text-slate-700">
            <div className="flex items-center justify-between">
              <dt>Edition</dt>
              <dd className="font-semibold text-slate-900">
                {edition ? getLocalizedText(edition.name, locale) : hadith.editionId}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt>Book</dt>
              <dd className="font-semibold text-slate-900">
                {book ? getLocalizedText(book.name, locale) : hadith.bookIndex}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt>Hadith Index</dt>
              <dd className="font-semibold text-slate-900">{indexLabel}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt>Book Index</dt>
              <dd className="font-semibold text-slate-900">{hadith.bookHadithIndex}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm shadow-slate-200/50">
          <h2 className="text-sm uppercase tracking-[0.3em] text-slate-500">{t.gradesTitle}</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            {hadith.grades.length === 0 ? (
              <li className="text-slate-500">-</li>
            ) : (
              hadith.grades.map((grade, index) => (
                <li key={`${grade.name}-${index}`} className="flex justify-between">
                  <span className="font-semibold text-slate-900">{grade.name}</span>
                  <span>{grade.grade}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </section>
    </article>
  )
}
