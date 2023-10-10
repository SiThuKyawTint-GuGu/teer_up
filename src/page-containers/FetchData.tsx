'use client';
import React from 'react';

import { Button } from '@/components/ui/Button';
import { useApi } from '@/hooks/useApi';
import { useStore } from '@/libs/store';

const FetchData = () => {
  const count = useStore(state => state.count);
  const increment = useStore(state => state.increment);
  const decrease = useStore(state => state.decrement);

  const { data, isLoading, error } = useApi('https://swapi.dev/api/people');

  console.log('data -> ', data);
  console.log('isLoading -> ', isLoading);

  return (
    <div>
      count: {count}
      <Button onClick={increment}>Increase</Button>
      <Button onClick={decrease}>Decrement</Button>
    </div>
  );
};

export default FetchData;
