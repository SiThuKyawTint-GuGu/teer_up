"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import Spinner from "../Spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-[30px] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none focus:outline-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-[#fff] shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "text-black border border-primary bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-[160px] px-3 text-md",
        lg: "h-10 rounded-[160px] px-8 text-xl",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  spinnerColor?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, loading, variant, size, spinnerColor, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component className={cn("space-x-[5px]", buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {loading ? (
          <Spinner width={25} height={25} color={spinnerColor || "#ffffff"} />
        ) : (
          <span className="flex justify-center items-center gap-[5px]">{children}</span>
        )}
      </Component>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
