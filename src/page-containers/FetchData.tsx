'use client';
import React, { useCallback, useEffect } from 'react';

import { Button } from '@/components/Button';
import { FetchAPI } from '@/libs/api';
import { useStore } from '@/libs/store';

const FetchData = () => {
  const fetchApi = new FetchAPI();
  const count = useStore(state => state.count);
  const increment = useStore(state => state.increment);
  const decrease = useStore(state => state.decrement);
  console.log(count);

  const fetchData = useCallback(async () => {
    const people = await fetchApi.getPeoples('people', {});
    console.log(people);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div>
      count: {count}
      <Button onClick={increment}>Increase</Button>
      <Button onClick={decrease}>Decrement</Button>
    </div>
  );
};

export default FetchData;
