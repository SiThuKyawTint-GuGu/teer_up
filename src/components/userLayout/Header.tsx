import Image from "next/image";
import React from "react";
import { Icons } from "../ui/Images";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between w-full bg-white dark:bg-black static  p-2  top-0 left-0">
      <Image src="/auth/teeUpLogo.png" width={84} height={20} alt="teeup logo" />
      <Icons.searchLens width={24} height={24} />
    </header>
  );
};

export default Header;
