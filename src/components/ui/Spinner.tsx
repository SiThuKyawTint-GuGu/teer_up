import { cn } from "@/utils/cn";
import { Flex } from "@radix-ui/themes";
import React from "react";
import { Icons } from "./Images";

interface Spinner {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

const Spinner: React.FC<Spinner> = ({ width, height, color, className }: Spinner) => {
  return (
    <Flex align="center" justify="center" className={cn("relative", className)}>
      <Icons.loading className="animate-spin" color={color || "black"} width={width || 25} height={height || 25} />
    </Flex>
  );
};

export default Spinner;
