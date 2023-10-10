'use client';
import * as React from 'react';

import { cn } from '@/utils/cn';
import * as Ariakit from '@ariakit/react';

import '@/styles/combobox.css';

const Item = React.forwardRef<
  HTMLDivElement,
  { className?: string; value: string; children: React.ReactNode }
>(({ className, value, children, ...props }, ref) => (
  <Ariakit.ComboboxItem
    ref={ref}
    value={value}
    className={cn(
      'flex items-center gap-2 rounded outline-none scroll-m-2 p-2 hover:bg-[#99d6ff]',
      className
    )}
    {...props}
  >
    {children}
  </Ariakit.ComboboxItem>
));
Item.displayName = 'Item';

const Autocomplete = React.forwardRef<
  HTMLInputElement,
  {
    className?: string;
    children: React.ReactNode;
    onChange?: (arg?: any) => any;
    setValue: (arg?: any) => void;
  }
>(({ children, className, setValue }, ref) => {
  return (
    <Ariakit.ComboboxProvider
      animated
      setValue={value => {
        React.startTransition(() => setValue(value));
      }}
    >
      <Ariakit.Combobox
        ref={ref}
        placeholder="Search by character name..."
        className={cn('combobox', className)}
      />
      <Ariakit.ComboboxCancel className="button secondary combobox-cancel" />
      <Ariakit.ComboboxPopover gutter={4} sameWidth className="popover">
        {children}
      </Ariakit.ComboboxPopover>
    </Ariakit.ComboboxProvider>
  );
});
Autocomplete.displayName = 'Autocomplete';

export { Autocomplete, Item };
