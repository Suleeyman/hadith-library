"use client";

import { defaultLocale, locales, type Locale } from "@/lib/i18n";
import { usePathname, useRouter } from "next/navigation";
import type { ChangeEvent } from "react";

type Props = {
  currentLocale?: Locale;
};

export default function LanguageSwitcher({ currentLocale }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const hasLocale = locales.includes(segments[0] as Locale);
  const locale =
    currentLocale || (hasLocale ? (segments[0] as Locale) : defaultLocale);
  const rest = hasLocale ? segments.slice(1) : segments;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as Locale;
    const nextPath =
      rest.length > 0 ? `/${nextLocale}/${rest.join("/")}` : `/${nextLocale}`;
    router.push(nextPath);
  };

  return (
    <select
      aria-label="Language"
      value={locale}
      onChange={handleChange}
      className="select select-sm"
    >
      {locales.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
