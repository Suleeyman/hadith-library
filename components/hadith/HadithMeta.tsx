import Card from '@/components/ui/Card'
import type { BookWithEdition, Edition, Hadith } from '@/lib/api'
import { getLocalizedText, type Locale } from '@/lib/i18n'

type Props = {
  locale: Locale
  hadith: Hadith
  edition?: Edition | null
  book?: BookWithEdition | null
}

export default function HadithMeta({ locale, hadith, edition, book }: Props) {
  const indexLabel = `#${hadith.hadithIndex}${
    hadith.hadithIndexMinor ? `.${hadith.hadithIndexMinor}` : ''
  }`

  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <Card className="p-6">
        <h2 className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Metadata</h2>
        <dl className="mt-4 space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <dt>Edition</dt>
            <dd className="font-semibold text-foreground">
              {edition ? getLocalizedText(edition.name, locale) : hadith.editionId}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt>Book</dt>
            <dd className="font-semibold text-foreground">
              {book ? getLocalizedText(book.name, locale) : hadith.bookIndex}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt>Hadith Index</dt>
            <dd className="font-semibold text-foreground">{indexLabel}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt>Book Index</dt>
            <dd className="font-semibold text-foreground">{hadith.bookHadithIndex}</dd>
          </div>
        </dl>
      </Card>

      <Card className="p-6">
        <h2 className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Grades</h2>
        <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
          {hadith.grades.length === 0 ? (
            <li className="text-muted-foreground/70">-</li>
          ) : (
            hadith.grades.map((grade, index) => (
              <li key={`${grade.name}-${index}`} className="flex justify-between">
                <span className="font-semibold text-foreground">{grade.name}</span>
                <span>{grade.grade}</span>
              </li>
            ))
          )}
        </ul>
      </Card>
    </section>
  )
}
