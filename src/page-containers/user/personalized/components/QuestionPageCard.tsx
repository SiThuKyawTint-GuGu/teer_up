import { Icons } from "@/components/ui/Images";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Text } from "../../../../components/ui/Typo/Text";

type QuestionPageCardProp = {
  children: React.ReactNode;
  title?: string;
  layout?: boolean;
  subTitle?: string;
  nextPage?: string;
};
const QuestionPageCard: React.FC<QuestionPageCardProp> = ({ children, title, layout, subTitle, nextPage }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="h-[calc(100vh-96px)] w-full">
      {layout && (
        <div className="flex justify-between h-[48px] items-center px-2  bg-white fixed top-0 w-full max-w-[400px] mx-auto">
          <div
            onClick={() => {
              if (pathname === "/industry") return;
              router.back();
            }}
          >
            <Icons.back className="w-[20px] h-[20px]" />
          </div>
          <Link href={nextPage || "/home"}>
            <Text className="text-primary">Skip for now</Text>
          </Link>
        </div>
      )}
      <div className={`w-full  flex flex-col  h-full px-2 ${layout && "py-[48px]"}`}>
        {title && (
          <Text className="text-[28px] font-[700] leading-[36px]  text-start " as="div">
            {title}
          </Text>
        )}
        {subTitle && (
          <Text as="div" className="text-[18px] font-[400] text-[#373A36]">
            {subTitle}
          </Text>
        )}
        <div className="w-full mt-3 h-full pb-[48px]">{children}</div>
      </div>
    </div>
  );
};

export default QuestionPageCard;
