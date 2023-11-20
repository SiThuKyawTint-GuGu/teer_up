"use client";
import * as React from "react";

import { cn } from "@/utils/cn";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Box, Flex } from "@radix-ui/themes";
import { RxCross2 } from "react-icons/rx";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogClose = DialogPrimitive.DialogClose;

const DialogPortal = ({ ...props }: DialogPrimitive.DialogPortalProps) => <DialogPrimitive.Portal {...props} />;
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-[#373a36] bg-opacity-50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

export enum Animate {
  FADE = "FADE",
  SLIDE = "SLIDE",
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    handleOnClose?: (arg: boolean) => void;
    isClose?: boolean;
    closeStyles?: string;
    animate?: Animate;
  }
>(({ className, children, handleOnClose, isClose = false, closeStyles, animate = Animate.FADE, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "grid w-full max-w-[400px] gap-4 p-6 shadow-lg",
        "fixed inset-0 mx-auto overflow-hidden z-50",
        "duration-200",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        animate === Animate.FADE && "data-[state=open]:fade-in-50 data-[state=closed]:fade-out",
        animate === Animate.SLIDE && "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
        className
      )}
      {...props}
    >
      <Flex justify="center" align="center">
        <Box className="relative w-full">
          {children}
          {isClose && (
            <DialogPrimitive.Close
              onClick={() => {
                handleOnClose && handleOnClose(false);
              }}
              className={cn(
                "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground text-black",
                closeStyles
              )}
            >
              <div className="w-5 h-5 flex justify-center items-center bg-[#BBC7D6] rounded-full">
                <RxCross2 className="w-4 h-4" color="#ffffff" />
              </div>
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          )}
        </Box>
      </Flex>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
};
