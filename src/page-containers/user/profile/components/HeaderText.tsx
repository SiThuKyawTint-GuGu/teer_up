"use client"

import { Flex, Text } from '@radix-ui/themes';
import React from 'react'
import { Icons } from "@/components/ui/Images";
import Link from 'next/link';
import { useRouter } from 'next/navigation';


interface HeaderTextProps{
    text: string;
}

const HeaderText:React.FC<HeaderTextProps> = ({text}) => {
  const router = useRouter();
  return (
    <>
      <div className="mb-[45px]">
        <div className="max-w-[400px] fixed top-0 z-10 w-full shadow-[0px_1px_9px_0px_rgba(0,_0,_0,_0.06)]">
          <Flex justify="between" align="center" className="bg-white" p="3">
            <div className="cursor-pointer" onClick={() => router.back()}>
              <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
            </div>
            <Text size="3" weight="medium">
              {text}
            </Text>
            <Link href="/" className="opacity-0">
              <Icons.plus className="text-primary w-[23px] h-[23px]" />
            </Link>
          </Flex>
        </div>
      </div>
    </>
  );
}

export default HeaderText