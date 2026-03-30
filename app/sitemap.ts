import { getBooksByEdition, getEditions } from "@/lib/api";
import { locales } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `${siteUrl}/${locale}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    });
    entries.push({
      url: `${siteUrl}/${locale}/search`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.4,
    });
  }

  let editions;
  try {
    editions = await getEditions("*");
  } catch {
    return entries;
  }

  for (const edition of editions) {
    const availableLanguages = Object.values(edition.availableLanguages).filter(
      (lg) => lg !== "ar-diacritics",
    );

    for (const locale of availableLanguages) {
      entries.push({
        url: `${siteUrl}/${locale}/edition/${edition.slug}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }

    let books;
    try {
      books = await getBooksByEdition(edition.slug, "*");
    } catch {
      continue;
    }

    for (const book of books) {
      for (const locale of availableLanguages) {
        entries.push({
          url: `${siteUrl}/${locale}/book/${edition.slug}/${book.bookIndex}`,
          lastModified,
          changeFrequency: "weekly",
          priority: 0.6,
        });
      }
    }
  }

  return entries;
}
