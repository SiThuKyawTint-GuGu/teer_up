type DatePickerProp = {
  value: string;
  onChange: any;
  placeholder: string;
  type: string;
};
const DatePicker: React.FC<DatePickerProp> = ({ value, onChange, placeholder, type }) => {
  return (
    <div className="w-full">
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="block w-full px-3 bg-white pr-3 py-1 border  rounded-lg "
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default DatePicker;
