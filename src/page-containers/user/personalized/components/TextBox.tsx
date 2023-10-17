import { Icons } from '@/components/ui/Images';
import { Text } from '@/components/ui/Typo/Text';
import { cn } from '@/utils/cn';
import React from 'react';
type TextBoxProps = {
  id: number | string | null;
  data: any;
  icon?: boolean;
};
const TextBox: React.FC<TextBoxProps> = ({ id, data, icon }) => {
  return (
    <div
      className={cn(
        'px-[24px] py-[12px] bg-[#fefefe] shadow-md rounded-md relative flex cursor-pointer',
        id === data.id && 'bg-secondary border-[1px] border-primary'
      )}
    >
      <Text className="font-size-[20px] font-[600] tracking-wide flex-1">{data.text}</Text>

      {icon && id === data.id ? (
        <Icons.mark className="w-5 h-5 text-green-600" />
      ) : (
        <div className="w-5 h-5"></div>
      )}
    </div>
  );
};

export default TextBox;
