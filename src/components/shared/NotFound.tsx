"use client";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Box, Flex } from "@radix-ui/themes";
import React from "react";

interface Props {
  icon: JSX.Element;
  content: JSX.Element | string;
  link?: JSX.Element;
}

const NotFound: React.FC<Props> = ({ icon, content, link }: Props) => {
  const { windowHeight } = useWindowSize();
  const offset = 164;
  const contentHeight = windowHeight - offset;

  return (
    <Box>
      <Flex
        style={{ height: contentHeight }}
        className="space-y-[10px]"
        direction="column"
        align="center"
        justify="center"
      >
        {icon}
        <div className="text-center">{content}</div>
        {link}
      </Flex>
    </Box>
  );
};

export default NotFound;
