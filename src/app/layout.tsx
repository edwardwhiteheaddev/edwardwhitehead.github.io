import { AppShellWrapper } from "@/components/AppShellWrapper";
import { Footer } from "@/components/Footer";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import type { Metadata } from 'next';
import { Inter, Lora } from 'next/font/google';
import React from "react";
import { theme } from "../theme";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });

export const metadata: Metadata = {
  metadataBase: new URL('https://edwardwhitehead.github.io'),
  title: "Edward Whitehead | Seasoned Software Developer",
  description: "Personal resume website for Edward Whitehead, a software developer specializing in AI, web, and mobile projects.",
  openGraph: {
    title: "Edward Whitehead | Seasoned Software Developer",
    description: "An experienced software developer focused on AI, web, mobile, and leadership.",
    url: 'https://edwardwhitehead.github.io',
    siteName: 'Edward Whitehead Portfolio',
    images: [{ url: '/og-banner.png', width: 1200, height: 630, },],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Edward Whitehead | Seasoned Software Developer',
    description: 'An experienced software developer focused on AI, web, mobile, and leadership.',
    images: ['/og-banner.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`} suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <AppShellWrapper>{children}</AppShellWrapper>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
