import { KyrosFooter } from '@/components/kyros/Footer';
import { KyrosNavbar } from '@/components/kyros/Navbar';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import "@mantine/core/styles.css";
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { Metadata } from 'next';
import { Roboto, Saira } from 'next/font/google';
import React from 'react';
import { theme } from '../theme';
import './globals.scss';

const saira = Saira({ subsets: ['latin'], variable: '--font-saira', weight: ['400', '500', '600', '700', '800'] });
const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto', weight: ['300', '400', '500', '700'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://edwardwhitehead.github.io'),
  title: "Edward Whitehead | Seasoned Software Developer",
  description: "Personal resume website for Edward Whitehead, a software developer specializing in AI, web, and mobile projects.",
  openGraph: {
    title: "Edward Whitehead | Seasoned Software Developer",
    description: "An experienced software developer focused on AI, web, mobile, and leadership.",
    url: 'https://edwardwhitehead.github.io',
    siteName: 'Edward Whitehead Portfolio',
    images: [{
      url: '/assets/the-comeback-build-og-image.png',
      alt: 'Edward Whitehead | Seasoned Software Developer',
      width: 1200,
      height: 630
    }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Edward Whitehead | Seasoned Software Developer',
    description: 'An experienced software developer focused on AI, web, mobile, and leadership.',
    images: ['/assets/the-comeback-build-og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${saira.variable} ${roboto.variable}`} suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          integrity="sha512-SfTiTlX6kk+qitfevl/7LibUOeJWlt9rbyDn92a1DqWOw9vWG2MFoays0sgObmWazO5BQPiFucnnEAjpAB+/Sw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          precedence='preload'
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <KyrosNavbar />
          <main style={{ minHeight: '100vh', paddingTop: '120px' }}>{children}</main>
          <KyrosFooter />
        </MantineProvider>
      </body>
    </html>
  );
}
