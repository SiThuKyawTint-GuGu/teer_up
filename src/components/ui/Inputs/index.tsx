/* eslint-disable no-unused-vars */
import React, { ChangeEvent, HTMLInputTypeAttribute, useState } from "react";
import styled, { css } from "styled-components";
import { IconButton, TextArea, TextField } from "@radix-ui/themes";
import { Icons } from "../Images";
import { USER_ROLE } from "@/shared/enums";
import { cn } from "@/utils/cn";

export enum SLOT_DIRECTION {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

type Props = {
  type?: HTMLInputTypeAttribute;
  label?: string;
  className?: string;
  error?: any;
  placeholder?: string;
  defaultValue?: string;
  inputType?: USER_ROLE | string;
  disabled?: boolean;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const InputText = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      type,
      label,
      error,
      className,
      placeholder,
      handleChange,
      inputType = USER_ROLE.ADMIN,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState(props.defaultValue || "");

    const handleChangeInternal = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      if (handleChange) {
        handleChange(e);
      }
    };

    return (
      <InputStyled inputtype={inputType} disabled={disabled}>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="relative mt-1 rounded-md">
          <TextField.Root>
            <TextField.Input
              type={type}
              className={cn(`${className} shadow-md text-[#2A2A2A] `)}
              placeholder={placeholder}
              value={value}
              size="3"
              ref={ref}
              disabled={disabled}
              onChange={handleChangeInternal}
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
  slotDir?: SLOT_DIRECTION;
  clearSlot?: boolean;
  onSlotClick?: (arg?: any) => void;
  onClear?: () => void;
  inputClassName?: string;
};

const InputSearch = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      placeholder,
      className,
      variant,
      slotDir,
      clearSlot,
      onClear,
      onSlotClick,
      onChange,
      onKeyPress,
      onFocus,
      inputClassName = "",
      defaultValue,
    },
    ref
  ) => {
    return (
      <InputStyled className={cn("w-full shadow-input " + inputClassName, variant && "rounded-full bg-[#e1e5e9] ")}>
        <TextField.Root>
          {slotDir === SLOT_DIRECTION.LEFT && (
            <TextField.Slot>
              <Icons.search className={cn("w-[24px] h-[24px] text-[#5B6770] ", variant && "text-[#8d9499]")} />
            </TextField.Slot>
          )}

          <TextField.Input
            type={type}
            className={cn(className, variant && "placeholder-[#373A36] text-[16px]")}
            placeholder={placeholder}
            ref={ref}
            onChange={onChange}
            onKeyPress={onKeyPress}
            value={defaultValue}
            onFocus={onFocus}
          />
          {slotDir === SLOT_DIRECTION.RIGHT && (
            <TextField.Slot>
              <IconButton size="2" variant="ghost">
                <Icons.search className={cn("w-[24px] h-[24px] text-[#5B6770]", variant && "text-[#8d9499]")} />
              </IconButton>
            </TextField.Slot>
          )}
          {clearSlot && (
            <TextField.Slot>
              <IconButton size="1" variant="ghost">
                <Icons.cross
                  onClick={onClear}
                  className={cn("w-[20px] h-[20px] text-[#5B6770]", variant && "text-[#8d9499]")}
                />
              </IconButton>
            </TextField.Slot>
          )}
        </TextField.Root>
      </InputStyled>
    );
  }
);
InputSearch.displayName = "InputSearch";
InputSearch.defaultProps = {
  slotDir: SLOT_DIRECTION.LEFT,
  clearSlot: false,
};

const InputTextArea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, className, placeholder, inputType = USER_ROLE.ADMIN, disabled = false, ...props }, ref) => {
    const [value, setValue] = useState(props.defaultValue || "");

    const handleChangeInternal = (e:any) => {
      setValue(e.target.value);
      if (props.handleChange) {
        props.handleChange(e);
      }
    };

    return (
      <InputStyled inputtype={inputType}>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="relative mt-1 rounded-md outline-none ">
          <TextArea
            className={cn("w-full outline-none rounded-[8px] bg-[#5b6770] bg-opacity-10 font-regular", className)}
            placeholder={placeholder}
            value={value}
            onChange={handleChangeInternal}
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

const InputTextAreaBgWhite = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, className, placeholder, inputType = USER_ROLE.ADMIN, disabled = false, ...props }, ref) => {
    const [value, setValue] = useState(props.defaultValue || "");

    const handleChangeInternal = (e: any) => {
      setValue(e.target.value);
      if (props.handleChange) {
        props.handleChange(e);
      }
    };

    return (
      <InputStyled inputtype={inputType}>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="relative mt-1 rounded-md outline-none ">
          <TextArea
            className={cn(
              "w-full outline-none rounded-[8px] shadow-md text-[#2A2A2A] bg-[white] bg-opacity-10 font-regular",
              className
            )}
            placeholder={placeholder}
            value={value}
            onChange={handleChangeInternal}
            disabled={disabled}
            {...props}
          />
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </InputStyled>
    );
  }
);
InputTextAreaBgWhite.displayName = "InputTextAreaBgWhite";
const InputOtpStyled = styled.input`
  width: 53px;
  height: 64px;
  border-radius: 8px;
  background-color: white;
`;

const InputStyled = styled.div<{ inputtype?: USER_ROLE | string; disabled?: boolean }>`
  width: 100%;
  & input {
    ${({ inputtype }) =>
      inputtype !== USER_ROLE.ADMIN &&
      css`
        /* box-shadow: 0px 26px 30px 0px rgba(0, 0, 0, 0.05); */
      `}
    ${({ disabled }) =>
      disabled &&
      css`
        background-color: #e9e9e9;
      `}
  }
  & textarea {
    font-size: 14px;
    outline: none;
  }
  & .rt-TextFieldChrome,
  .rt-TextAreaChrome {
    box-shadow: none;
    background-color: transparent;
    outline: 0;
  }
`;

export { InputOtpStyled, InputSearch, InputStyled, InputText, InputTextArea, InputTextAreaBgWhite };
