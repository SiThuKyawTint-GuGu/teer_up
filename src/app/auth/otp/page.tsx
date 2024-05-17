import React from 'react';
import { NextPage } from 'next';

import Otp from '@/page-containers/user/auth/otp/index';
import GoogleCaptchaWrapper from "@/app/google-captcha-wrapper";

const OTPPage: NextPage = () => {
  return <GoogleCaptchaWrapper><Otp /></GoogleCaptchaWrapper>;
};

export default OTPPage;
