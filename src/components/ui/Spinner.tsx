import { Flex } from "@radix-ui/themes";
import React from "react";
import { Icons } from "./Images";

interface Spinner {
  width?: number;
  height?: number;
  color?: string;
}

const Spinner: React.FC<Spinner> = ({ width, height, color }: Spinner) => {
  return (
    <Flex align="center" justify="center" className="h-screen w-full">
      <Icons.loading
        className="animate-spin"
        color={color || "black"}
        width={width || 25}
        height={height || 25}
      />
    </Flex>
  );
};

export default Spinner;
