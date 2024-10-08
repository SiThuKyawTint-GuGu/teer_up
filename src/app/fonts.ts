import { Inter as FontSans, Open_Sans } from "next/font/google";
import localFont from "next/font/local";

export const lFont = localFont({
  src: [
    {
      path: "../fonts/FSAlbertPro-Thin.ttf",
      weight: "300",
    },
    {
      path: "../fonts/FSAlbertPro-Light.ttf",
      weight: "400",
    },
    {
      path: "../fonts/FSAlbertPro.ttf",
      weight: "500",
    },
    {
      path: "../fonts/FSAlbertPro-Bold.ttf",
      weight: "700",
    },
    {
      path: "../fonts/FSAlbertPro-ExtraBold.ttf",
      weight: "800",
    },
  ],
  variable: "--font-teeup",
});

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const open_sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});
