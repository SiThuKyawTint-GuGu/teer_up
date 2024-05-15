import { ReactNode } from "react";
import GoogleCaptchaWrapper from "@/app/google-captcha-wrapper";

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <main className="bg-layout">
      <div className="w-full max-w-[400px] mx-auto">
       <GoogleCaptchaWrapper> {children}</GoogleCaptchaWrapper>
      </div>
    </main>
  );
};

export default AuthLayout;
