import React from "react";
import styled from "styled-components";

import { cn } from "@/utils/cn";
import { Box, LayoutProps } from "@radix-ui/themes";

interface Props extends LayoutProps {
  className?: string;
  children: React.ReactNode;
}

const CardBox: React.FC<Props> = ({ children, className, ...rest }: Props) => {
  return (
    <CardStyled className={cn("rounded-[6px] overflow-hidden", className)} {...rest}>
      {children}
    </CardStyled>
  );
};

export default CardBox;

const CardStyled = styled(Box)`
  box-shadow:
    0px 26px 30px 0px rgba(0, 0, 0, 0.05),
    rgba(29, 41, 57, 0.08) 0px 1px 3px;
  border-radius: 8px;
`;
