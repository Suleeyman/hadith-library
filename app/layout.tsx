import { defaultLocale } from "@/lib/i18n";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Manrope, Noto_Naskh_Arabic, Source_Serif_4 } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const serif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

const ui = Manrope({
  variable: "--font-ui",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

const arabic = Noto_Naskh_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hadith Library",
  description: "A multilingual, reading-first hadith experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={defaultLocale}
      className={`${serif.variable} ${ui.variable} ${arabic.variable} h-full antialiased`}
      data-theme="winter"
    >
      <head>
        {process.env.NODE_ENV === "production" && (
          <>
            <script
              defer
              src="https://cloud.umami.is/script.js"
              data-website-id="cda9281c-338f-43df-a55f-1c625290a53f"
            ></script>
            <script
              defer
              src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"
            ></script>
            <Script id="pp-script" strategy="afterInteractive">
              {`
                kofiWidgetOverlay.draw('ysuleyman', {
                  'type': 'floating-chat',
                  'floating-chat.donateButton.text': 'Support me',
                  'floating-chat.donateButton.background-color': '#00b9fe',
                  'floating-chat.donateButton.text-color': '#fff'
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-full">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
