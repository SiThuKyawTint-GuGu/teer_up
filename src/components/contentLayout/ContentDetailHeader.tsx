"use client";

import Link from "next/link";
import { Icons } from "../ui/Images";

type ContentDetailHeaderProps = {
  pathname: string;
  title: string;
};
const ContentDetailHeader: React.FC<ContentDetailHeaderProps> = ({ pathname, title }) => {
  return (
    <div className="flex justify-between py-2  bg-white  w-full">
      <Link href={pathname}>
        <Icons.back className="w-[20px] h-[20px]" />
      </Link>
      <div>{title}</div>
      <div>
        <Icons.share className="w-[20px] h-[20px]" />
      </div>
    </div>
  );
};

export default ContentDetailHeader;
