import { notFound } from 'next/navigation'
import { ApiError, searchHadiths } from '@/lib/api'
import { getUiStrings, isLocale } from '@/lib/i18n'
import HadithCard from '@/components/HadithCard'
import Pagination from '@/components/Pagination'
import SearchInput from '@/components/SearchInput'

const PAGE_SIZE = 10

export const revalidate = 3600

function parsePage(value: unknown) {
  if (typeof value !== 'string') return 1
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
}

function parseQuery(value: unknown) {
  if (typeof value !== 'string') return ''
  return value.trim()
}

export default async function SearchPage(
  props: PageProps<'/[locale]/search'>
) {
  const { locale } = await props.params

  if (!isLocale(locale)) notFound()

  const t = getUiStrings(locale)
  const searchParams = await props.searchParams
  const query = parseQuery(searchParams?.q)
  const page = parsePage(searchParams?.page)

  let results
  if (query) {
    try {
      results = await searchHadiths(query, {
        lang: locale,
        page,
        page_size: PAGE_SIZE,
      })
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) notFound()
      throw error
    }
  }

  return (
    <section className="space-y-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-amber-700">{t.searchButton}</p>
        <SearchInput locale={locale} action={`/${locale}/search`} defaultValue={query} />
      </header>

      {!query ? (
        <p className="text-sm text-slate-600">{t.searchPrompt}</p>
      ) : results && results.items.length === 0 ? (
        <p className="text-sm text-slate-600">{t.noResults}</p>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-6">
            {results?.items.map((hadith) => (
              <HadithCard key={hadith._id} hadith={hadith} locale={locale} />
            ))}
          </div>
          {results ? (
            <Pagination
              page={results.page}
              pageSize={results.page_size}
              total={results.total}
              basePath={`/${locale}/search`}
              query={{ q: query }}
            />
          ) : null}
        </div>
      )}
    </section>
  )
}
