"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsBell } from "react-icons/bs";
import styled from "styled-components";

import CardBox from "@/components/ui/Card";
import { Text } from "@/components/ui/Typo/Text";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Grid } from "@radix-ui/themes";

const Header: React.FC = () => {
  const { windowWidth } = useWindowSize();
  const [pathname1, setPathname1] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const pathParts = pathname.split("/").filter(part => part);

    if (pathParts.length >= 3) {
      const secondItem = pathParts[1];
      const thirdItem = pathParts[2];

      const formattedPath = `${secondItem} > ${thirdItem}`;
      setPathname1(formattedPath);
    } else {
      setPathname1(pathParts[1] || "");
    }
  }, [pathname]);

  // useEffect(() => {
  //   setWindowSize(windowWidth);
  // }, [windowWidth]);

  return (
    <Grid columns="1">
      <div className="flex justify-between items-center sticky-top h-16 bg-white text-black relative shadow-sm text-2xl">
        <Text size="4" className="text-center font-md pl-3 text-red-600">
          {pathname1}
        </Text>
        <div className="flex justify-center items-center mr-10">
          <div className="flex ">
            <Image
              src="/mainLogo.png"
              alt="Avatar"
              width={50}
              height={50}
              className="rounded-full border-2 border-red-500 mr-3"
            />
            <div className="flex flex-col">
              <p className="text-[15px]">Hi, Simon</p>
              <p className="text-sm text-gray-500">Admin</p>
            </div>
          </div>
          <div className="ml-4 cursor-pointer">
            <BsBell size={20} />
          </div>
        </div>
      </div>
      {/* <Flex
        gap="4"
        justify="between"
        align={windowWidth > WINDOW_WIDTH.LG ? 'center' : 'start'}
        direction={windowWidth > WINDOW_WIDTH.LG ? 'row' : 'column'}
        className="h-20 justify-center items-center"
      >
        <Box>
          <Text size="4">Innovates</Text>
        </Box>
        <Flex
          gap="6"
          justify="center"
          align="center"
          direction={windowWidth > WINDOW_WIDTH.LG ? 'row' : 'column'}
        >
          <Box>
            <InputSearch type="text" placeholder="Search..." />
          </Box>
          <Box>
            <CardBoxStyled className="w-[289px] h-[40px]">
              <Flex justify="between" align="center" height="100%" p="4">
                <Flex align="center" gap="3">
                  <div className="bg-white rounded-full w-[60px] h-[60px] flex justify-center items-center -ml-4">
                    <Icons.profile className="w-[50px] h-[50px]" />
                  </div>
                  <Text>Hello, Michaela!</Text>
                </Flex>
                <Flex align="center" gap="3">
                  <Icons.email className="w-[20px] h-[20px]" />
                  <Icons.notification className="w-[20px] h-[20px]" />
                </Flex>
              </Flex>
            </CardBoxStyled>
          </Box>
        </Flex>
      </Flex> */}
    </Grid>
  );
};

export default Header;

const CardBoxStyled = styled(CardBox)`
  /* overflow: unset; */
`;
