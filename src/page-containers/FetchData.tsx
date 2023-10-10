'use client';
import React, { useCallback, useEffect } from 'react';

import { FetchAPI } from '@/libs/api';

const FetchData = () => {
  const fetchApi = new FetchAPI();

  const fetchData = useCallback(async () => {
    const people = await fetchApi.getPeoples('people', {});

    console.log(people);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return <div>fetchData</div>;
};

export default FetchData;
