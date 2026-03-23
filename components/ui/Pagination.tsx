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
    <div className="mt-10 flex justify-center">
      <div className="join">
        {/* Previous */}
        {prevPage ? (
          <Link
            href={buildUrl(basePath, prevPage, query)}
            className="join-item btn btn-secondary"
          >
            «
          </Link>
        ) : (
          <button className="join-item btn btn-secondary btn-disabled">«</button>
        )}

        {/* Current page info */}
        <button className="join-item btn pointer-events-none">
          Page {page} of {totalPages}
        </button>

        {/* Next */}
        {nextPage ? (
          <Link
            href={buildUrl(basePath, nextPage, query)}
            className="join-item btn btn-secondary"
          >
            »
          </Link>
        ) : (
          <button className="join-item btn btn-secondary btn-disabled">»</button>
        )}
      </div>
    </div>
  )
}
