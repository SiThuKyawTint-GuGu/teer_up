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
              className={cn(`font-light ${className}`, inputType !== USER_ROLE.ADMIN ? "shadow-theme" : "")}
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

const InputSearch = React.forwardRef<HTMLInputElement, InputProps>(({ type = "text", placeholder, className }, ref) => {
  return (
    <InputStyled className="w-full shadow-input">
      <TextField.Root>
        <TextField.Slot pr="3">
          <IconButton size="2" variant="ghost">
            <Icons.search className={cn("w-[24px] h-[24px] text-[#5B6770]", className)} />
          </IconButton>
        </TextField.Slot>
        <TextField.Input type={type} className={className} placeholder={placeholder} size="3" ref={ref} />
      </TextField.Root>
    </InputStyled>
  );
});
InputSearch.displayName = "InputSearch";

const InputTextArea = React.forwardRef<HTMLInputElement, Props>(
  (
    { label, error, className, placeholder, defaultValue, inputType = USER_ROLE.ADMIN, disabled = false, ...props },
    ref
  ) => {
    return (
      <InputStyled inputType={inputType}>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="relative mt-1 rounded-md">
          <TextArea
            className={cn("w-full rounded-[8px] bg-[#5b6770] bg-opacity-10 font-regular", className)}
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

const InputStyled = styled.div<{ inputType?: USER_ROLE }>`
  width: 100%;
  & input {
    ${({ inputType }) =>
      inputType !== USER_ROLE.ADMIN &&
      css`
        /* box-shadow: 0px 26px 30px 0px rgba(0, 0, 0, 0.05); */
      `}
  }
  & textarea {
    font-size: 14px;
  }
  & .rt-TextFieldChrome,
  .rt-TextAreaChrome {
    box-shadow: none;
    background-color: transparent;
  }
`;
