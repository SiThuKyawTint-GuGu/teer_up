'use client';
import React from 'react';
import Image from 'next/Image';

import { Button } from '@/components/Button/index';
import { InputText } from '@/components/Inputs/index';
import { Text } from '@/components/Typo/Text';
import teeUpLogo from '@/configs/img/auth/teeUpLogo.png';

const SignUpOTP = () => {
  return (
    <div className="h-screen flex flex-col relative px-5">
      <div className="flex flex-col justify-evenly h-full items-center w-full flex-1">
        <Image src={teeUpLogo} width={130} height={31} alt="teeUpLogo" />
        <div>
          <Text className="text-black">Verifying for email:</Text>
          <Text className="text-primary" as="span">
            abcde@1234.com
          </Text>
        </div>
        <form className="mx-auto flex flex-col justify-center gap-3 w-[90%]">
          <InputText type="text" />
          <div className="text-black text-center">Enter the OTP for Verify</div>
          <Button>Next</Button>
        </form>
      </div>
      <div className="absolute bottom-2 flex justify-between w-[85%] mx-auto">
        <Text className="text-primary">Change email</Text>
        <Text className="text-primary">Verify Later</Text>
      </div>
    </div>
  );
};

export default SignUpOTP;
