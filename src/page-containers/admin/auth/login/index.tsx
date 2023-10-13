'use client';
import React from 'react';
import Image from 'next/image';

import LoginForm from '../components/LoginForm';

const Login: React.FC = () => {
  return (
    <div className="grid grid-cols-2 h-[100vh]">
      <div className="bg-[#FFF] h-full flex flex-col justify-center items-center">
        <Image src="/mainLogo.png" width={381} height={166} alt="main logo" />
        <Image src="/loginVector.png" width={200} height={298} alt="login vector" />
      </div>
      <div className="bg-gray-200 h-full flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
