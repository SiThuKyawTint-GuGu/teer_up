import { fontSans } from "@/app/fonts";
import "@/styles/drawer.css";
import "@/styles/globals.css";
import "@radix-ui/themes/styles.css";
import { ServerThemeProvider } from "@wits/next-themes";
import type { Metadata } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "TeeUP",
  description: "TeeUP Web App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ServerThemeProvider>
      <html lang="en" className={fontSans.className}>
        <head />
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ServerThemeProvider>
  );
}
