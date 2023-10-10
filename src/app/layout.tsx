import type { Metadata } from 'next';

import PageLayout from '@/components/layout';
import { fontSans } from '@/configs/fonts';
import StoreProvider from '@/providers/store';
import { ThemeProvider } from '@/providers/theme';
import { Theme } from '@radix-ui/themes';
import { ServerThemeProvider } from '@wits/next-themes';

import '@/styles/globals.css';
import '@/styles/drawer.css';

export const metadata: Metadata = {
  title: 'TEE-UP',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ServerThemeProvider>
      <html lang="en" className={fontSans.className}>
        <head />
        <body>
          <StoreProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
              <Theme>
                <PageLayout>{children}</PageLayout>
              </Theme>
            </ThemeProvider>
          </StoreProvider>
        </body>
      </html>
    </ServerThemeProvider>
  );
}
