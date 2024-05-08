import React from "react";

interface SelectInputTextProps {
  value?: string | null;
  onChange?: (value: string | null) => void;
}

const SelectInputText: React.FC<SelectInputTextProps> = ({ value = null, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const options = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  return (
    <select
      value={value || ""}
      onChange={handleChange}
      style={{ boxShadow: "0px 2px 6px 0px #003D591F" }}
      className="bg-white py-2 rounded-[8px] px-3 text-[16px] font-[400] text-[#222222]"
    >
      <option value="">-</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInputText;
