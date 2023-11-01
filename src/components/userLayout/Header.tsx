import React from "react";
import { Icons, Image } from "../ui/Images";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between w-full max-w-[400px] h-[48px] mx-auto bg-white dark:bg-black fixed p-2 top-0 z-[9]">
      <Image src="/auth/teeUpLogo.svg" width={84} height={20} alt="teeup logo" />
      <Icons.searchLens width={24} height={24} />
    </header>
  );
};

export default Header;
