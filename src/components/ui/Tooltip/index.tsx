"use client";
import "@/styles/tooltip.css";
import { cn } from "@/utils/cn";
import * as Ariakit from "@ariakit/react";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  content: string;
  render?: JSX.Element;
  open?: boolean;
}

export const Tooltip: React.FC<Props> = ({ children, content, render, open }: Props) => {
  return (
    <Ariakit.TooltipProvider open={open}>
      <Ariakit.TooltipAnchor render={render}>{children}</Ariakit.TooltipAnchor>
      <Ariakit.Tooltip className={cn("max-w-[320px] mr-4 text-white bg-[#656565] p-1 rounded-md")}>
        {content}
      </Ariakit.Tooltip>
    </Ariakit.TooltipProvider>
  );
};
