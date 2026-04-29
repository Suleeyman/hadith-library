import type {
  Book,
  BookWithEdition,
  Edition,
  Hadith,
  HadithSearchItem,
} from "@/lib/api";
import { getLocalizedText, getUiStrings, type Locale } from "@/lib/i18n";
import Link from "next/link";
import styles from "./HadithList.module.css";

type HadithListProps = {
  items: Array<Hadith | HadithSearchItem>;
  locale: Locale;
  book?: BookWithEdition;
  showArabic?: boolean;
};

export default function HadithList({ items, book, locale }: HadithListProps) {
  return (
    <div className={`${styles.hadithList}`}>
      {items.map((hadith) => (
        <HadithCard
          key={hadith._id}
          hadith={hadith}
          locale={locale}
          book={book ? book : "book" in hadith ? hadith.book : undefined}
          edition={book && book.edition ? book.edition : ("edition" in hadith ? hadith.edition : undefined)}
        />
      ))}
    </div>
  );
}

type HadithProps = {
  hadith: Hadith | HadithSearchItem;
  locale: Locale;
  book?: Book;
  edition?: Edition;
  showArabic?: boolean;
};

function HadithCard({ hadith, locale, book, edition }: HadithProps) {
  const t = getUiStrings(locale);
  const text = getLocalizedText(hadith.text, locale);
  let arabicText = null;
  if (locale !== "ar") {
    arabicText = hadith.text.ar || hadith.text["ar-diacritics"] || null;
  }
  const arabicSnippet = arabicText ?? null;
  const indexLabel = `${hadith.hadithIndex}${
    hadith.hadithIndexMinor ? `.${hadith.hadithIndexMinor}` : ""
  }`;
  const grade = hadith.grades?.[0];
  return (
    <div
      className={`${styles.hadithCard} p-6 card card-border bg-base-100 shadow-md`}
    >
      <div
        className={`${styles.meta} flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground`}
      >
        <span className={`${styles.bookLink}`}>
          {t.bookLabel}{" "}
          {edition && book && (
            <>
              <Link
                className="text-accent"
                href={`/${locale}/book/${edition.slug}/${book.bookIndex}`}
              >
                {hadith.bookIndex} ({getLocalizedText(book.name, locale)})
              </Link>{" "}
              • {hadith.bookHadithIndex}
            </>
          )}
        </span>
        <span className={`${styles.editionLink}`}>
          {edition && (
            <>
              <Link
                className="text-accent"
                href={`/${locale}/edition/${edition.slug}`}
              >
                {getLocalizedText(edition.name, locale)}
              </Link>{" "}
              — {indexLabel}
            </>
          )}
        </span>
      </div>
      <div className={`${styles.texts} mt-4 space-y-4`}>
        <p
          className={`${styles.locale} text-lg leading-relaxed text-foreground`}
        >
          {text}
        </p>
        {arabicSnippet && (
          <p
            className={`${styles.ar} text-arabic text-xl leading-relaxed text-foreground`}
            dir="rtl"
            lang="ar"
          >
            {arabicSnippet}
          </p>
        )}
      </div>
      {grade && (
        <div className="mt-4 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{grade.name}:</span>{" "}
          {grade.grade}
        </div>
      )}
      <Link
        className={`${styles.link} text-sm font-semibold text-foreground underline decoration-secondary/70 underline-offset-4 hover:text-foreground/80`}
        href={`/${locale}/hadith/${hadith._id}`}
      >
        {t.readHadith}
      </Link>
    </div>
  );
}
