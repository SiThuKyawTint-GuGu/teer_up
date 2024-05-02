/* eslint-disable no-unused-vars */
"use client";
import * as React from "react";

import { cn } from "@/utils/cn";
import { Text as RText, textPropDefs } from "@radix-ui/themes";

type SizePropValues = (typeof textPropDefs)["size"]["values"][number] | "sm" | "md" | "lg" | "xl"; 
type WeightPropsValues = (typeof textPropDefs)["weight"]["values"][number];
type ColorPropsValues = (typeof textPropDefs)["color"]["values"][number];
type AlignProps = (typeof textPropDefs)["align"]["values"][number];

interface Props {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  as?: React.ElementType;
  size?: SizePropValues;
  weight?: WeightPropsValues;
  color?: ColorPropsValues;
  align?: AlignProps;
  dangerouslySetInnerHTML?: {
    __html: string;
    __typename?: string;
  };
}

export const Text = React.forwardRef<HTMLDivElement, Props>(
  ({ children, as, className, size, dangerouslySetInnerHTML, ...rest }: Props, ref) => (
    <RText
      ref={ref}
      as={as || "p"}
      className={cn("text-black", className, size && `text-${size}`)}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      {...(rest as any)}
    >
      {children}
    </RText>
  )
);

Text.displayName = "Text";
