"use client";

import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { setLocalStorage } from "@/utils";
import { Flex } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type ContentStartProp = {
  setShow: any;
};
const ContentStart: React.FC<ContentStartProp> = ({ setShow }) => {
  return (
    <>
      <div className="w-full h-full p-[16px]">
        <Flex direction="column" align="center" justify="center" className="w-full h-full">
          <Text as="p">
            Different people use different strengths to build their careers and life. No one is good at everything, each
            of us emphasizes some strengths more than others. There are NO right or wrong answers, only what is true to
            you only. Your responses will be kept PRIVATE & CONFIDENTIAL. Please rate how strongly you have developed
            each of the following career readiness strengths with the scale.
          </Text>
          <Flex justify="center" align="center" className="my-3">
            <Image src="/content/start.svg" width={192} height={148} alt="startImage" />
          </Flex>
          <Button
            className="w-full my-3"
            onClick={() => {
              setLocalStorage("content", "1");
              setShow(false);
              const targetElement = document.getElementById("0");
              if (targetElement) {
                targetElement.scrollIntoView({
                  behavior: "smooth", // Smooth scroll effect
                });
              }
            }}
          >
            Let’s get started <Icons.rightArrow />
          </Button>
          <Link href="/support/hope-action-theory" className="mt-[12px] text-primary">
            Find out more
          </Link>
        </Flex>
      </div>
    </>
  );
};

export default ContentStart;
