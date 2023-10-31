"use client";

import { useRouter } from "next/navigation";
import { Icons } from "../ui/Images";

type ContentDetailHeaderProps = {
  title: string;
};
const ContentDetailHeader: React.FC<ContentDetailHeaderProps> = ({ title }) => {
  const router = useRouter();
  return (
    <div className="flex justify-between h-[48px] items-center   bg-white fixed top-0 w-full max-w-[400px] mx-auto">
      <div onClick={() => router.back()}>
        <Icons.back className="w-[20px] h-[20px]" />
      </div>
      <div>{title}</div>
      <div>
        <Icons.share className="w-[20px] h-[20px]" />
      </div>
    </div>
  );
};

export default ContentDetailHeader;
