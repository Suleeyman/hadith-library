import type { Book } from "@/lib/api";
import { formatNumber, getLocalizedText, type Locale } from "@/lib/i18n";
import Link from "next/link";
import styles from "./BookGrid.module.css";

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
}: Props) {
  return (
    <ul className={`${styles.bookList} border border-base-300 border-solid rounded-xl overflow-hidden`}>
      {books.map((book) => (
        <li key={book._id} className={`${styles.bookItem} border-solid border-b border-b-base-300`}>
          <Link
            key={book._id}
            href={`/${locale}/book/${slug}/${book.bookIndex}`}
            className={`${styles.bookLink} hover:text-primary`}
          >
            <div className={`${styles.number}`}>{formatNumber(book.bookIndex, locale)}</div>

            <div className={`${styles.locale}`}>{getLocalizedText(book.name, locale)}</div>

            {locale !== "ar" && <div dir="rtl" className={`${styles.ar}`}>{book.name.ar}</div>}
          </Link>
          <div className={`${styles.range}`}>
            <span>{formatNumber(book.hadithIndexStart, locale)}</span>
            <span > — </span>
            <span>{formatNumber(book.hadithIndexStart + book.hadithCount - 1, locale)}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
