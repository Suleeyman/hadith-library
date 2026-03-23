import { notFound } from 'next/navigation'
import { getEditions } from '@/lib/api'
import { getUiStrings, isLocale } from '@/lib/i18n'
import EditionGrid from '@/components/sections/EditionGrid'
import PageHeader from '@/components/ui/PageHeader'

export const revalidate = 3600

export default async function HomePage(props: PageProps<'/[locale]'>) {
  const { locale } = await props.params

  if (!isLocale(locale)) notFound()

  const t = getUiStrings(locale)
  const editions = await getEditions()

  return (
    <section className="space-y-10">
      <PageHeader
        eyebrow={t.editionsTitle}
        title={t.appName}
        subtitle={t.appTagline}
      />
      <EditionGrid
        editions={editions}
        locale={locale}
        booksLabel={t.booksTitle}
        hadithsLabel={t.hadithsTitle}
      />
    </section>
  )
}
