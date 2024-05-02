"use client";

import appAxios from "@/lib/appAxios";
import { routeFilter } from "@/utils";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";

export interface BannerArgType {
  arg: {
    link: string;
    name: string;
    image: string;
  };
}

interface FileArgType {
  arg: {
    file?: any;
    data?: any;
    handleProgress?: any;
  };
}

export const useDeleteContent = () =>
  useSWRMutation(`/admin/banners`, (url, { arg }: { arg: { id: string } }) => {
    return appAxios.delete<BannerArgType>(`${url}/${arg.id}`);
  });

export const useGetBanner = <ParamsType, ContentType>(params?: ParamsType): SWRResponse<ContentType, any> => {
  return useSWR<ContentType>(`/admin/banners?${routeFilter(params)}`);
};

export const useUpdateBanner = (id: string) =>
  useSWRMutation(`/admin/banners`, (url, { arg }: BannerArgType) => {
    return appAxios.put<BannerArgType>(`${url}/${id}`, arg);
  });

export const usePostBanner = () =>
  useSWRMutation(`/admin/banners`, (url, { arg }: BannerArgType) => {
    return appAxios.post<BannerArgType>(url, arg);
  });

export const usePostFile = () =>
  useSWRMutation(`/banners/fileupload`, (url, { arg }: FileArgType) => {
    return appAxios.post<{ data: { file_path: string } }>(url, arg, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent: any) => {
        if (arg.handleProgress) {
          const uploadPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          arg.handleProgress(uploadPercentage);
        }
      },
    });
  });
