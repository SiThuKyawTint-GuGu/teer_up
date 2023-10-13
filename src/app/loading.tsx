'use client';
import React from 'react';

import { Icons } from '@/components/ui/Images';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Icons.loading className="w-[40px] h-[40px`]" />
    </div>
  );
};

export default Loading;
