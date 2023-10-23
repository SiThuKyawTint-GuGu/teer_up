import "@/styles/radio.css";
import { cn } from "@/utils/cn";
import * as RadioPrimitive from "@radix-ui/react-radio-group";
import React from "react";

const Radio = RadioPrimitive.Root;

const RadioItem = React.forwardRef<
  React.ElementRef<typeof RadioPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioPrimitive.Item
    ref={ref}
    className={cn("bg-white w-[20px] h-[20px] rounded-full border-2 border-[#c6c7c9]", className)}
    {...props}
  >
    <RadioPrimitive.Indicator className="flex items-center justify-center w-full h-full relative after:content after:block after:w-2 after:h-2 after:rounded-full after:bg-primary" />
  </RadioPrimitive.Item>
));
RadioItem.displayName = RadioPrimitive.Item.displayName;

export { Radio, RadioItem };
