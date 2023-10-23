"use client";
import appAxios from "@/lib/appAxios";
import { CommentResponse, ContentType } from "@/types/Content";
import { routeFilter } from "@/utils";
import useSWR, { SWRResponse } from "swr";
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite";
import useSWRMutation from "swr/mutation";
export type ParamsType = {
  page?: number;
  pageSize?: number;
  name?: string;
  cursor?: number;
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
export const useGetContentInfinite = <ParamsType>(
  params?: ParamsType
): SWRInfiniteResponse<ContentType> => {
  const getKey = () => `/content?${routeFilter(params)}`;
  return useSWRInfinite<ContentType>(getKey);
};

export const useGetContent = <ParamsType, ContentType>(
  params?: ParamsType
): SWRResponse<ContentType, any> => {
  return useSWR<ContentType>(`/content?${routeFilter(params)}`);
};

export const useGetContentById = <ContentType>(id: string): SWRResponse<ContentType, any> => {
  const key = id != "0" ? `/content/${id}` : null;
  return useSWR<ContentType>(key);
};

export const useUpdateContent = (id: string) =>
  useSWRMutation(`/content/${id}`, (url, { arg }: ContentArgType) => {
    return appAxios.put<ContentArgType>(url, arg);
  });

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

export const useDeleteContent = () =>
  useSWRMutation(`/content`, (url, { arg }: { arg: { id: string } }) => {
    return appAxios.delete<ContentArgType>(`${url}/${arg.id}`);
  });

type LikContentResType = {
  arg: {
    id: number | string;
  };
};
export const useLikeContent = () =>
  useSWRMutation(`/content/like`, (url, { arg }: LikContentResType) => {
    return appAxios.post<LikContentResType>(`${url}/${arg.id}`, arg);
  });

type CommentArgType = {
  arg: {
    id: number | string;
    comment: string;
    parent_id?: number | string;
  };
};
export const usePostComment = () =>
  useSWRMutation(`/content`, (url, { arg }: CommentArgType) => {
    return appAxios.post<CommentArgType>(`${url}/${arg.id}/comments`, arg);
  });

export const useGetComment = <ParamsType>(
  id: number | string,
  params?: ParamsType
): SWRInfiniteResponse => {
  const getKey = () => `/content/${id}/comments?${routeFilter(params)}`;
  return useSWRInfinite<CommentResponse>(getKey);
};

export const useGetContentBySlug = <ContentData>(slug: string): SWRResponse => {
  const url = `content/slug/${slug}`;
  return useSWR<ContentData>(url);
};

// saved content

export const useGetSavedContents = <SavedContentType>(
  params?: ParamsType
): SWRResponse<SavedContentType, any> => {
  return useSWR<SavedContentType>(`/content/save?${routeFilter(params)}`);
};
