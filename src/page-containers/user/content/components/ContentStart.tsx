import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { Flex, Heading } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
type ContentStartProp = {
  index: number;
};
const ContentStart: React.FC<ContentStartProp> = ({ index }) => {
  return (
    <div className="w-full h-full px-[16px]">
      <button
        onClick={() => {
          localStorage.setItem("content", "1");
        }}
      >
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
        </Flex>
        <Flex justify="center" align="center" className="pt-[32px]">
          <Image src="/content/start.svg" width={192} height={148} alt="startImage" />
        </Flex>
        <Button
          className="w-full mt-[48px]"
          onClick={() => {
            const targetElement = document.getElementById(`${index + 1}`);
            if (targetElement) {
              targetElement.scrollIntoView({
                behavior: "smooth", // Smooth scroll effect
              });
            }
          }}
        >
          Let’s get started <Icons.rightArrow />
        </Button>
        <Button variant="link" className="mt-[12px]">
          Find out more
        </Button>
      </button>
    </div>
  );
};

export default ContentStart;
