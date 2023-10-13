'use client';
import React from 'react';
import Image from 'next/image';

import loginVector from '@/configs/img/auth/loginVector.png';
import mainLogo from '@/configs/img/auth/mainLogo.png';

import LoginForm from '../components/LoginForm';

const Login: React.FC = () => {
  return (
    <div className="grid grid-cols-2 h-[100vh]">
      <div className="bg-[#FFF] h-full flex flex-col justify-center items-center">
        <Image src={mainLogo} className="w-[381px] h-[166px]" alt="main logo" />
        <Image src={loginVector} className="w-[100%] h-[292px]" alt="login vector" />
      </div>
      <div className="bg-gray-200 h-full flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
