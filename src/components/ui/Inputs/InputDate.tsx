"use client";
import React, { ChangeEventHandler, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Image } from "@/components/ui/Images";
import { cn } from "@/utils/cn";
import { format, isValid, parse } from "date-fns";
import { DayPicker, SelectSingleEventHandler } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { usePopper } from "react-popper";

interface DatePickerProps {
  defaultValue?: string;
  onChange: (arg?: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ ...props }: DatePickerProps) => {
  const [selected, setSelected] = useState<Date>();
  const [inputValue, setInputValue] = useState<string>("");
  const [isPopperOpen, setIsPopperOpen] = useState(false);

  const popperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const popper = usePopper(popperRef.current, popperElement, {
    placement: "bottom-start",
  });

  const closePopper = () => {
    setIsPopperOpen(false);
    buttonRef?.current?.focus();
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    setInputValue(e.currentTarget.value);
    const date = parse(e.currentTarget.value, "y-MM-dd", new Date());
    if (isValid(date)) {
      setSelected(date);
    } else {
      setSelected(undefined);
    }
  };

  const handleButtonClick = () => {
    setIsPopperOpen(true);
  };

  const handleDaySelect: SelectSingleEventHandler = date => {
    setSelected(date);
    if (date) {
      setInputValue(format(date, "y-MM-dd"));
      props.onChange(format(date, "y-MM-dd"));
      closePopper();
    } else {
      setInputValue("");
    }
  };

  return (
    <>
      <div ref={popperRef} className="relative">
        <input
          type="text"
          className={cn(
            "font-light shadow-md rounded-md bg-white border-0 text-black w-full h-[40px] p-3 outline-none"
          )}
          placeholder={format(new Date(), "y-MM-dd")}
          value={inputValue || (props?.defaultValue ? format(new Date(props.defaultValue), "y-MM-dd") : "")}
          onChange={handleInputChange}
        />
        <Button
          type="button"
          ref={buttonRef}
          onClick={handleButtonClick}
          variant="ghost"
          className="absolute right-0 bottom-0 flex"
        >
          <Image src="/uploads/icons/date.svg" width={24} height={24} alt="date" />
        </Button>
      </div>
      {isPopperOpen && (
        <div
          tabIndex={-1}
          style={popper.styles.popper}
          className="bg-white z-[999]"
          {...popper.attributes.popper}
          ref={setPopperElement}
          role="dialog"
          aria-label="DayPicker calendar"
        >
          <DayPicker
            // initialFocus={isPopperOpen}
            mode="single"
            defaultMonth={selected}
            selected={selected}
            onSelect={handleDaySelect}
          />
        </div>
      )}
    </>
  );
};

export default DatePicker;
