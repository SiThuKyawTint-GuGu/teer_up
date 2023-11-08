import { JetBrains_Mono as FontMono, Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";

export const lFont = localFont({
  src: [
    {
      path: "../fonts/FSAlbertPro-Light.ttf",
      weight: "300",
    },
  ],
  variable: "--font-teeup",
});

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
