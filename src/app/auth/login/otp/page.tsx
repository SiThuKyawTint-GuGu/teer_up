import GoogleCaptchaWrapper from "@/app/google-captcha-wrapper";
import LoginOtp from "@/page-containers/user/auth/otp/LoginOtp";
import { NextPage } from "next";

const OtpPage: NextPage = () => {
  return (
    <GoogleCaptchaWrapper>
      <LoginOtp />
    </GoogleCaptchaWrapper>
  );
};

export default OtpPage;
