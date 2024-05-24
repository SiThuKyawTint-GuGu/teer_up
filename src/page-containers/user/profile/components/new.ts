

"use client"
import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";

interface CreateSelectInputProps {
  dataList: Array<{ id: number; name: string }>;
  onChange: (selectedOptions: any) => void;
  clearDependentFields?: boolean;
  resetState?: boolean;
  selectedValue?:string | number;
}

const CreateSelectInput: React.FC<CreateSelectInputProps> = ({
  dataList,
  onChange,
  clearDependentFields,
  resetState,
  selectedValue,
}) => {
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      fontFamily: "Roboto, sans-serif",
      fontWeight: "500",
      fontSize: "14px",
      border: "none",
    }),
  };

  type OptionType = { id: string; name: string };
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);

  const handleSelectChange = (selectedOptions: any) => {
    setSelectedOptions(selectedOptions);
    onChange(selectedOptions);
    if (clearDependentFields) {
      onChange([]);
    }
  };

  useEffect(() => {
      const response = dataList.find(item => item.id === selectedValue);
      // setSelectedOptions(response);

      console.log("Options:", options);
      console.log("Value:", response);
    // if (resetState) {
    //   setSelectedOptions([]);
    // }
  }, [resetState,dataList,selectedValue]);

  const options = dataList.map(item => ({
    value: String(item.id),
    label: item.name,
  }));



  return (
    <div>
      <CreatableSelect
        isMulti
        className="w-full rounded-md shadow-md focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
        styles={customStyles}
        options={options}
        onChange={handleSelectChange}
        value={selectedOptions}
      />
    </div>
  );
};

export default CreateSelectInput;