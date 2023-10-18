'use client';
import appAxios from '@/lib/appAxios';
import useSWR, { SWRResponse } from 'swr';
import useSWRMutation from 'swr/mutation';

type ContentCategoryArgType = {
  arg: { id?: number; name?: string };
};

export type ParamsType = {
  name?: string;
};

export const useGetContentCategory = <ContentCategoryResponse>(): SWRResponse<
  ContentCategoryResponse,
  any
> => {
  return useSWR<ContentCategoryResponse>(`/admin/contentcategories`);
};

export const useGetContentCategoryById = <ContentCategoryResponse>(
  id: number
): SWRResponse<ContentCategoryResponse, any> => {
  // const key = id != 0 ? `/admin/contentcategories/${id}` : null;
  return useSWR<ContentCategoryResponse>(`/admin/contentcategories/${id}`);
};

export const useUpdateContentCategory = (id: number) =>
  useSWRMutation(`/admin/contentcategories/${id}`, (url, { arg }: ContentCategoryArgType) => {
    return appAxios.put<ContentCategoryArgType>(url, arg);
  });

export const usePostContentCategory = () =>
  useSWRMutation(`/admin/contentcategories`, (url, { arg }: ContentCategoryArgType) => {
    return appAxios.post<ContentCategoryArgType>(url, arg);
  });

export const useDeleteContentCategory = (id: number) =>
  useSWRMutation(`/admin/contentcategories/${id}`, url => {
    return appAxios.delete<ContentCategoryArgType>(url);
  });
