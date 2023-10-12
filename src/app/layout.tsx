import type { Metadata } from 'next';

import { fontSans } from '@/configs/fonts';
import StoreProvider from '@/providers/store';
import { ThemeProvider } from '@/providers/theme';
import { Theme } from '@radix-ui/themes';
import { ServerThemeProvider } from '@wits/next-themes';

import '@/styles/globals.css';
import '@/styles/drawer.css';

export const metadata: Metadata = {
  title: 'Create Next App',
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
                {/* <Suspense fallback={<Loading />}>{children}</Suspense> */}
                {children}
              </Theme>
            </ThemeProvider>
          </StoreProvider>
        </body>
      </html>
    </ServerThemeProvider>
  );
}
