import { getEditions } from '@/lib/api'
import { getLocalizedText, getUiStrings, isLocale } from '@/lib/i18n'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 3600

export default async function HomePage(props: PageProps<'/[locale]'>) {
  const { locale } = await props.params

  if (!isLocale(locale)) notFound()

  const t = getUiStrings(locale)
  const editions = await getEditions()

  console.log(editions);
  

  return (
    <section className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-amber-700">{t.editionsTitle}</p>
        <h1 className="text-4xl font-semibold text-slate-900">{t.appName}</h1>
        <p className="max-w-2xl text-base text-slate-600">{t.appTagline}</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {editions.map((edition) => {
          const name = getLocalizedText(edition.name, locale)
          return (
            <Link
              key={edition._id}
              href={`/${locale}/edition/${edition.slug}`}
              className="group rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm shadow-slate-200/50 transition hover:-translate-y-1"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-500">
                <span>{edition.bookCount} {t.booksTitle}</span>
                <span>{edition.hadithCount} {t.hadithsTitle}</span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900 group-hover:text-amber-700">
                {name}
              </h2>
              <p className="mt-2 text-sm text-slate-600">/{edition.slug}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
