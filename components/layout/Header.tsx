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
        <div className="navbar-start">
          <Link
            href={`/${locale}`}
            className="text-2xl font-semibold text-foreground"
            data-ui-font
          >
            {t.appName}
          </Link>
        </div>
        <SearchInput
          locale={locale}
          action={`/${locale}/search`}
          className="navbar-center"
        />
        <div className="navbar-end">
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
