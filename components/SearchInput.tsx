import { getUiStrings, type Locale } from '@/lib/i18n'

type Props = {
  locale: Locale
  action: string
  defaultValue?: string
}

export default function SearchInput({ locale, action, defaultValue }: Props) {
  const t = getUiStrings(locale)

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row"
      action={action}
      data-ui-font
    >
      <label className="sr-only" htmlFor="hadith-search">
        {t.searchPlaceholder}
      </label>
      <input
        id="hadith-search"
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder={t.searchPlaceholder}
        className="flex-1 rounded-2xl border border-slate-200/80 bg-white/80 px-5 py-4 text-sm text-slate-900 shadow-sm shadow-slate-200/40 outline-none transition focus:border-amber-400/80 focus:ring-2 focus:ring-amber-200"
      />
      <button
        className="rounded-2xl bg-slate-900 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800"
        type="submit"
      >
        {t.searchButton}
      </button>
    </form>
  )
}
