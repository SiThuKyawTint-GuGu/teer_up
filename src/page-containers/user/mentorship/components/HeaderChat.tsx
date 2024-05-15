"use client";
import { Box, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { Icons, Image } from "@/components/ui/Images";
import { useRouter } from "next/navigation";

interface HeaderChatProps {
  text: string;
}

const HeaderChat: React.FC<HeaderChatProps> = ({ text }) => {
  const router = useRouter();
  return (
    <>
      <div className="mb-[45px]">
        <div className="max-w-[400px] fixed top-0 z-10 w-full shadow-[0px_1px_9px_0px_rgba(0,_0,_0,_0.06)]">
          <Flex justify="between" align="center" className="bg-white" p="3">
            <Flex>
              <div className="cursor-pointer" onClick={() => router.back()}>
                <Icons.back className="text-[#373A36] w-[23px] h-[23px] mt-1" />
              </div>
              <Flex className=" gap-2 ms-3">
                <Image src="/uploads/images/mush.png" className="rounded-[50%]" width={30} height={30} alt={""} />
                <Text className="ms-1 mt-[2px] text-[18px] font-[500]">
                  {text}
                </Text>
              </Flex>
            </Flex>
            <Image src="/uploads/images/danger.png" width={20} height={20} alt={""} />
          </Flex>
        </div>
      </div>
    </>
  );
};

export default HeaderChat;
