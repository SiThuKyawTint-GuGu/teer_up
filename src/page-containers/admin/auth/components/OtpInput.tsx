import React from "react";

const OtpInput: React.FC = () => {
  const handleInputChange = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const inputs = document.querySelectorAll<HTMLInputElement>("#otp > *[id]");
    if (event.key === "Backspace") {
      inputs[index].value = "";
      if (index > 0) inputs[index - 1].focus();
    } else if (/^[0-9a-zA-Z]$/.test(event.key)) {
      inputs[index].value = event.key;
      if (index < inputs.length - 1) inputs[index + 1].focus();
    }
  };

  return (
    <div className="flex flex-row items-center justify-between mx-auto w-full " id="otp">
      {[...Array(6)].map((_, index) => (
        <div className="w-16 h-16 " key={index}>
          <input
            maxLength={1}
            id={`otp-${index}`}
            pattern="[0-9]*"
            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
            type="text"
            onKeyDown={e => handleInputChange(e, index)}
          />
        </div>
      ))}
    </div>
  );
};

export default OtpInput;
