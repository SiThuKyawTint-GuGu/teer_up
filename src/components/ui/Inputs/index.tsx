import React from "react";
import styled, { css } from "styled-components";

import { IconButton, TextArea, TextField } from "@radix-ui/themes";

import { USER_ROLE } from "@/shared/enums";
import { cn } from "@/utils/cn";
import { Icons } from "../Images";

export enum SLOT_DIRECTION {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

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
      <InputStyled inputtype={inputType}>
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
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
      </InputStyled>
    );
  }
);
InputText.displayName = "InputText";

InputText.defaultProps = {
  type: "text",
};

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "contain";
  onChange?: any;
  slotDir?: SLOT_DIRECTION;
};

const InputSearch = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", placeholder, className, variant, defaultValue, slotDir, onChange }, ref) => {
    return (
      <InputStyled className={cn("w-full shadow-input", variant && "rounded-full bg-[#e1e5e9]")}>
        <TextField.Root>
          {slotDir === SLOT_DIRECTION.LEFT && (
            <TextField.Slot pr="3">
              <IconButton size="2" variant="ghost">
                <Icons.search className={cn("w-[24px] h-[24px] text-[#5B6770]", variant && "text-[#8d9499]")} />
              </IconButton>
            </TextField.Slot>
          )}
          <TextField.Input
            type={type}
            className={cn(className, variant && "placeholder-[#373A36]", slotDir === SLOT_DIRECTION.RIGHT && "pl-3")}
            placeholder={placeholder}
            ref={ref}
            onChange={onChange}
            defaultValue={defaultValue}
          />
          {slotDir === SLOT_DIRECTION.RIGHT && (
            <TextField.Slot pr="3">
              <IconButton size="2" variant="ghost">
                <Icons.search className={cn("w-[24px] h-[24px] text-[#5B6770]", variant && "text-[#8d9499]")} />
              </IconButton>
            </TextField.Slot>
          )}
        </TextField.Root>
      </InputStyled>
    );
  }
);
InputSearch.displayName = "InputSearch";

const InputTextArea = React.forwardRef<HTMLInputElement, Props>(
  (
    { label, error, className, placeholder, defaultValue, inputType = USER_ROLE.ADMIN, disabled = false, ...props },
    ref
  ) => {
    return (
      <InputStyled inputtype={inputType}>
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

const InputOtp: React.FC = ({ ...props }) => {
  return <InputOtpStyled {...props} />;
};

export { InputOtp, InputSearch, InputText, InputTextArea };

const InputStyled = styled.div<{ inputtype?: USER_ROLE }>`
  width: 100%;
  & input {
    ${({ inputtype }) =>
      inputtype !== USER_ROLE.ADMIN &&
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
    outline: 0;
  }
`;

const InputOtpStyled = styled.input`
  width: 53px;
  height: 64px;
  border-radius: 8px;
  background-color: white;
`;
