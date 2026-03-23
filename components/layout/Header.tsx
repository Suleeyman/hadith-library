import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getUiStrings, type Locale } from "@/lib/i18n";
import Link from "next/link";
import FlexContainer from "../template/FlexContainer";
import SearchInput from "../ui/SearchInput";

type Props = {
  locale: Locale;
};

export default function Header({ locale }: Props) {
  const t = getUiStrings(locale);

  return (
   <header className="navbar border-b border-border/70 bg-card/70 backdrop-blur">
  <FlexContainer>

    {/* LEFT */}
    <div className="navbar-start">
      {/* Mobile menu button */}
      <div className="dropdown md:hidden">
        <button className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
        </button>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-1 p-2 shadow-xl bg-base-100 rounded-box w-52"
        >
          <li className="my-1 md:my-0">
            <Link href={`/${locale}`}>{t.editionsTitle}</Link>
          </li>
          <li className="my-1 md:my-0">
            <LanguageSwitcher currentLocale={locale} />
          </li>
        </ul>
      </div>

      {/* Logo */}
      <Link
        href={`/${locale}`}
        className="text-xl hidden md:flex font-semibold text-foreground"
        data-ui-font
      >
        {t.appName}
      </Link>
    </div>

    {/* CENTER (hidden on mobile) */}
    <div className="navbar-center">
      <SearchInput
        locale={locale}
        action={`/${locale}/search`}
      />
    </div>

    {/* RIGHT (desktop only) */}
    <div className="navbar-end hidden md:flex">
      <ul className="menu menu-horizontal px-1 gap-2" data-ui-font>
        <li>
          <Link href={`/${locale}`}>{t.editionsTitle}</Link>
        </li>
        <li>
          <LanguageSwitcher currentLocale={locale} />
        </li>
      </ul>
    </div>

  </FlexContainer>
</header>
  );
}
