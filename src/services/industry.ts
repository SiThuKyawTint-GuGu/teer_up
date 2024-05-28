"use client";
import appAxios from "@/lib/appAxios";
import appAxiosVersion2 from "@/lib/appAxiosVersion2";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";

type IndustryArgType = {
  arg: { id?: number | string; name?: string; departments?: number[]; industry_id?: number; is_published?: boolean };
};

export type ParamsType = {
  name?: string;
};

export const useGetIndustry = <IndustryResponse>(params?: string): SWRResponse<IndustryResponse, any> => {
  return useSWR<IndustryResponse>(`/details/industries${params ? `?search=${params}` : ""}`);
};

export const useGetIndustryList = <IndustryResponse>(): SWRResponse<IndustryResponse, any> => {
  return useSWR<IndustryResponse>(`/details/industries`, () =>
    appAxiosVersion2.get(`/details/industries`).then(res => res.data)
  );
};

export const useUpdateIndustryList = () =>
  useSWRMutation(`/user/profile/industries`, (url, { arg }: { arg: { industry_id: number } }) => {
    return appAxios.put<{ arg: { industry_id: number } }>(url, arg);
  });

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


// export const useUpdateUserIndustryById = () =>
//   useSWRMutation(`/details/profile/industries`, (url, { arg }: IndustryArgType) => {
//     return appAxiosVersion2.put<IndustryArgType>(`${url}/${arg.id}`, arg);
//   });
