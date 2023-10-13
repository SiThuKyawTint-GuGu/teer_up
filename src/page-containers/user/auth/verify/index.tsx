'use client';
import React from 'react';
import Image from 'next/Image';

import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Typo/Text';
import teeUpLogo from '@/configs/img/auth/teeUpLogo.png';

const Verify = () => {
  const isloginEmail = true;
  return (
    <div className="h-screen flex flex-col relative px-5">
      <div className="flex flex-col justify-evenly h-full items-center w-full flex-1">
        <Image src={teeUpLogo} width={130} height={31} alt="teeUpLogo" />
        <form className="mx-auto flex flex-col justify-center gap-3 w-[90%]">
          {isloginEmail ? (
            <div className="text-black">
              This feature requires you to verify your email:
              <span className="text-primary">abcde@1234.com</span>
            </div>
          ) : (
            <Text className="text-black text-center">
              We will not be able to save your progress if you do not verify your email. Are you
              sure you want to proceed without verification?
            </Text>
          )}

          <Button>Verify Now</Button>
          {isloginEmail ? (
            <Text className="text-primary text-center">Back</Text>
          ) : (
            <Text className="text-primary text-center">Verify Later</Text>
          )}
        </form>
      </div>
    </div>
  );
};

export default Verify;
