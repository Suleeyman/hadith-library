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
        <input
          id="hadith-search"
          name="q"
          type="search"
          defaultValue={defaultValue}
          placeholder={t.searchButton}
          required
        />
      </label>
    </form>
  )
}
