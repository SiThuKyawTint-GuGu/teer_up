"use client";
import * as React from "react";

import { cn } from "@/utils/cn";
import * as Ariakit from "@ariakit/react";

import "@/styles/combobox.css";

const Item = React.forwardRef<
  HTMLDivElement,
  { className?: string; value: string; children: React.ReactNode; onClick?: () => void }
>(({ className, value, children, ...props }, ref) => (
  <Ariakit.ComboboxItem
    ref={ref}
    value={value}
    className={cn(
      "flex text-black items-center gap-2 rounded outline-none scroll-m-2 p-2 hover:bg-[#99d6ff]",
      className
    )}
    {...props}
  >
    {children}
  </Ariakit.ComboboxItem>
));
Item.displayName = "Item";

const Autocomplete = React.forwardRef<
  HTMLInputElement,
  {
    className?: string;
    children: React.ReactNode;
    placeholder?: string;
    name?: string;
    onChange: (arg?: string) => void;
  }
>(({ children, className, placeholder, ...rest }, ref) => {
  return (
    <Ariakit.ComboboxProvider
      animated
      setValue={value => {
        React.startTransition(() => rest.onChange(value));
      }}
    >
      <div className="relative">
        <Ariakit.Combobox
          ref={ref}
          placeholder={placeholder}
          className={cn("w-full h-10 rounded-md px-4 font-light text-black outline-0", className)}
          // setValueOnChange={e => console.log(e.value)}
        />
        <Ariakit.ComboboxDisclosure className="button secondary disclosure absolute top-0 right-1" />
        {/* <Ariakit.ComboboxDisclosure variant="ghost" className="absolute top-1 right-1 h-8 w-8">
          <Icons.downArrow />
        </Ariakit.ComboboxDisclosure> */}
        <Ariakit.ComboboxPopover gutter={4} sameWidth className="popover">
          {children}
        </Ariakit.ComboboxPopover>
      </div>
    </Ariakit.ComboboxProvider>
  );
});
Autocomplete.displayName = "Autocomplete";

export { Autocomplete, Item };
