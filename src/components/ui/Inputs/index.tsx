import React from "react";
import styled from "styled-components";

import { IconButton, TextField } from "@radix-ui/themes";

import { Icons } from "../Images";

type Props = {
  type?: "text" | "email" | "password" | "number" | "submit" | "hidden";
  label?: string;
  className?: string;
  error?: any;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
};

const InputText = React.forwardRef<HTMLInputElement, Props>(
  ({ type, label, error, className, placeholder, defaultValue, ...props }, ref) => {
    return (
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <TextField.Root>
            <TextField.Input
              type={type}
              className={className}
              placeholder={placeholder}
              defaultValue={defaultValue || ""}
              size="3"
              ref={ref}
              {...props}
            />
          </TextField.Root>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);
InputText.displayName = "InputText";

InputText.defaultProps = {
  type: "text",
};

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputSearch = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, className }, ref) => {
    return (
      <TextField.Root>
        <TextField.Input className={className} placeholder={placeholder} size="3" ref={ref} />
        <TextField.Slot pr="3">
          <IconButton size="2" variant="ghost">
            <Icons.search height="16" width="16" />
          </IconButton>
        </TextField.Slot>
      </TextField.Root>
    );
  }
);
InputSearch.displayName = "InputSearch";

export { InputSearch, InputText };

const InputStyled = styled.input`
  outline: 0;
`;
