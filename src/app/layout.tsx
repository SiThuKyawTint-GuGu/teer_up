import type { Metadata } from 'next';

import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { fontSans } from '@/configs/fonts';
import { ServerThemeProvider } from '@wits/next-themes';

import '@/styles/globals.css';

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
          <Header />
          <Sidebar />
          {children}
        </body>
      </html>
    </ServerThemeProvider>
  );
}
