import { lFont } from "@/app/fonts";
import "@/styles/drawer.css";
import "@/styles/globals.css";
import "@/styles/theme.config.css";
import "@radix-ui/themes/styles.css";
import { ServerThemeProvider } from "@wits/next-themes";
import type { Metadata } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "TEE-UP",
  description: "TeeUP Web App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ServerThemeProvider>
      <html lang="en" className={lFont.className}>
        <head>
          <link rel="icon" href="/teeUpLogo.svg" />
        </head>
        <body className="bg-layout">
          <Providers>{children}</Providers>
        </body>
      </html>
    </ServerThemeProvider>
  );
}
