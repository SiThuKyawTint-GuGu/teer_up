const DatePicker = () => {
  return (
    <div className="w-full">
      <div className="relative">
        <input
          type="date"
          className="block w-full px-3 bg-white pr-3 py-2 border  border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Select date"
        />
      </div>
    </div>
  );
};

export default DatePicker;
