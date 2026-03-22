import { localeToApiLang, type Locale } from "./i18n";

export type Carry = "exclude" | "include";

export type Language =
  | "ar"
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
  name: Record<string, string>;
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
  name: Record<string, string>;
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
  text: Record<string, string>;
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

type QueryValue = string | number | boolean | null | undefined;

type Query = Record<string, QueryValue>;

function buildUrl(path: string, query?: Query) {
  if (!API_BASE_URL && !path.startsWith("http")) {
    throw new Error(
      "API base URL is not configured. Set API_BASE_URL or NEXT_PUBLIC_API_BASE_URL.",
    );
  }
  const url = path.startsWith("http")
    ? new URL(path)
    : new URL(path, API_BASE_URL);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null) continue;
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

async function fetchJson<T>(path: string, query?: Query) {
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

function withLang(options: LangOptions = {}) {
  const lang = options.lang ? localeToApiLang(options.lang) : undefined;
  return {
    lang,
    arabic: options.arabic,
    arabic_diacritics: options.arabic_diacritics,
  };
}

export async function getEditions() {
  return fetchJson<Edition[]>("/editions/");
}

export async function getEdition(slug: string) {
  return fetchJson<EditionWithBooks>(`/editions/${slug}`);
}

export async function getBooksByEdition(slug: string) {
  return fetchJson<Book[]>(`/editions/${slug}/books`);
}

export async function getBook(slug: string, bookIndex: number) {
  return fetchJson<BookWithEdition>(`/editions/${slug}/books/${bookIndex}`);
}

export async function getHadith(id: string, options: LangOptions = {}) {
  return fetchJson<Hadith>(`/hadiths/${id}`, withLang(options));
}

export async function getHadithsByEdition(
  slug: string,
  options: LangOptions & { page?: number; page_size?: number } = {},
) {
  return fetchJson<PaginatedResponse<Hadith>>(`/editions/${slug}/hadiths`, {
    page: options.page,
    page_size: options.page_size,
    ...withLang(options),
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
      ...withLang(options),
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
    ...withLang(options),
  });
}
