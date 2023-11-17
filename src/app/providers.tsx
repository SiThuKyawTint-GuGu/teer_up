"use client";
import fetcher from "@/lib/fetcher";
import StoreProvider from "@/providers/store";
import { ThemeProvider } from "@/providers/theme";
import { Theme } from "@radix-ui/themes";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { PropsWithChildren } from "react";
import { SWRConfig } from "swr";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <SWRConfig value={{ fetcher }}>
      <StoreProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Theme>
            {children}
            <ProgressBar height="4px" color="#DA291C" options={{ showSpinner: false }} shallowRouting />
          </Theme>
        </ThemeProvider>
      </StoreProvider>
    </SWRConfig>
  );
}
