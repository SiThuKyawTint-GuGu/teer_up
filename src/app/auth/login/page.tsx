import React from "react";
import { NextPage } from "next";

import Login from "@/page-containers/user/auth/login/index";
import GoogleCaptchaWrapper from "@/app/google-captcha-wrapper";

const LoginPage: NextPage = () => {
  return (
    <GoogleCaptchaWrapper>
      <Login />
    </GoogleCaptchaWrapper>
  );
};

export default LoginPage;
