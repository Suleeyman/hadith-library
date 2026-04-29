import Card from '@/components/ui/Card'
import { getLocalizedText, type Locale } from '@/lib/i18n'

type Props = {
  locale: Locale
  text: Record<string, string>
}

export default function HadithText({ locale, text }: Props) {
  const localizedText = getLocalizedText(text, locale)
  const arabicText = locale !== "ar" ? text.ar || text['ar-diacritics'] : null

  return (
    <Card>
      <p className="text-lg leading-relaxed text-foreground">
        {localizedText}
      </p>
      {arabicText && (
        <p
          className="text-arabic text-right text-2xl leading-relaxed text-foreground"
          dir="rtl"
          lang="ar"
        >
          {arabicText}
        </p>
      )}
    </Card>
  )
}
