"use client";
import appAxios from "@/lib/appAxios";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";

type DimensionArgType = {
  arg: { id?: string; name?: string; short_name?: string };
};

export type ParamsType = {
  name?: string;
};

export const useGetDimension = <DimensionResponse>(): SWRResponse<DimensionResponse, any> => {
  return useSWR<DimensionResponse>(`/admin/onboarding/dimensions`);
};

export const useGetDimensionById = <DimensionResponse>(id: string): SWRResponse<DimensionResponse, any> => {
  // const key = id != 0 ? `/admin/contentcategories/${id}` : null;
  return useSWR<DimensionResponse>(`/admin/onboarding/dimensions/${id}`);
};

export const useCreateDimension = () =>
  useSWRMutation(`/admin/onboarding/dimensions`, (url, { arg }: DimensionArgType) => {
    return appAxios.post<DimensionArgType>(url, arg);
  });

export const useUpdateDimension = () =>
  useSWRMutation(`/admin/onboarding/dimensions`, (url, { arg }: DimensionArgType) => {
    return appAxios.put<DimensionArgType>(`${url}/${arg.id}`, arg);
  });

export const useDeleteDimension = () =>
  useSWRMutation(`/admin/onboarding/dimensions`, (url, { arg }: { arg: { id: string } }) => {
    return appAxios.delete<DimensionArgType>(`${url}/${arg.id}`);
  });
