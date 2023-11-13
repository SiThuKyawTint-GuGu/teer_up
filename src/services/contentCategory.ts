"use client";
import appAxios from "@/lib/appAxios";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";

type ContentCategoryArgType = {
  arg: { id?: string; name?: string };
};

export type ParamsType = {
  name?: string;
};

export const useGetContentCategory = <ContentCategoryResponse>(): SWRResponse<ContentCategoryResponse, any> => {
  return useSWR<ContentCategoryResponse>(`/admin/contentcategories`);
};

export const useGetContentCategoryById = <ContentCategoryResponse>(
  id: string
): SWRResponse<ContentCategoryResponse, any> => {
  const key = id != "0" ? `/admin/contentcategories/${id}` : null;
  return useSWR<ContentCategoryResponse>(key);
};

export const useCreateContentCategory = () =>
  useSWRMutation(`/admin/contentcategories`, (url, { arg }: ContentCategoryArgType) => {
    return appAxios.post<ContentCategoryArgType>(url, arg);
  });

export const useUpdateContentCategory = () =>
  useSWRMutation(`/admin/contentcategories`, (url, { arg }: ContentCategoryArgType) => {
    return appAxios.put<ContentCategoryArgType>(`${url}/${arg.id}`, arg);
  });

export const useDeleteContentCategory = () =>
  useSWRMutation(`/admin/contentcategories`, (url, { arg }: { arg: { id: string } }) => {
    return appAxios.delete<ContentCategoryArgType>(`${url}/${arg.id}`);
  });
