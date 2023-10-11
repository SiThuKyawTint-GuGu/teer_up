'use client';
import React from 'react';

import * as Collapse from '@radix-ui/react-collapsible';
// import { RowSpacingIcon, Cross2Icon } from '@radix-ui/react-icons';
// import './styles.css';

const Collapsible = Collapse.Root;

const CollapsibleTrigger = Collapse.Trigger;

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof Collapse.Content>,
  React.ComponentPropsWithoutRef<typeof Collapse.Content>
>(({ className, children, ...props }, ref) => (
  <Collapse.Content ref={ref}>{children}</Collapse.Content>
));
CollapsibleContent.displayName = 'Collapsible';

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
