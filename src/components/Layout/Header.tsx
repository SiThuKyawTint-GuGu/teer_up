'use client';
import React from 'react';
import styled from 'styled-components';

import CardBox from '@/components/Card';
import { Icons } from '@/components/Images';
import Image from 'next/image';
import { Text } from '@/components/Typo/Text';
import { useWindowSize } from '@/hooks/useWindowSize';
import { WINDOW_WIDTH } from '@/shared/enums';
import { Box, Flex, Grid } from '@radix-ui/themes';
import mainLogo from '@/configs/img/auth/mainLogo.png';
import { BsBell } from 'react-icons/bs';

const Header: React.FC = () => {
  const { windowWidth } = useWindowSize();

  // useEffect(() => {
  //   setWindowSize(windowWidth);
  // }, [windowWidth]);

  return (
    <Grid columns="1" py="5" className="bg-red-500">
      <div className="flex justify-between items-center sticky-top h-16 bg-white text-black relative shadow-sm text-2xl">
        <Text size="4" className="text-center pl-3">
          Innovates
        </Text>
        <div className="flex justify-center items-center mr-10">
          <div className="mr-3">
            <p className="text-[17px] font-weight-400">School of Engineering</p>
            <p className="text-sm text-gray-500">Total 150,000 points</p>
          </div>
          <div className="flex ">
            <Image
              src={mainLogo}
              alt="Avatar"
              className="rounded-full w-12 h-12 border-2 border-white"
            />
            <div className="flex flex-col">
              <p className="text-[15px]">Hi, Simon</p>
              <p className="text-sm text-gray-500">Admin</p>
            </div>
          </div>
          <div className="ml-4">
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
