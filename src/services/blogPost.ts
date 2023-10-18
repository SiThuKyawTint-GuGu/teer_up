"use client";
import appAxios from "@/lib/appAxios";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";

export type ParamsType = {
  page?: number;
  pageSize?: number;
  id?: string;
};

export interface BlogsArgType {
  arg: {
    name?: string;
    link?: string;
    is_public?: boolean;
    category_id: number;
    content: any;
    formconfig_id: number;
  };
}

export const useGetBlogs = <BlogResponse>(): SWRResponse<BlogResponse, any> => {
  return useSWR<BlogResponse>(`/admin/blog`);
};

export const useGetBlogById = <BlogType>(id: string): SWRResponse<BlogType, any> => {
  const key = id != "0" ? `/admin/blog/${id}` : null;
  return useSWR<BlogType>(key);
};

export const usePostBlog = () =>
  useSWRMutation(`/admin/blog`, (url, { arg }: BlogsArgType) => {
    return appAxios.post<BlogsArgType>(url, arg);
  });

export const useUpdateBlog = (id: string) =>
  useSWRMutation(`/admin/blog/${id}`, (url, { arg }: BlogsArgType) => {
    return appAxios.put<BlogsArgType>(url, arg);
  });

export const useDeleteBlog = (id: string) =>
  useSWRMutation(`/admin/blog/${id}`, url => {
    return appAxios.delete<BlogsArgType>(url);
  });
