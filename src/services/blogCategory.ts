"use client";
import appAxios from "@/lib/appAxios";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";

type BlogCategoryArgType = {
  arg: { id?: string; name?: string };
};

export type ParamsType = {
  name?: string;
};

export const useGetBlogCategory = <ContentCategoryResponse>(): SWRResponse<
  ContentCategoryResponse,
  any
> => {
  return useSWR<ContentCategoryResponse>(`/admin/categories`);
};

export const useGetBlogCategoryById = <ContentCategoryResponse>(
  id: string
): SWRResponse<ContentCategoryResponse, any> => {
  const key = id != "0" ? `/admin/categories/${id}` : null;
  return useSWR<ContentCategoryResponse>(key);
};

export const useUpdateBlogCategory = () =>
  useSWRMutation(`/admin/categories`, (url, { arg }: BlogCategoryArgType) => {
    return appAxios.put<BlogCategoryArgType>(`${url}/${arg.id}`, arg);
  });

export const usePostBlogCategory = () =>
  useSWRMutation(`/admin/categories`, (url, { arg }: BlogCategoryArgType) => {
    return appAxios.post<BlogCategoryArgType>(url, arg);
  });

export const useDeleteBlogCategory = () =>
  useSWRMutation(`/admin/categories`, (url, { arg }: { arg: { id: string } }) => {
    return appAxios.delete<BlogCategoryArgType>(`${url}/${arg.id}`);
  });
