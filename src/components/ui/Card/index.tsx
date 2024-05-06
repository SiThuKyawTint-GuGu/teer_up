import React from "react";

import { cn } from "@/utils/cn";
import { Box } from "@radix-ui/themes";
import { BoxProps } from "@radix-ui/themes/dist/cjs/components/box";

interface Props extends BoxProps {
  className?: string;
  children: React.ReactNode;
}

const CardBox: React.FC<Props> = ({ children, className, ...rest }: Props) => {
  return (
    <Box className={cn("rounded-[8px] overflow-hidden", className)} {...rest}>
      {children}
    </Box>
  );
};

export default CardBox;
