"use client";

import appAxios from "@/lib/appAxios";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";

export interface BannerArgType {
  arg: {
    id?: string;
    external_link?: string;
    is_active?: boolean;
    image_url?: string;
  };
}

interface FileArgType {
  arg: {
    file?: any;
    data?: any;
    handleProgress?: any;
  };
}

export const useDeleteBanner = () =>
  useSWRMutation(`/banner`, (url, { arg }: { arg: { id: string } }) => {
    return appAxios.delete<BannerArgType>(`${url}/${arg.id}`);
  });

export const useGetBanner = <BannerDataResponse>(): SWRResponse<BannerDataResponse, any> => {
  return useSWR<BannerDataResponse>(`/banner`);
};

export const useGetBannerById = <BannerDataResponse>(id: string): SWRResponse<BannerDataResponse, any> => {
  const key = id != "0" ? `/banner/${id}` : null;
  return useSWR<BannerDataResponse>(key);
};

export const useUpdateBanner = () =>
  useSWRMutation(`/banner`, (url, { arg }: BannerArgType) => {
    return appAxios.put<BannerArgType>(`${url}/${arg.id}`, arg);
  });

export const usePostBanner = () =>
  useSWRMutation(`/banner`, (url, { arg }: BannerArgType) => {
    return appAxios.post<BannerArgType>(url, arg);
  });

export const usePostFile = () =>
  useSWRMutation(`/banner/upload-image`, (url, { arg }: FileArgType) => {
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
