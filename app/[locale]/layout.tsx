import { getUiStrings, isLocale, isRtl, locales } from "@/lib/i18n";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout(props: LayoutProps<"/[locale]">) {
  const { locale } = await props.params;

  if (!isLocale(locale)) notFound();

  const t = getUiStrings(locale);
  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <div
      lang={locale}
      dir={dir}
      className={
        dir === "rtl" ? "min-h-screen text-right" : "min-h-screen text-left"
      }
    >
      <header className="border-b border-slate-200/60 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
          <div>
            <Link
              href={`/${locale}`}
              className="text-2xl font-semibold text-slate-900"
              data-ui-font
            >
              {t.appName}
            </Link>
            <p className="mt-1 max-w-xl text-sm text-slate-600">
              {t.appTagline}
            </p>
          </div>
          <nav
            className="flex flex-wrap items-center gap-3 text-sm"
            data-ui-font
          >
            <Link
              href={`/${locale}`}
              className="rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 font-semibold text-slate-900"
            >
              {t.editionsTitle}
            </Link>
            <Link
              href={`/${locale}/search`}
              className="rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 font-semibold text-slate-900"
            >
              {t.searchButton}
            </Link>
            <div className="flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/80 px-3 py-2">
              {locales.map((item) => (
                <Link
                  key={item}
                  href={`/${item}`}
                  className={
                    item === locale
                      ? "text-sm font-semibold uppercase text-slate-900"
                      : "text-xs uppercase tracking-[0.2em] text-slate-500"
                  }
                >
                  {item}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        {props.children}
      </main>
      <footer className="border-t border-slate-200/60 bg-white/70">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-xs text-slate-500">
          <span data-ui-font>{t.appName}</span>
          <span>
            Data served from the
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/Suleeyman/hadith-rest-api"
              className="underline underline-offset-2 inline-block mx-[.5ch]"
            >
               hadislam.org 
            </Link>
            API.
          </span>
        </div>
      </footer>
    </div>
  );
}
