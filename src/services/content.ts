"use client";
import appAxios from "@/lib/appAxios";
import { routeFilter } from "@/utils";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";

export type ParamsType = {
  page?: number;
  pageSize?: number;
  id?: string;
};

export interface ContentArgType {
  arg: {
    title?: string;
    description?: string;
    type?: string;
    category_id: number;
    content_video?: {
      video_url?: string;
      thumbnail?: string;
    };
  };
}
interface FileArgType {
  arg: {
    file?: any;
    data?: any;
  };
}

export const useGetContent = <ParamsType, ContentType>(
  params?: ParamsType
): SWRResponse<ContentType, any> => {
  return useSWR<ContentType>(`/content?${routeFilter(params)}`);
};

export const useGetContentById = <ContentType>(id: string): SWRResponse<ContentType, any> => {
  const key = id != "0" ? `/content/${id}` : null;
  return useSWR<ContentType>(key);
};

// export const useUpdateContent = (id: string) =>
//   useSWRMutation(`/admin/contentcategories/${id}`, (url, { arg }: ContentArgType) => {
//     return appAxios.put<ContentArgType>(url, arg);
//   });

export const usePostContent = () =>
  useSWRMutation(`/content`, (url, { arg }: ContentArgType) => {
    return appAxios.post<ContentArgType>(url, arg);
  });

export const usePostFile = () =>
  useSWRMutation(`/content/fileupload`, (url, { arg }: FileArgType) => {
    return appAxios.post<FileArgType>(url, arg, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  });

// export const useDeleteContent = (id: string) =>
//   useSWRMutation(`/admin/contentcategories/${id}`, url => {
//     return appAxios.delete<ContentArgType>(url);
//   });
