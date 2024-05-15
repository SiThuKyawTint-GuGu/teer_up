import { NextPage } from 'next';

import Login from '@/page-containers/admin/auth/login/index';
import GoogleCaptchaWrapper from "@/app/google-captcha-wrapper";

const LoginPage: NextPage = () => {
  return <GoogleCaptchaWrapper><Login /></GoogleCaptchaWrapper>;
};

export default LoginPage;
