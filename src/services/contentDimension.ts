"use client";
import appAxios from "@/lib/appAxios";
import { routeFilter } from "@/utils";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";
export type ParamsType = {
  page?: number;
  pagesize?: number;
  search?: string;
};

export interface ContentArgType {
  arg: {};
}

export const useGetContentDimension = <ParamsType, ContentType>(
  params?: ParamsType
): SWRResponse<ContentType, any> => {
  return useSWR<ContentType>(`/admin/content-dimensions?${routeFilter(params)}`);
};

export const useGetContentDimensionById = <ContentType>(
  id: string
): SWRResponse<ContentType, any> => {
  const key = id != "0" ? `/admin/content-dimensions/${id}` : null;
  return useSWR<ContentType>(key);
};

export const useUpdateContentDimension = (id: string) =>
  useSWRMutation(`/admin/content-dimensions/${id}`, (url, { arg }: ContentArgType) => {
    return appAxios.put<ContentArgType>(url, arg);
  });
