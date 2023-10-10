'use client';
import React from 'react';
import Image from 'next/Image';

import { Button } from '@/components/Button/index';
import { InputText } from '@/components/Inputs/index';
import { Text } from '@/components/Typo/Text';
import teeUpLogo from '@/configs/img/auth/teeUpLogo.png';

const SignUp = () => {
  return (
    <div className="h-screen flex flex-col relative px-5">
      <div className="flex flex-col justify-evenly h-full items-center w-full flex-1">
        <Image src={teeUpLogo} width={130} height={31} alt="teeUpLogo" />
        <form className="mx-auto flex flex-col justify-center gap-y-3 w-[90%]">
          <InputText type="text" label="Enter your email address" />
          <InputText type="text" label="Enter your name" />
          <InputText type="text" label="select your country" />
          <Button>Sign Up</Button>
        </form>

        <Text as="div" className=" text-black absolute bottom-3 w-[80%] mx-auto">
          By clicking &quot;Sign Up&quot;, I have read, understood, and given my consent and accepted the
          Terms of Use.
        </Text>
      </div>
    </div>
  );
};

export default SignUp;
