'use client';
import { routeFilter } from '@/utils';
import useSWR, { SWRResponse } from 'swr';

export type ParamsType = {
  page?: number;
  pageSize?: number;
};

export const useGetContent = <ParamsType, ContentType>(
  params: ParamsType
): SWRResponse<ContentType, any> => {
  return useSWR<ContentType>(`/content?${routeFilter(params)}`);
};
