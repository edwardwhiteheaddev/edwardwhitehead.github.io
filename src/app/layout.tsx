import { KyrosFooter } from '@/components/kyros/Footer';
import { KyrosNavbar } from '@/components/kyros/Navbar';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import "@mantine/core/styles.css";
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { Viewport } from 'next';
import { Roboto, Saira } from 'next/font/google';
import React from 'react';
import { theme } from '../theme';
import './globals.scss';

const saira = Saira({ subsets: ['latin'], variable: '--font-saira', weight: ['400', '500', '600', '700', '800'] });
const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto', weight: ['300', '400', '500', '700'] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  minimumScale: 1,
  themeColor: {
    color: "#000000",
    media: "(prefers-color-scheme: dark)"
  },
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${saira.variable} ${roboto.variable}`} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <ColorSchemeScript />
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
