import { type Locale } from "./i18n";

export type Carry = "exclude" | "include";

export type Language =
  | "ar"
  | "ru"
  | "ar-diacritics"
  | "en"
  | "fr"
  | "tr"
  | "ur"
  | "id"
  | "bn"
  | "ta";

export type Edition = {
  _id: string;
  availableLanguages: Record<Language, string>;
  name: Record<Language, string>;
  slug: string;
  hadithCount: number;
  bookCount: number;
};

export type EditionWithBooks = Edition & {
  books: Book[];
};

export type Book = {
  _id: string;
  editionId: string;
  name: Record<Language, string>;
  bookIndex: number;
  hadithCount: number;
  hadithIndexStart: number;
};

export type BookWithEdition = Book & {
  edition: Edition;
};

export type Grade = {
  name: string;
  grade: string;
};

export type Hadith = {
  _id: string;
  editionId: string;
  bookIndex: number;
  hadithIndex: number;
  hadithIndexMinor: number | null;
  bookHadithIndex: number;
  text: Record<Language, string>;
  grades: Grade[];
};

export type HadithWithVariants = Hadith & {
  variants?: Hadith[] | null;
};

export type HadithSearchItem = Hadith & {
  score: number;
};

export type PaginatedResponse<T> = {
  total: number;
  page: number;
  page_size: number;
  items: T[];
};

export type ErrorResponse = {
  code: number;
  message: string;
  details?: Record<string, string> | string | null;
};

export class ApiError extends Error {
  status: number;
  info?: ErrorResponse;

  constructor(status: number, message: string, info?: ErrorResponse) {
    super(message);
    this.status = status;
    this.info = info;
  }
}

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.API_BASE_URL ||
  ""
).replace(/\/$/, "");

const REVALIDATE_SECONDS = 3600;

type QueryValue = string[] | string | number | boolean | null | undefined;
type QueryKey =
  | "available"
  | "lang"
  | "page_size"
  | "page"
  | "edition"
  | "q"
  | "search_lang";

type Query = Partial<Record<QueryKey, QueryValue>>;

function buildUrl(path: string, query?: Query) {
  if (!API_BASE_URL && !path.startsWith("http")) {
    throw new Error(
      "API base URL is not configured. Set API_BASE_URL or NEXT_PUBLIC_API_BASE_URL.",
    );
  }
  const url = path.startsWith("http")
    ? new URL(path)
    : new URL(path, API_BASE_URL);

  if (!query) return url.toString();
  for (const [key, value] of Object.entries(query)) {
    console.log([key, value]);
    if (value === undefined || value === null) continue;

    if (!Array.isArray(value)) {
      url.searchParams.set(key, value.toString());
      continue;
    }

    for (const v of value) {
      if (v) {
        url.searchParams.append(key, v.toString());
      }
    }
  }

  return url.toString();
}

async function fetchJson<T>(path: string, query?: Query) {
  const url = buildUrl(path, query);
  console.log("I'm going to call with that url : ", url);
  const response = await fetch(buildUrl(path, query), {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (response.ok) {
    return (await response.json()) as T;
  }

  let info: ErrorResponse | undefined;
  try {
    info = (await response.json()) as ErrorResponse;
  } catch {
    info = undefined;
  }

  const message = info?.message || `Request failed with ${response.status}`;
  throw new ApiError(response.status, message, info);
}

type LangOptions = {
  lang?: Locale;
  arabic?: Carry;
  arabic_diacritics?: Carry;
};

function withLang(options: LangOptions = {}): Language[] {
  const langs: Language[] = [];

  if (options.lang) {
    langs.push(options.lang);
  }

  if (options.arabic === "include") {
    langs.push("ar");
  }

  if (options.arabic_diacritics === "include") {
    langs.push("ar-diacritics");
  }

  return langs;
}

export async function getEditions(
  lang: Locale | "*",
  availableLanguage?: Locale,
) {
  return fetchJson<Edition[]>("/editions", {
    available: availableLanguage,
    lang: lang === "*" ? "*" : [lang, "en", "ar"],
  });
}

export async function getEdition(slug: string, lang: Locale) {
  return fetchJson<EditionWithBooks>(`/editions/${slug}`, {
    lang: [lang, "en", "ar"],
  });
}

export async function getBooksByEdition(slug: string, lang: Locale | "*") {
  return fetchJson<Book[]>(`/editions/${slug}/books`, {
    lang,
  });
}

export async function getBook(slug: string, bookIndex: number, lang: Locale) {
  return fetchJson<BookWithEdition>(`/editions/${slug}/books/${bookIndex}`, {
    lang: [lang, "en"],
  });
}

export async function getHadith(id: string, options: LangOptions) {
  return fetchJson<Hadith>(`/hadiths/${id}`, {
    lang: withLang(options),
  });
}

export async function getHadithsByEdition(
  slug: string,
  options: LangOptions & { page?: number; page_size?: number } = {},
) {
  return fetchJson<PaginatedResponse<Hadith>>(`/editions/${slug}/hadiths`, {
    page: options.page,
    page_size: options.page_size,
    lang: withLang(options),
  });
}

export async function getHadithsByBook(
  slug: string,
  bookIndex: number,
  options: LangOptions & { page?: number; page_size?: number } = {},
) {
  return fetchJson<PaginatedResponse<Hadith>>(
    `/editions/${slug}/books/${bookIndex}/hadiths`,
    {
      page: options.page,
      page_size: options.page_size,
      lang: withLang(options),
    },
  );
}

export async function searchHadiths(
  query: string,
  options: LangOptions & { page?: number; page_size?: number } = {},
) {
  return fetchJson<PaginatedResponse<HadithSearchItem>>("/hadiths/search", {
    q: query,
    page: options.page,
    page_size: options.page_size,
    lang: withLang(options),
    search_lang: options.lang,
  });
}
