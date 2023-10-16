'use client';
import { routeFilter } from '@/utils';
import useSWR, { SWRResponse } from 'swr';

export type ParamsType = {
  page?: number;
  pageSize?: number;
};

export const useGetBlogBySlug = <UserResponse>(
  slug: string,
  params?: ParamsType
): SWRResponse<UserResponse, any> => {
  return useSWR<UserResponse>(`/admin/blog/${slug}?${routeFilter(params)}`);
};
