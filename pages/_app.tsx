import 'reflect-metadata'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Layout from '@/components/layout'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-PJ6YMGQWSR" />
      <Script id="google-analytics">
        {
          `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-PJ6YMGQWSR');
          `
        }
      </Script>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}
