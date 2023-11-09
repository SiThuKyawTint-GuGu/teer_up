"use client";
import appAxios from "@/lib/appAxios";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";

type IndustryArgType = {
  arg: { id?: string; name?: string; departments?: number[]; industry_id?: number; is_published?: boolean };
};

export type ParamsType = {
  name?: string;
};

export const useGetIndustry = <IndustryResponse>(): SWRResponse<IndustryResponse, any> => {
  return useSWR<IndustryResponse>(`/details/industries`);
};

export const useGetIndustryById = <IndustryResponse>(id: string): SWRResponse<IndustryResponse, any> => {
  const key = id != "0" ? `/details/industries/${id}` : null;
  return useSWR<IndustryResponse>(key);
};

export const useCreateIndustry = () =>
  useSWRMutation(`/details/industries`, (url, { arg }: IndustryArgType) => {
    return appAxios.post<IndustryArgType>(url, arg);
  });

export const useUpdateIndustry = () =>
  useSWRMutation(`/details/industries`, (url, { arg }: IndustryArgType) => {
    return appAxios.put<IndustryArgType>(`${url}/${arg.id}`, arg);
  });

export const useUpdateJoinDepartment = () =>
  useSWRMutation(`/details/join-departments`, (url, { arg }: IndustryArgType) => {
    return appAxios.put<IndustryArgType>(`${url}`, arg);
  });

export const useDeleteIndustry = () =>
  useSWRMutation(`/details/industries`, (url, { arg }: { arg: { id: string } }) => {
    return appAxios.delete<IndustryArgType>(`${url}/${arg.id}`);
  });

export const useUpdateUserIndustry = () =>
  useSWRMutation(`/user/onboarding/industries`, (url, { arg }: { arg: { industries: number[] } }) => {
    return appAxios.put(url, arg);
  });
