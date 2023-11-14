import { cn } from "@/utils/cn";
import React, { ChangeEvent } from "react";
import styled from "styled-components";

type Props = {
  label?: string;
  className?: string;
  error?: any;
  placeholder?: string;
  defaultValue?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const InputDate = React.forwardRef<HTMLInputElement, Props>(
  ({ label, error, className, placeholder, defaultValue, handleChange, ...props }, ref) => {
    return (
      <InputStyled>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="relative mt-1 rounded-md">
          <input
            type="date"
            className={cn(`font-light ${className} shadow-md`)}
            placeholder={placeholder}
            defaultValue={defaultValue || ""}
            value="2020-03-01"
            ref={ref}
            onChange={handleChange}
            {...props}
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
      </InputStyled>
    );
  }
);
InputDate.displayName = "InputDate";

export default InputDate;

const InputStyled = styled.div`
  width: 100%;
  & .rt-TextFieldChrome,
  .rt-TextAreaChrome {
    box-shadow: none;
    background-color: transparent;
    outline: 0;
  }
`;
