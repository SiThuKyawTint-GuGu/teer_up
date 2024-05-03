"use client";
import { Icons, Image } from "@/components/ui/Images";
import { InputSearch, SLOT_DIRECTION } from "@/components/ui/Inputs";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { KeyboardEvent, useRef, useState, useTransition } from "react";
import Sidebar from "../ui/Sidebar";

const Header: React.FC = () => {
  const [search, setSearch] = useState<string>();
  const router = useRouter();
  const { get } = useSearchParams();
  const inputRef = useRef<any>(null);
  const [, startTransition] = useTransition();

  const handleClearSearch = () => {
    startTransition(() => {
      router.push("/home");
    });
  };

  const handleChange = () => {
    setSearch(inputRef.current.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      startTransition(() => {
        router.push(`/search?keyword=${search ? search : get("search")}`);
      });
    }
  };

  const handleSlotClick = () => {
    startTransition(() => {
      router.push(`/search?keyword=${search ? search : get("search")}`);
    });
  };

  return (
    <header className="w-full max-w-[400px] h-[48px] mx-auto bg-white fixed top-0 z-10 shadow-[0px_1px_9px_0px_rgba(0,_0,_0,_0.06)]">
      <Flex justify="between" align="center" height="100%" px="3" position="relative" gap="3">
        {get("search") ? (
          <InputSearch
            ref={inputRef}
            variant="contain"
            className="caret-primary"
            placeholder="Search"
            slotDir={SLOT_DIRECTION.LEFT}
            defaultValue={get("search") || ""}
            onKeyPress={handleKeyPress}
            onClear={handleClearSearch}
            onChange={handleChange}
            onSlotClick={handleSlotClick}
            onFocus={handleSlotClick}
            clearSlot
          />
        ) : (
          <>
            <Sidebar />
            <Image src="/auth/teeUpLogo.png" width={84} height={20} alt="teeup logo" />
            <Flex justify="center" align="center">
              <Link href={`/search`}>
                <Icons.search className="w-[25px] h-[25px]" />
              </Link>
            </Flex>
          </>
        )}
      </Flex>
    </header>
  );
};

export default Header;
