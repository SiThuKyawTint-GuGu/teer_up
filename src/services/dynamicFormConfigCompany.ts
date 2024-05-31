"use client";
import appAxios from "@/lib/appAxios";
import { FormConfig, InputConfig } from "@/types/InputConfig";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";

export type ParamsType = {
  id?: string;
};

export interface InputConfigArgType {
  arg: InputConfig;
}

export interface FormConfigArgType {
  arg: FormConfig;
}

export const useGetFormConfig = <FromConfigResponse>(): SWRResponse<FromConfigResponse, any> => {
  return useSWR<FromConfigResponse>(`/companies/formconfig`);
};

export const useGetFormConfigById = <FormType>(id: string): SWRResponse<FormType, any> => {
  const key = id != "0" ? `/companies/formconfig/${id}` : null;
  return useSWR<FormType>(key);
};

export const usePostFormConfig = () =>
  useSWRMutation(`/companies/formconfig`, (url, { arg }: FormConfigArgType) => {
    return appAxios.post<FormConfigArgType>(url, arg);
  });

export const useUpdateFormConfig = (id: string) =>
  useSWRMutation(`/companies/formconfig/${id}`, (url, { arg }: FormConfigArgType) => {
    return appAxios.put<FormConfigArgType>(url, arg);
  });

export const useDeleteFormConfig = () =>
  useSWRMutation(`/companies/formconfig`, (url, { arg }: { arg: { id: string } }) => {
    return appAxios.delete<FormConfigArgType>(`${url}/${arg.id}`);
  });
