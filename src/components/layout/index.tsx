'use client';
import React, { ReactNode } from 'react';

import { useWindowSize } from '@/hooks/useWindowSize';
import { WINDOW_WIDTH } from '@/shared/enums';

import HamburgerDrawer from './Drawer';
import Header from './Header';
import Sidebar from './Sidebar';

const PageLayout = ({ children }: { children: ReactNode }) => {
  const { windowWidth } = useWindowSize();

  return (
    <div className="flex justify-start items-start">
      {windowWidth > WINDOW_WIDTH.LG ? (
        <div className="fixed top-0 left-0">
          <Sidebar />
        </div>
      ) : (
        <div className="fixed w-full flex justify-end z-10">
          <HamburgerDrawer className="lg:hidden w-[45px]">
            <Sidebar />
          </HamburgerDrawer>
        </div>
      )}
      <div className="w-full min-h-screen lg:ml-[260px] bg-primary-light dark:bg-primary-dark px-4">
        <Header />
        <div>{children}</div>
        {/* <Suspense fallback={<div>loading...</div>}>
          
        </Suspense> */}
      </div>
    </div>
  );
};

export default PageLayout;
