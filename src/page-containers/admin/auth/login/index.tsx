import React from 'react';
import Image from 'next/image';

import loginVector from '@/configs/img/auth/loginVector.png';
import mainLogo from '@/configs/img/auth/mainLogo.png';

const Login = () => {
  return (
    <div className="grid grid-cols-2 h-[100vh]">
      <div className="bg-[#FFF] h-full flex flex-col justify-center items-center">
        <Image src={mainLogo} className="w-[381px] h-[166px]" alt="main logo" />
        <Image src={loginVector} className="w-[100%] h-[292px]" alt="login vector" />
      </div>
      <div className="bg-gray-200 h-full flex justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;

const LoginForm = () => {
  return (
    <form className="flex flex-col justify-start">
      <div className="text-primary font-sans text-[30px] font-[600] tracking-[0.6px]">Sign in</div>
    </form>
  );
};
