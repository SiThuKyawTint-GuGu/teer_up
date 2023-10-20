"use client";
import * as React from "react";

import { Text as RText, textPropDefs } from "@radix-ui/themes";

type SizePropValues = (typeof textPropDefs)["size"]["values"][number];
type WeightPropsValues = (typeof textPropDefs)["weight"]["values"][number];

interface Props {
  children?: React.ReactNode;
  className?: string;
  as?: "p" | "div" | "span" | "label";
  size?: SizePropValues;
  weight?: WeightPropsValues;
  color?: string;
  dangerouslySetInnerHTML?: {
    __html: string;
    __typename?: string;
  };
}

export const Text = React.forwardRef<HTMLDivElement, Props>(
  ({ children, as, className, dangerouslySetInnerHTML, ...rest }: Props, ref) => (
    <RText
      ref={ref}
      as={as || "p"}
      className={className}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      {...(rest as any)}
    >
      {children}
    </RText>
  )
);

Text.displayName = "Text";
