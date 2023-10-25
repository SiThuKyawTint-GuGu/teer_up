import React from "react";
import { Text } from "../../../../components/ui/Typo/Text";

type QuestionPageCardProp = {
  children: React.ReactNode;
  title?: string;
};
const QuestionPageCard: React.FC<QuestionPageCardProp> = ({ children, title }) => {
  return (
    <div className="w-full h-full  flex flex-col">
      {title && (
        <Text className="text-[28px] font-[700]  text-center mb-5" as="div">
          {title}
        </Text>
      )}
      <div className="w-full h-full">{children}</div>
    </div>
  );
};

export default QuestionPageCard;
