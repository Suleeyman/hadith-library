import { Language } from "./api";

export const locales = [
  "en",
  "fr",
  "ar",
  "ru",
  "id",
  "tr",
  "ur",
  "bn",
  "ta",
] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const rtlLocales: Locale[] = ["ar", "ur"];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function isRtl(locale: string) {
  return rtlLocales.includes(locale as Locale);
}

const uiStrings: Record<
  Locale,
  {
    appName: string;
    appTagline: string;
    searchPlaceholder: string;
    searchButton: string;
    editionsTitle: string;
    booksTitle: string;
    hadithsTitle: string;
    gradesTitle: string;
    readHadith: string;
    bookLabel: string;
    noResults: string;
    searchPrompt: string;
  }
> = {
  en: {
    appName: "Hadith Library",
    appTagline:
      "A multilingual, reading-first collection of prophetic traditions.",
    searchPlaceholder: "Search hadiths, narrators, or keywords",
    searchButton: "Search",
    editionsTitle: "Editions",
    booksTitle: "Books",
    hadithsTitle: "Hadiths",
    gradesTitle: "Grades",
    readHadith: "Read hadith",
    bookLabel: "Book",
    noResults: "No results found.",
    searchPrompt: "Start by entering a search query above.",
  },
  fr: {
    appName: "Bibliothèque de Hadith",
    appTagline: "Une collection multilingue pour une lecture claire et calme.",
    searchPlaceholder: "Rechercher un hadith, un narrateur, un mot-clé",
    searchButton: "Rechercher",
    editionsTitle: "Éditions",
    booksTitle: "Livres",
    hadithsTitle: "Hadiths",
    gradesTitle: "Authenticité",
    readHadith: "Lire le hadith",
    bookLabel: "Livre",
    noResults: "Aucun résultat.",
    searchPrompt: "Commencez par saisir une recherche ci-dessus.",
  },
  ar: {
    appName: "مكتبة الحديث",
    appTagline: "مجموعة متعددة اللغات لقراءة هادئة وواضحة.",
    searchPlaceholder: "ابحث في الأحاديث أو الرواة أو الكلمات المفتاحية",
    searchButton: "بحث",
    editionsTitle: "المصادر",
    booksTitle: "الكتب",
    hadithsTitle: "الأحاديث",
    gradesTitle: "الدرجات",
    readHadith: "قراءة الحديث",
    bookLabel: "كتاب",
    noResults: "لا توجد نتائج.",
    searchPrompt: "ابدأ بإدخال عبارة البحث أعلاه.",
  },
  ru: {
    appName: "Библиотека Хадисов",
    appTagline: "Многоязычная коллекция для спокойного чтения.",
    searchPlaceholder: "Поиск хадисов, рассказчиков или ключевых слов",
    searchButton: "Поиск",
    editionsTitle: "Сборники",
    booksTitle: "Книги",
    hadithsTitle: "Хадисы",
    gradesTitle: "Оценки",
    readHadith: "Читать хадис",
    bookLabel: "Книга",
    noResults: "Ничего не найдено.",
    searchPrompt: "Начните с поискового запроса выше.",
  },
  id: {
    appName: "Perpustakaan Hadis",
    appTagline: "Koleksi multibahasa untuk membaca dengan tenang.",
    searchPlaceholder: "Cari hadis, perawi, atau kata kunci",
    searchButton: "Cari",
    editionsTitle: "Edisi",
    booksTitle: "Kitab",
    hadithsTitle: "Hadis",
    gradesTitle: "Derajat",
    readHadith: "Baca hadis",
    bookLabel: "Kitab",
    noResults: "Tidak ada hasil.",
    searchPrompt: "Mulai dengan memasukkan kata kunci di atas.",
  },
  tr: {
    appName: "Hadis Kütüphanesi",
    appTagline:
      "Peygamberî rivayetlerin çok dilli, okumaya odaklı bir koleksiyonu.",
    searchPlaceholder: "Hadisleri, ravileri veya anahtar kelimeleri ara",
    searchButton: "Ara",
    editionsTitle: "Baskılar",
    booksTitle: "Kitap",
    hadithsTitle: "Hadis",
    gradesTitle: "Dereceler",
    readHadith: "Hadisi oku",
    bookLabel: "Kitap",
    noResults: "Sonuç bulunamadı.",
    searchPrompt: "Başlamak için yukarıya bir arama sorgusu girin.",
  },
  bn: {
    appName: "হাদিস লাইব্রেরি",
    appTagline: "নবীজির বাণীর একটি বহুভাষিক, পাঠকেন্দ্রিক সংগ্রহ।",
    searchPlaceholder: "হাদিস, বর্ণনাকারী বা কীওয়ার্ড অনুসন্ধান করুন",
    searchButton: "অনুসন্ধান",
    editionsTitle: "সংস্করণসমূহ",
    booksTitle: "বইসমূহ",
    hadithsTitle: "হাদিসসমূহ",
    gradesTitle: "মান নির্ধারণ",
    readHadith: "হাদিস পড়ুন",
    bookLabel: "বই",
    noResults: "কোন ফলাফল পাওয়া যায়নি।",
    searchPrompt: "শুরু করতে উপরে একটি অনুসন্ধান লিখুন।",
  },
  ta: {
    appName: "ஹதீஸ் நூலகம்",
    appTagline: "நபிமொழிகளின் பல மொழி, வாசிப்பை மையமாகக் கொண்ட தொகுப்பு.",
    searchPlaceholder: "ஹதீஸ், அறிவிப்பாளர் அல்லது முக்கிய சொற்களை தேடுங்கள்",
    searchButton: "தேடு",
    editionsTitle: "பதிப்புகள்",
    booksTitle: "நூல்கள்",
    hadithsTitle: "ஹதீஸ்கள்",
    gradesTitle: "தர நிர்ணயம்",
    readHadith: "ஹதீஸை வாசிக்க",
    bookLabel: "நூல்",
    noResults: "முடிவுகள் எதுவும் கிடைக்கவில்லை.",
    searchPrompt: "தொடங்க மேலே ஒரு தேடல் கேள்வியை உள்ளிடவும்.",
  },
  ur: {
    appName: "حدیث لائبریری",
    appTagline: "احادیث نبوی کا کثیر لسانی، مطالعہ پر مبنی مجموعہ۔",
    searchPlaceholder: "حدیث، راوی یا کلیدی الفاظ تلاش کریں",
    searchButton: "تلاش کریں",
    editionsTitle: "ایڈیشنز",
    booksTitle: "کتب",
    hadithsTitle: "احادیث",
    gradesTitle: "درجات",
    readHadith: "حدیث پڑھیں",
    bookLabel: "کتاب",
    noResults: "کوئی نتیجہ نہیں ملا۔",
    searchPrompt: "شروع کرنے کے لیے اوپر تلاش درج کریں۔",
  },
};

export function getUiStrings(locale: Locale) {
  return uiStrings[locale] ?? uiStrings.en;
}

export function getLocalizedText(
  text: Partial<Record<Language, string>> | null | undefined,
  locale: Locale,
) {
  if (!text) return "";
  if (text[locale]) return text[locale];
  if (text[defaultLocale]) return text[defaultLocale];
  const first = Object.values(text)[0];
  return first ?? "———";
}
