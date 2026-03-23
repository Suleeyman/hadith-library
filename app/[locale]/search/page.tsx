import Breadcrumbs, { Breadcrumb } from "@/components/layout/Breadcrumbs";
import HadithList from "@/components/sections/HadithList";
import PageHeader from "@/components/ui/PageHeader";
import Pagination from "@/components/ui/Pagination";
import { ApiError, HadithSearchItem, PaginatedResponse, searchHadiths } from "@/lib/api";
import { getUiStrings, isLocale } from "@/lib/i18n";
import { parseArabicDiacritics, parsePage, parseQuery } from "@/lib/query";
import { notFound } from "next/navigation";

const PAGE_SIZE = 10;
const BREADCRUMB: Breadcrumb = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Search",
    href: "",
  },
];

export const revalidate = 3600;

export default async function SearchPage(props: PageProps<"/[locale]/search">) {
  const { locale } = await props.params;

  if (!isLocale(locale)) notFound();

  const t = getUiStrings(locale);
  const searchParams = await props.searchParams;
  const query = parseQuery(searchParams?.q);
  const page = parsePage(searchParams?.page);
  const arabic = parseArabicDiacritics(searchParams?.arabic_diacritics);

  if (!query) {
    return (
      <>
        <Breadcrumbs crumbs={BREADCRUMB} />
        <section className="space-y-10">
          <div className="space-y-4">
            <PageHeader title={t.searchPlaceholder} />
          </div>
        </section>
      </>
    );
  }

  let results!: PaginatedResponse<HadithSearchItem>;
  try {
    results = await searchHadiths(query, {
      lang: locale,
      page,
      page_size: PAGE_SIZE,
      arabic_diacritics: arabic.param,
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  const subtitle = (results.total === 100 ? "100+" : results.total.toString()) + " — " + query;

  return (
    <>
      <Breadcrumbs crumbs={BREADCRUMB} />
      <section className="space-y-10">
        <div className="space-y-4">
          <PageHeader title={t.searchPlaceholder} subtitle={subtitle} />
        </div>

        {!query ? (
          <p className="text-sm text-muted-foreground">{t.searchPrompt}</p>
        ) : results && results.items.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t.noResults}</p>
        ) : (
          <div className="space-y-6">
            {results ? (
              <HadithList
                items={results.items}
                locale={locale}
                showArabic={arabic.enabled}
              />
            ) : null}
            {results ? (
              <Pagination
                page={results.page}
                pageSize={results.page_size}
                total={results.total}
                basePath={`/${locale}/search`}
                query={{
                  q: query,
                  arabic_diacritics: arabic.enabled ? "include" : undefined,
                }}
              />
            ) : null}
          </div>
        )}
      </section>
    </>
  );
}
