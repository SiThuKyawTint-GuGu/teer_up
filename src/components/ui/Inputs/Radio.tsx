import { Radio as MuiRadio } from "@mui/material";
import React from "react";
import { LiaCircle } from "react-icons/lia";
import { PiCircleFill } from "react-icons/pi";

const Radio: React.FC<{
  checked?: boolean;
  handleChange?: (e: React.ChangeEvent) => void;
  value?: string;
  name?: string;
}> = ({ checked, handleChange, value, ...rest }) => {
  return (
    <MuiRadio
      sx={{
        "&.MuiButtonBase-root": {
          color: "#c6c7c9",
          "&.Mui-checked": {
            transition: "color 0.5s ease-in-out",
          },
        },
      }}
      checkedIcon={
        <>
          <div className="flex justify-center items-center relative">
            <LiaCircle className="w-[25px] h-[25px] text-[#c6c7c9]" />
            <div className="absolute">
              <PiCircleFill className="text-primary w-[12px] h-[11px]" />
            </div>
          </div>
        </>
      }
      icon={<LiaCircle className="w-[25px] h-[25px] text-[#c6c7c9]" />}
      checked={checked}
      onChange={handleChange}
      value={value}
      {...rest}
    />
  );
};

export default Radio;
