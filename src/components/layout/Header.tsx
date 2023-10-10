'use client';
import React from 'react';
import styled from 'styled-components';

import CardBox from '@/components/ui/Card';
import { Icons } from '@/components/ui/Images';
import { Text } from '@/components/ui/Typo/Text';
import { useWindowSize } from '@/hooks/useWindowSize';
import { WINDOW_WIDTH } from '@/shared/enums';
import { Box, Flex, Grid } from '@radix-ui/themes';

const Header: React.FC = () => {
  const { windowWidth } = useWindowSize();

  // useEffect(() => {
  //   setWindowSize(windowWidth);
  // }, [windowWidth]);

  return (
    <Grid columns="1" py="5">
      <Flex
        gap="4"
        justify="between"
        align={windowWidth > WINDOW_WIDTH.LG ? 'center' : 'start'}
        direction={windowWidth > WINDOW_WIDTH.LG ? 'row' : 'column'}
      >
        <Box>
          <Text size="4">Dashboard</Text>
        </Box>
        <Flex
          gap="6"
          justify="center"
          align="center"
          direction={windowWidth > WINDOW_WIDTH.LG ? 'row' : 'column'}
        >
          {/* <Box>
            <InputSearch type="text" placeholder="Search..." />
          </Box> */}
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
      </Flex>
    </Grid>
  );
};

export default Header;

const CardBoxStyled = styled(CardBox)`
  /* overflow: unset; */
`;
