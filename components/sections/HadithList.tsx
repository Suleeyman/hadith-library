import type { Hadith, HadithSearchItem } from '@/lib/api'
import type { Locale } from '@/lib/i18n'
import HadithCard from '@/components/hadith/HadithCard'

type Props = {
  items: Array<Hadith | HadithSearchItem>
  locale: Locale
  showArabic?: boolean
}

export default function HadithList({ items, locale, showArabic = false }: Props) {
  return (
    <div className="grid gap-6">
      {items.map((hadith) => (
        <HadithCard
          key={hadith._id}
          hadith={hadith}
          locale={locale}
          showArabic={showArabic}
        />
      ))}
    </div>
  )
}
