import React from "react";
import styled, { css } from "styled-components";

import { IconButton, TextArea, TextField } from "@radix-ui/themes";

import { USER_ROLE } from "@/shared/enums";
import { cn } from "@/utils/cn";
import { Icons } from "../Images";

type Props = {
  type?: "text" | "email" | "password" | "number" | "submit" | "hidden";
  label?: string;
  className?: string;
  error?: any;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  inputType?: USER_ROLE;
  disabled?: boolean;
};

const InputText = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      type,
      label,
      error,
      className,
      placeholder,
      defaultValue,
      inputType = USER_ROLE.ADMIN,
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <InputStyled inputType={inputType}>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="relative mt-1 rounded-md">
          <TextField.Root>
            <TextField.Input
              type={type}
              className={cn(className, inputType !== USER_ROLE.ADMIN ? "shadow-theme" : "")}
              placeholder={placeholder}
              defaultValue={defaultValue || ""}
              size="3"
              ref={ref}
              disabled={disabled}
              {...props}
            />
          </TextField.Root>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </InputStyled>
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

const InputTextArea = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      error,
      className,
      placeholder,
      defaultValue,
      inputType = USER_ROLE.ADMIN,
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <InputStyled inputType={inputType}>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="relative mt-1 rounded-md">
          <TextArea
            className={cn(className, inputType !== USER_ROLE.ADMIN ? "shadow-theme" : "")}
            placeholder={placeholder}
            defaultValue={defaultValue || ""}
            size="3"
            disabled={disabled}
            {...props}
          />
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </InputStyled>
    );
  }
);
InputTextArea.displayName = "InputTextArea";

export { InputSearch, InputText, InputTextArea };

const InputStyled = styled.div<{ inputType: USER_ROLE }>`
  & input {
    ${({ inputType }) =>
      inputType !== USER_ROLE.ADMIN &&
      css`
        /* box-shadow: 0px 26px 30px 0px rgba(0, 0, 0, 0.05); */
      `}
  }
  & .rt-TextFieldChrome {
    box-shadow: none;
  }
`;
