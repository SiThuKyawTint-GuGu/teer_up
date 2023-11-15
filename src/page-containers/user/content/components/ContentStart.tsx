"use client";

import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { setLocalStorage } from "@/utils";
import { Flex, Heading } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type ContentStartProp = {
  setShow: any;
};
const ContentStart: React.FC<ContentStartProp> = ({ setShow }) => {
  return (
    <div className="w-full h-[80%] px-[16px] snap-start">
      <Flex justify="center" direction="column" align="center" className="w-full h-[100%]">
        <Heading className="text-[20px] text-center font-[700] leading-[30px]">Start your journey!</Heading>
        <Heading className="text-[20px] text-center font-[700] leading-[30px]">Tell us about yourself.</Heading>

        <Text as="p" className="pt-[12px] font-[16px]">
          Simply answer the following questions to help us customise resources and opportunities for you. These
          questions indicate where you sit within the 7 dimensions of
          <Text as="span">
            {" "}
            <strong className="text-primary font-semibold">the Hope-Action and Career Construction Theory</strong>:{" "}
            <span className="pt-[12px] font-[16px]">
              Hopefulness, Self-Reflection, Self-Clarity, Visioning, Goal Setting and Planning, Implementing and
              Adapting.
            </span>
          </Text>
        </Text>
        <Flex justify="center" align="center" className="pt-[32px]">
          <Image src="/content/start.svg" width={192} height={148} alt="startImage" />
        </Flex>
        <Button
          className="w-full mt-[48px]"
          onClick={() => {
            setLocalStorage("content", "1");
            setShow(false);
            // const targetElement = document.getElementById("0");
            // if (targetElement) {
            //   targetElement.scrollIntoView({
            //     behavior: "smooth", // Smooth scroll effect
            //   });
            // }
          }}
        >
          Let’s get started <Icons.rightArrow />
        </Button>
        <Link href="/support/hope-action-theory" className="mt-[12px] text-primary">
          Find out more
        </Link>
      </Flex>
    </div>
  );
};

export default ContentStart;
