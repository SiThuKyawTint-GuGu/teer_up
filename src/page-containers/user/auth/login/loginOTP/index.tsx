'use client';
import React from 'react';
import Image from 'next/Image';

import { Button } from '@/components/Button/index';
import { InputText } from '@/components/Inputs/index';
import teeUpLogo from '@/configs/img/auth/teeUpLogo.png';

const LoginOTP = () => {
  return (
    <div className="h-screen flex flex-col relative px-5">
      <div className="flex flex-col justify-evenly h-full items-center w-full flex-1">
        <Image src={teeUpLogo} width={130} height={31} alt="teeUpLogo" />
        <form className="mx-auto flex flex-col justify-center gap-3 w-[90%]">
          <InputText
            type="text"
          />
          <div className="text-black text-center">Enter the OTP for Log In</div>
          <Button>Next</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginOTP;
