import Card from "@/components/ui/Card";
import type { Edition } from "@/lib/api";
import { getLocalizedText, type Locale } from "@/lib/i18n";
import Link from "next/link";

type Props = {
  editions: Edition[];
  locale: Locale;
  booksLabel: string;
  hadithsLabel: string;
};

export default function EditionGrid({
  editions,
  locale,
  booksLabel,
  hadithsLabel,
}: Props) {
  return (
    <div className="grid gap-6">
      {editions
        .sort((a, b) => b.hadithCount - a.hadithCount)
        .map((edition) => {
          const text = getLocalizedText(edition.name, locale);

          return (
            <Link
              key={edition._id}
              href={`/${locale}/edition/${edition.slug}`}
              className="group"
            >
              <Card className="transition hover:-translate-y-1 p-6">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <span>
                    {edition.bookCount} {booksLabel}
                  </span>
                  <span>
                    {edition.hadithCount} {hadithsLabel}
                  </span>
                </div>
                <div className="flex justify-between flex-wrap gap-1.5">
                  <h2 className="mt-4 text-2xl font-semibold text-foreground group-hover:text-secondary">
                    {text}
                  </h2>
                  {(locale !== "ar" && locale !== "ur") && (
                    <h2 className="mt-4 text-2xl font-semibold ml-auto text-foreground group-hover:text-secondary">
                      {edition.name.ar}
                    </h2>
                  )}
                </div>
              </Card>
            </Link>
          );
        })}
    </div>
  );
}
