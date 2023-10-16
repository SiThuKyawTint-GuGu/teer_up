'use client';
import { createContext, useContext } from 'react';
import { createStore, useStore as useZustandStore } from 'zustand';

interface StoreInterface {
  lastUpdate: number;
  light: boolean;
  count: number;
  refetch: boolean;
  toggleUpdated: (arg: boolean) => void;
  increment: () => void;
  decrement: () => void;
}

const getDefaultInitialState = () => ({
  lastUpdate: Date.now(),
  light: false,
  count: 0,
  refetch: false,
});

export type StoreType = ReturnType<typeof initializeStore>;

const zustandContext = createContext<StoreType | null>(null);

export const Provider = zustandContext.Provider;

export const useStore = <T>(selector: (state: StoreInterface) => T) => {
  const store = useContext(zustandContext);
  if (!store) throw new Error('Store is missing the provider');
  return useZustandStore(store, selector);
};

export const initializeStore = (preloadedState: Partial<StoreInterface> = {}) => {
  return createStore<StoreInterface>((set, get) => ({
    ...getDefaultInitialState(),
    ...preloadedState,
    increment: () => {
      set({
        count: get().count + 1,
      });
    },
    decrement: () => {
      set({
        count: get().count - 1,
      });
    },
    toggleUpdated: (val: boolean) => {
      set({
        refetch: val,
      });
    },
  }));
};
