import { cn } from "@/utils/cn";

type CmtInputProp = {
  value?: string;
  setValue: (v: string) => void;
  className?: string;
};

const CmtInput: React.FC<CmtInputProp> = ({ setValue, value, className }) => {
  return (
    <div className="w-full">
      <input
        className={cn(
          "w-full h-full px-[12px] py-[4px] rounded-[40px] bg-[#F8F9FB] dark:bg-[#F8F9FB] outline-none placeholder:text-[16px] placeholder:font-[300]",
          className
        )}
        placeholder="Write your comment"
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
      />
    </div>
  );
};

export default CmtInput;
