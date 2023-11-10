"use client";

import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { setLocalStorage } from "@/utils";
import { Flex, Heading } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type ContentStartProp = {};
const ContentStart: React.FC<ContentStartProp> = () => {
  return (
    <div className="w-full h-full px-[16px] snap-start">
      <Flex justify="center" direction="column" align="center" className="w-full h-full">
        <Heading className="text-[36px] font-[700] leading-[48px]">
          Empower your path with personalized resources
        </Heading>

        <Text as="p" className="pt-[12px] font-[16px]">
          Answer some questions to help us personalize resources and opportunities for you based on the{" "}
          <Text as="span" className="text-primary font-semibold">
            {" "}
            Hope - Action and Career Construction Theory
          </Text>
        </Text>
        <Flex justify="center" align="center" className="pt-[32px]">
          <Image src="/content/start.svg" width={192} height={148} alt="startImage" />
        </Flex>
        <Button
          className="w-full mt-[48px]"
          onClick={() => {
            if (typeof window !== "undefined") {
              // Perform localStorage action
              setLocalStorage("content", "1");
            }
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
  );
};

export default ContentStart;
