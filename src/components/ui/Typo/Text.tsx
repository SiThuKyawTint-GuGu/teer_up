"use client";
import * as React from "react";

import { Text as RText, textPropDefs } from "@radix-ui/themes";

type SizePropValues = (typeof textPropDefs)["size"]["values"][number];

interface Props {
  children?: React.ReactNode;
  className?: string;
  as?: "p" | "div" | "span";
  size?: SizePropValues;
  weight?: string;
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
