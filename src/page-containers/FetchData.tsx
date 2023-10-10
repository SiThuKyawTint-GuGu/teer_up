'use client';
import React from 'react';

import { Button } from '@/components/ui/Button';
import { useApi } from '@/hooks/useApi';
import { FetchAPI } from '@/libs/api';
import { useStore } from '@/libs/store';

const FetchData = () => {
  const fetchApi = new FetchAPI();
  const count = useStore(state => state.count);
  const increment = useStore(state => state.increment);
  const decrease = useStore(state => state.decrement);

  const { data, isLoading, error } = useApi('https://swapi.dev/api/people');

  console.log('data -> ', data);
  console.log('isLoading -> ', isLoading);

  // const fetchData = useCallback(async () => {
  //   const response = await fetchApi.getPeoples('people', {});
  // }, []);

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  return (
    <div>
      count: {count}
      <Button onClick={increment}>Increase</Button>
      <Button onClick={decrease}>Decrement</Button>
    </div>
  );
};

export default FetchData;
