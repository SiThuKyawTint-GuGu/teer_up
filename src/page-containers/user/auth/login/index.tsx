'use client';
import React from 'react';
import Image from 'next/Image';

import { Button } from '@/components/Button/index';
import { InputText } from '@/components/Inputs/index';
import teeUpLogo from '@/configs/img/auth/teeUpLogo.png';

const Login = () => {
  return (
    <div className="h-screen flex flex-col relative px-5">
      <div className="flex flex-col justify-evenly h-full items-center w-full flex-1">
        <Image src={teeUpLogo} width={130} height={31} alt="teeUpLogo" className="mb-5" />
        <form className="mx-auto flex flex-col justify-center gap-3 w-[90%]">
          <InputText
            type="text"
            label="Enter your email address"
            className="bg-[#FFF] rounded-[9px] border-[1px] border-[#BABABA]"
          />
          <Button>Login In</Button>
          <div className="text-black">
            Don’t have an account? <span className="text-primary">Sign up now!</span>
          </div>
        </form>

        <footer className="text-black absolute bottom-3 px-5">
          By clicking "Log In", I have read, understood, and given my consent and accepted the Terms
          of Use.
        </footer>
      </div>
    </div>
  );
};

export default Login;
