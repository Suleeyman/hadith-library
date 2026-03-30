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
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="text-xl flex font-semibold text-foreground items-center gap-1"
            data-ui-font
          >
            <svg
              className="h-[1em]"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#a)">
                <path
                  d="M40.709 44.21H10.226a2.65 2.65 0 0 1 0-5.301h30.483z"
                  fill="#f9ebb2"
                />
                <path
                  d="M7.575 5.776v32.826a3.96 3.96 0 0 1 2.65-1.018h1.326V4.45h-2.65c-.732 0-1.326.594-1.326 1.326M40.709 4.45H12.877v33.134h29.157V5.776c0-.732-.594-1.326-1.325-1.326"
                  fill="#45aab8"
                />
                <path
                  d="M43.36 37.584V5.776a2.65 2.65 0 0 0-2.651-2.651H8.9a2.65 2.65 0 0 0-2.651 2.65V41.56a3.977 3.977 0 0 0 3.976 3.976h32.47a.662.662 0 1 0 0-1.326h-.662v-5.3c.732 0 1.325-.594 1.325-1.325M7.574 5.776c0-.732.594-1.326 1.326-1.326h2.65v33.134h-1.325c-1.02 0-1.947.387-2.65 1.018zM40.71 44.21H10.226a2.65 2.65 0 0 1 0-5.301h30.483zm-27.832-6.626V4.45H40.71c.731 0 1.325.594 1.325 1.326v31.808z"
                  fill="#394240"
                />
                <path
                  d="M32.094 20.354H18.841a.662.662 0 1 0 0 1.326h13.253a.662.662 0 1 0 0-1.326m3.976-3.976H18.84a.662.662 0 1 0 0 1.326h17.23a.662.662 0 1 0 0-1.326m-17.23-2.65h7.953a.662.662 0 1 0 0-1.326H18.84a.662.662 0 1 0 0 1.326"
                  fill="#394240"
                />
                <path
                  opacity=".2"
                  d="M7.575 5.776v32.826a3.96 3.96 0 0 1 2.65-1.018h1.326V4.45h-2.65c-.732 0-1.326.594-1.326 1.326"
                  fill="#231f20"
                />
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M6.25 3.125h37.109v42.411H6.25z" />
                </clipPath>
              </defs>
            </svg>
            <span className="hidden lg:flex">{t.appName}</span>
          </Link>
        </div>

        {/* CENTER (hidden on mobile) */}
        <div className="navbar-center">
          <SearchInput locale={locale} action={`/${locale}/search`} />
        </div>

        {/* Mobile menu button */}
        <div className="dropdown md:hidden">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>{" "}
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-1 p-2 right-0 shadow-xl bg-base-100 rounded-box w-52"
          >
            <li className="my-1 md:my-0">
              <Link href={`/${locale}`}>{t.editionsTitle}</Link>
            </li>
            <li className="my-1 md:my-0">
              <LanguageSwitcher currentLocale={locale} />
            </li>
          </ul>
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
