"use client";
import appAxios from "@/lib/appAxios";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";

type PreferenceArgType = {
  arg: { id?: number; name?: string };
};

export type ParamsType = {
  name?: string;
};

export const useGetPreferences = <PreferenceResponse>(): SWRResponse<PreferenceResponse, any> => {
  return useSWR<PreferenceResponse>(`/details/preferences`);
};

export const useGetPreferencesById = <PreferenceResponse>(
  id: number
): SWRResponse<PreferenceResponse, any> => {
  // const key = id != 0 ? `/admin/contentcategories/${id}` : null;
  return useSWR<PreferenceResponse>(`/details/preferences/${id}`);
};

export const useCreatePreferences = () =>
  useSWRMutation(`/details/preferences`, (url, { arg }: PreferenceArgType) => {
    return appAxios.post<PreferenceArgType>(url, arg);
  });

export const useUpdatePreferences = () =>
  useSWRMutation(`/details/preferences`, (url, { arg }: PreferenceArgType) => {
    return appAxios.put<PreferenceArgType>(`${url}/${arg.id}`, arg);
  });

export const useDeletePreferences = () =>
  useSWRMutation(`/details/preferences`, (url, { arg }: { arg: { id: string } }) => {
    return appAxios.delete<PreferenceArgType>(`${url}/${arg.id}`);
  });
