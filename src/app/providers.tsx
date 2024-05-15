"use client";
import fetcher from "@/lib/fetcher";
import StoreProvider from "@/providers/store";
import { ThemeProvider } from "@/providers/theme";
import { Theme } from "@radix-ui/themes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { PropsWithChildren } from "react";
import { SWRConfig } from "swr";
import GoogleCaptchaWrapper from "@/app/google-captcha-wrapper";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <SWRConfig value={{ fetcher }}>
      {/* TODO: to change for prod and refactor code for security */}
      <GoogleOAuthProvider clientId="140192099608-973711guiakahltp5t9pd3o4trj8n6a9.apps.googleusercontent.com">
        <StoreProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <Theme>
              <GoogleCaptchaWrapper>
                {children}
                <ProgressBar height="4px" color="#DA291C" options={{ showSpinner: false }} shallowRouting />
              </GoogleCaptchaWrapper>
            </Theme>
          </ThemeProvider>
        </StoreProvider>
      </GoogleOAuthProvider>
    </SWRConfig>
  );
}
