import Card from "@/components/ui/Card";
import type { Book } from "@/lib/api";
import { getLocalizedText, type Locale } from "@/lib/i18n";
import Link from "next/link";

type Props = {
  books: Book[];
  locale: Locale;
  slug: string;
  booksLabel: string;
  hadithsLabel: string;
};

export default function BookGrid({
  books,
  locale,
  slug,
  booksLabel,
  hadithsLabel,
}: Props) {
  return (
    <div className="grid gap-5">
      {books.map((book) => (
        <Link
          key={book._id}
          href={`/${locale}/book/${slug}/${book.bookIndex}`}
          className="group"
        >
          <Card className="transition hover:-translate-y-1 p-5">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span>
                {booksLabel} {book.bookIndex}
              </span>
              <span>
                {book.hadithCount} {hadithsLabel}
              </span>
            </div>
            <div className='flex justify-between flex-wrap gap-1.5'>
                <h2 className="mt-4 text-2xl font-semibold text-foreground group-hover:text-secondary">
                  {getLocalizedText(book.name, locale)}
                </h2>
                <h2 className="mt-4 text-2xl font-semibold ml-auto text-foreground group-hover:text-secondary">
                  {book.name.ar}
                </h2>
              </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
