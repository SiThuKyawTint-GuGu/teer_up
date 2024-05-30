"use client";
import appAxios from "@/lib/appAxios";
import { InputConfig } from "@/types/InputConfig";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";

export type ParamsType = {
  id?: number;
};

export interface InputConfigArgType {
  arg: InputConfig;
}

export const useGetInputConfig = <InputConfigResponse>(): SWRResponse<InputConfigResponse, any> => {
  return useSWR<InputConfigResponse>(`/companies/inputconfig`);
};

export const usePostInputConfig = () =>
  useSWRMutation(`/companies/inputconfig`, (url, { arg }: InputConfigArgType) => {
    return appAxios.post<InputConfigArgType>(url, arg);
  });

export const useUpdateInputConfig = (id: string) =>
  useSWRMutation(`/companies/inputconfig/${id}`, (url, { arg }: InputConfigArgType) => {
    return appAxios.put<InputConfigArgType>(url, arg);
  });

export const useDeleteInputConfig = () =>
  useSWRMutation(`/companies/inputconfig`, (url, { arg }: { arg: { id: string } }) => {
    return appAxios.delete<InputConfigArgType>(`${url}/${arg.id}`);
  });
