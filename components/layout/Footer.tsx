import { getUiStrings, type Locale } from "@/lib/i18n";
import Link from "next/link";
import FlexContainer from "../template/FlexContainer";

type Props = {
  locale: Locale;
};

export default function Footer({ locale }: Props) {
  const t = getUiStrings(locale);

  return (
    <footer className="py-6 border-t border-border/70 bg-card/70">
      <FlexContainer>
        <span data-ui-font>{t.appName}</span>
        <span>
          Data served from the
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Suleeyman/hadith-rest-api"
            className="underline underline-offset-2 inline-block mx-[.5ch]"
          >
            hadislam.org
          </Link>
          API.
        </span>
      </FlexContainer>
    </footer>
  );
}
