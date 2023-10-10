'use client';
import { type PropsWithChildren, useRef } from 'react';

import type { StoreType } from '@/libs/store';
import { initializeStore, Provider } from '@/libs/store';

const StoreProvider = ({ children, ...props }: PropsWithChildren) => {
  const storeRef = useRef<StoreType>();

  if (!storeRef.current) {
    storeRef.current = initializeStore(props);
  }

  return <Provider value={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
