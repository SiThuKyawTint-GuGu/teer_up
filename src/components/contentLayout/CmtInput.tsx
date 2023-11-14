type CmtInputProp = {
  value?: string;
  setValue: (v: string) => void;
};
const CmtInput: React.FC<CmtInputProp> = ({ setValue, value }) => {
  return (
    <div className="w-full h-[32px]">
      <input
        className="w-full h-full px-[12px] py-[4px] rounded-[40px] bg-[#F8F9FB] dark:bg-[#F8F9FB]
         outline-none placeholder:text-[16px] placeholder:font-[300]
        "
        placeholder="Write your comment"
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
      ></input>
    </div>
  );
};

export default CmtInput;
