import Card from '@/components/ui/Card'
import { getLocalizedText, type Locale } from '@/lib/i18n'

type Props = {
  locale: Locale
  text: Record<string, string>
  showArabic: boolean
}

export default function HadithText({ locale, text, showArabic }: Props) {
  const localizedText = getLocalizedText(text, locale)
  const arabicText = showArabic ? text['ar-diacritics'] || text.ar : null

  return (
    <Card className="p-8">
      {arabicText ? (
        <p
          className="text-arabic text-2xl leading-relaxed text-foreground"
          dir="rtl"
          lang="ar"
        >
          {arabicText}
        </p>
      ) : null}
      <p className="mt-6 text-lg leading-relaxed text-foreground">
        {localizedText}
      </p>
    </Card>
  )
}
