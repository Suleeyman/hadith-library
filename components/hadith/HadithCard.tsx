import Card from '@/components/ui/Card'
import type { Hadith, HadithSearchItem } from '@/lib/api'
import { getLocalizedText, getUiStrings, type Locale } from '@/lib/i18n'
import Link from 'next/link'

const textClamp = 220

type Props = {
  hadith: Hadith | HadithSearchItem
  locale: Locale
  showArabic?: boolean
}

function truncate(value: string, max = textClamp) {
  if (value.length <= max) return value
  return `${value.slice(0, max).trim()}...`
}

export default function HadithCard({ hadith, locale, showArabic = false }: Props) {
  const t = getUiStrings(locale)
  const text = getLocalizedText(hadith.text, locale)
  const title = truncate(text || '-')
  const arabicText = showArabic
    ? hadith.text['ar-diacritics'] || hadith.text.ar
    : null
  const arabicSnippet = arabicText ? truncate(arabicText, 160) : null
  const indexLabel = `#${hadith.hadithIndex}${
    hadith.hadithIndexMinor ? `.${hadith.hadithIndexMinor}` : ''
  }`
  const grade = hadith.grades?.[0]

  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span>{indexLabel}</span>
        <span>{t.bookLabel} {hadith.bookIndex}</span>
      </div>
      <div className="mt-4 space-y-4">
        {arabicSnippet ? (
          <p
            className="text-arabic text-xl leading-relaxed text-foreground"
            dir="rtl"
            lang="ar"
          >
            {arabicSnippet}
          </p>
        ) : null}
        <p className="text-lg leading-relaxed text-foreground">{title}</p>
      </div>
      {grade ? (
        <div className="mt-4 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{grade.name}:</span> {grade.grade}
        </div>
      ) : null}
      <div className="mt-5 flex items-center justify-between">
        <Link
          className="text-sm font-semibold text-foreground underline decoration-secondary/70 underline-offset-4 hover:text-foreground/80"
          href={`/${locale}/hadith/${hadith._id}`}
        >
          {t.readHadith}
        </Link>
      </div>
    </Card>
  )
}
