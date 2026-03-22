import Link from 'next/link'

type Props = {
  page: number
  pageSize: number
  total: number
  basePath: string
  query?: Record<string, string | number | undefined>
}

function buildUrl(basePath: string, page: number, query: Props['query']) {
  const params = new URLSearchParams()
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined) continue
      params.set(key, String(value))
    }
  }
  params.set('page', String(page))
  const queryString = params.toString()
  return queryString ? `${basePath}?${queryString}` : basePath
}

export default function Pagination({ page, pageSize, total, basePath, query }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  if (totalPages <= 1) return null

  const prevPage = page > 1 ? page - 1 : null
  const nextPage = page < totalPages ? page + 1 : null

  return (
    <nav className="mt-10 flex items-center justify-between gap-4 text-sm" data-ui-font>
      {prevPage ? (
        <Link
          className="rounded-full border border-slate-200/70 bg-white/80 px-5 py-2 font-semibold text-slate-900 shadow-sm shadow-slate-200/40"
          href={buildUrl(basePath, prevPage, query)}
        >
          Previous
        </Link>
      ) : (
        <span className="rounded-full border border-slate-200/40 px-5 py-2 text-slate-400">
          Previous
        </span>
      )}
      <span className="text-slate-500">
        Page {page} of {totalPages}
      </span>
      {nextPage ? (
        <Link
          className="rounded-full border border-slate-200/70 bg-white/80 px-5 py-2 font-semibold text-slate-900 shadow-sm shadow-slate-200/40"
          href={buildUrl(basePath, nextPage, query)}
        >
          Next
        </Link>
      ) : (
        <span className="rounded-full border border-slate-200/40 px-5 py-2 text-slate-400">
          Next
        </span>
      )}
    </nav>
  )
}
