"use client";
import appAxios from "@/lib/appAxios";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";

type IndustryArgType = {
  arg: { id?: number; name?: string };
};

export type ParamsType = {
  name?: string;
};

export const useGetIndustry = <IndustryResponse>(): SWRResponse<IndustryResponse, any> => {
  return useSWR<IndustryResponse>(`/details/industries`);
};

export const useGetIndustryById = <IndustryResponse>(
  id: number
): SWRResponse<IndustryResponse, any> => {
  // const key = id != 0 ? `/admin/contentcategories/${id}` : null;
  return useSWR<IndustryResponse>(`/details/industries/${id}`);
};

export const useCreateIndustry = () =>
  useSWRMutation(`/details/industries`, (url, { arg }: IndustryArgType) => {
    return appAxios.post<IndustryArgType>(url, arg);
  });

export const useUpdateIndustry = () =>
  useSWRMutation(`/details/industries`, (url, { arg }: IndustryArgType) => {
    return appAxios.put<IndustryArgType>(`${url}/${arg.id}`, arg);
  });

export const useDeleteIndustry = () =>
  useSWRMutation(`/details/industries`, (url, { arg }: { arg: { id: string } }) => {
    return appAxios.delete<IndustryArgType>(`${url}/${arg.id}`);
  });
