import Link from 'next/link'
import type { Hadith, HadithSearchItem } from '@/lib/api'
import { getLocalizedText, getUiStrings, type Locale } from '@/lib/i18n'

const textClamp = 220

type Props = {
  hadith: Hadith | HadithSearchItem
  locale: Locale
}

function truncate(value: string, max = textClamp) {
  if (value.length <= max) return value
  return `${value.slice(0, max).trim()}...`
}

export default function HadithCard({ hadith, locale }: Props) {
  const t = getUiStrings(locale)
  const text = getLocalizedText(hadith.text, locale)
  const title = truncate(text || '-')
  const indexLabel = `#${hadith.hadithIndex}${
    hadith.hadithIndexMinor ? `.${hadith.hadithIndexMinor}` : ''
  }`
  const grade = hadith.grades?.[0]

  return (
    <article className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm shadow-slate-200/50 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-slate-500">
        <span>{indexLabel}</span>
        <span>{t.bookLabel} {hadith.bookIndex}</span>
      </div>
      <p className="mt-4 text-lg leading-relaxed text-slate-900">{title}</p>
      {grade ? (
        <div className="mt-4 text-sm text-slate-600">
          <span className="font-semibold">{grade.name}:</span> {grade.grade}
        </div>
      ) : null}
      <div className="mt-5 flex items-center justify-between">
        <Link
          className="text-sm font-semibold text-slate-900 underline decoration-amber-400/70 underline-offset-4 hover:text-slate-700"
          href={`/${locale}/hadith/${hadith._id}`}
        >
          {t.readHadith}
        </Link>
      </div>
    </article>
  )
}
