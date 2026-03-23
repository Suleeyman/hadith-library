import { getUiStrings, type Locale } from '@/lib/i18n'

type Props = {
  locale: Locale
  action: string
  defaultValue?: string
  hiddenParams?: Record<string, string | undefined>
  className?: string
}

export default function SearchInput({
  locale,
  action,
  defaultValue,
  hiddenParams,
  className
}: Props) {
  const t = getUiStrings(locale)

  return (
    <form
      className={`flex flex-col gap-3 sm:flex-row ${className}`}
      action={action}
      data-ui-font
    >
      {hiddenParams
        ? Object.entries(hiddenParams).map(([key, value]) =>
            value ? (
              <input key={key} type="hidden" name={key} value={value} />
            ) : null
          )
        : null}
      <label className="input" htmlFor="hadith-search">
        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          id="hadith-search"
          name="q"
          type="search"
          defaultValue={defaultValue}
          placeholder={t.searchButton}
          required
          className="md:w-72"
        />
      </label>
    </form>
  )
}
