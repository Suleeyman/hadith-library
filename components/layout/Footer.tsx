import { getUiStrings, type Locale } from "@/lib/i18n";
import Link from "next/link";
import FlexContainer from "../template/FlexContainer";

type Props = {
  locale: Locale;
};

export default function Footer({ locale }: Props) {
  const t = getUiStrings(locale);

  return (
    <footer className="text-[14px] py-3 border-t border-border/70 bg-card/70">
      <FlexContainer wrap={true}>
        <span data-ui-font className="flex items-center gap-1">
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
          <span>{t.appName}</span>
        </span>
        <span className="flex items-center">
          Made with ♥️ here
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Suleeyman/hadith-library"
            className="underline underline-offset-2 inline-block mx-[.5ch]"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 128 128"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M56.7937 84.9688C44.4187 83.4688 35.7 74.5625 35.7 63.0313C35.7 58.3438 37.3875 53.2813 40.2 49.9063C38.9812 46.8125 39.1687 40.25 40.575 37.5313C44.325 37.0625 49.3875 39.0313 52.3875 41.75C55.95 40.625 59.7 40.0625 64.2937 40.0625C68.8875 40.0625 72.6375 40.625 76.0125 41.6563C78.9187 39.0313 84.075 37.0625 87.825 37.5313C89.1375 40.0625 89.325 46.625 88.1062 49.8125C91.1062 53.375 92.7 58.1563 92.7 63.0313C92.7 74.5625 83.9812 83.2813 71.4187 84.875C74.6062 86.9375 76.7625 91.4375 76.7625 96.5938L76.7625 106.344C76.7625 109.156 79.1062 110.75 81.9187 109.625C98.8875 103.156 112.2 86.1875 112.2 65.1875C112.2 38.6563 90.6375 17 64.1062 17C37.575 17 16.2 38.6562 16.2 65.1875C16.2 86 29.4187 103.25 47.2312 109.719C49.7625 110.656 52.2 108.969 52.2 106.438L52.2 98.9375C50.8875 99.5 49.2 99.875 47.7 99.875C41.5125 99.875 37.8562 96.5 35.2312 90.2188C34.2 87.6875 33.075 86.1875 30.9187 85.9063C29.7937 85.8125 29.4187 85.3438 29.4187 84.7813C29.4187 83.6563 31.2937 82.8125 33.1687 82.8125C35.8875 82.8125 38.2312 84.5 40.6687 87.9688C42.5437 90.6875 44.5125 91.9063 46.8562 91.9063C49.2 91.9063 50.7 91.0625 52.8562 88.9063C54.45 87.3125 55.6687 85.9063 56.7937 84.9688Z"
                fill="currentColor"
              />
            </svg>
          </Link>
        </span>
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
