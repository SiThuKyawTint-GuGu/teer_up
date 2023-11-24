"use client";

import { Text } from "@/components/ui/Typo/Text";
import { Flex } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
type ContentStartProp = {};
const SecondStartPage: React.FC<ContentStartProp> = () => {
  return (
    <div className="w-full h-full px-[16px] py-4 snap-start">
      <Flex justify="center" direction="column" align="center" className="w-full h-[80%]">
        {/* <Heading className="text-[36px] font-[700] leading-[48px]">About TEE-UP</Heading> */}

        <Text as="p" className="pt-[12px] font-[16px]">
          Different people use different strengths to build their careers and life. No one is good at everything, each
          of us emphasizes some strengths more than others. There are NO right or wrong answers, only what is true to
          you only. Your responses will be kept PRIVATE & CONFIDENTIAL. Please rate how strongly you have developed each
          of the following career readiness strengths with the scale.
        </Text>
        <Flex justify="center" align="center" className="pt-[32px]">
          <Image src="/content/secondPage.svg" width={192} height={148} alt="startImage" />
        </Flex>

        <Text className="w-full h-full text-center font-[500] text-[20px] mt-7 text-primary">Scroll up to start</Text>
        {/* <Button
          className="w-full mt-[48px]"
          onClick={() => {
            if (typeof window !== "undefined") {
              // Perform localStorage action
            }
            const targetElement = document.getElementById("0");
            if (targetElement) {
              targetElement.scrollIntoView({
                behavior: "smooth", // Smooth scroll effect
              });
            }
          }}
        >
          LetU+0060s get started <Icons.rightArrow />
        </Button> */}
      </Flex>
    </div>
  );
};

export default SecondStartPage;
