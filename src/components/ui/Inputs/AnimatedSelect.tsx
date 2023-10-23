"use client";
import * as React from "react";

import { cn } from "@/utils/cn";
import * as Ariakit from "@ariakit/react";

import "@/styles/Select.css";

const SelectItem = React.forwardRef<
  HTMLDivElement,
  { className?: string; value: string; children: React.ReactNode }
>(({ className, value, children, ...props }, ref) => (
  <Ariakit.SelectItem ref={ref} value={value} className={cn("flex scroll-", className)} {...props}>
    {children}
  </Ariakit.SelectItem>
));
SelectItem.displayName = "SelectItem";

const AnimatedSelect = React.forwardRef<
  HTMLInputElement,
  {
    className?: string;
    children?: React.ReactNode;
    onChange?: (arg?: any) => any;
    setValue?: (arg?: any) => void;
  }
>(({ children, className, setValue }, ref) => {
  return (
    <Ariakit.SelectProvider
      animated
      setValue={value => {
        // @ts-ignore
        React.startTransition(() => setValue(value));
      }}
    >
      <Ariakit.Select className="button secondary Select-cancel" />
      <Ariakit.SelectPopover gutter={4} sameWidth className="popover">
        {children}
      </Ariakit.SelectPopover>
    </Ariakit.SelectProvider>
  );
});
AnimatedSelect.displayName = "AnimatedSelect";

export { AnimatedSelect, SelectItem };
