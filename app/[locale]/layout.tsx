import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import AppContainer from '@/components/template/AppContainer'
import { isLocale, isRtl, locales } from '@/lib/i18n'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout(
  props: LayoutProps<'/[locale]'>
) {
  const { locale } = await props.params

  if (!isLocale(locale)) notFound()

  const dir = isRtl(locale) ? 'rtl' : 'ltr'

  return (
    <div
      lang={locale}
      dir={dir}
      className={
        (dir === 'rtl' ? 'min-h-screen text-right' : 'min-h-screen text-left') + " flex flex-col"
      }
    >
      <Header locale={locale} />
      <main className="py-6 grow">
        <AppContainer>
          {props.children}
        </AppContainer>
      </main>
      <Footer locale={locale} />
    </div>
  )
}
