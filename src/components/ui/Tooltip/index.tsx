"use client";

import "@/styles/tooltip.css";
import * as Ariakit from "@ariakit/react";
import * as React from "react";

const Tooltip = React.forwardRef(({ ...props }, ref) => (
  <Ariakit.TooltipProvider>
    <Ariakit.TooltipAnchor className="link" render={<a href="https://ariakit.org/components/tooltip" />}>
      Tooltip
    </Ariakit.TooltipAnchor>
    <Ariakit.Tooltip className="">https://ariakit.org/components/tooltip</Ariakit.Tooltip>
  </Ariakit.TooltipProvider>
));
Tooltip.displayName = "Tooltip";

export { Tooltip };
