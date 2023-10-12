"use client";
import fetcher from "@/lib/fetcher";
import { ThemeProvider } from "@/providers/theme";
import { Theme } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import { SWRConfig } from "swr";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <SWRConfig value={{ fetcher }}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <Theme>{children}</Theme>
      </ThemeProvider>
    </SWRConfig>
  );
}
