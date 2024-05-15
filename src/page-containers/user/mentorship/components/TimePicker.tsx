"use client"

import React, { useState } from "react";

interface Time {
  hour: number;
  minute: number;
  second: number;
  period: "AM" | "PM";
}

interface TimePickerProps {
  onTimeChange: (time: Time) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({ onTimeChange }) => {
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [period, setPeriod] = useState<"AM" | "PM">("AM");

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newHour = parseInt(e.target.value);
    if (newHour < 1) newHour = 12;
    if (newHour > 12) newHour = 1;
    setHour(newHour);
    onTimeChange({ hour: newHour, minute, second, period });
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newMinute = parseInt(e.target.value);
    if (newMinute < 0) newMinute = 59;
    if (newMinute > 59) newMinute = 0;
    setMinute(newMinute);
    onTimeChange({ hour, minute: newMinute, second, period });
  };

  const handleSecondChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newSecond = parseInt(e.target.value);
    if (newSecond < 0) newSecond = 59;
    if (newSecond > 59) newSecond = 0;
    setSecond(newSecond);
    onTimeChange({ hour, minute, second: newSecond, period });
  };

  const togglePeriod = () => {
    const newPeriod = period === "AM" ? "PM" : "AM";
    setPeriod(newPeriod);
    onTimeChange({ hour, minute, second, period: newPeriod });
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
      <input
        type="number"
        value={hour}
        onChange={handleHourChange}
        min="1"
        max="12"
        style={{ width: "50px", textAlign: "center", background: "white" }}
      />
      <span>:</span>
      <input
        type="number"
        value={minute}
        onChange={handleMinuteChange}
        min="0"
        max="59"
        style={{ width: "50px", textAlign: "center", background: "white" }}
      />
      <span>:</span>
      <input
        type="number"
        value={second}
        onChange={handleSecondChange}
        min="0"
        max="59"
        style={{ width: "50px", textAlign: "center", background: "white" }}
      />
      <button onClick={togglePeriod} style={{ width: "50px", textAlign: "center" }}>
        {period}
      </button>
    </div>
  );
};