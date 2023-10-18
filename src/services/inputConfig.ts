'use client';
import appAxios from '@/lib/appAxios';
import { InputConfig } from '@/types/InputConfig';
import useSWR, { SWRResponse } from 'swr';
import useSWRMutation from 'swr/mutation';

export type ParamsType = {
  id?: number;
};

export interface InputConfigArgType {
  arg: InputConfig;
}

export const useGetInputConfig = <InputConfigResponse>(): SWRResponse<InputConfigResponse, any> => {
  return useSWR<InputConfigResponse>(`/admin/inputconfig`);
};

export const usePostInputConfig = () =>
  useSWRMutation(`/admin/inputconfig`, (url, { arg }: InputConfigArgType) => {
    return appAxios.post<InputConfigArgType>(url, arg);
  });

export const useUpdateInputConfig = (id: string) =>
  useSWRMutation(`/admin/inputconfig/${id}`, (url, { arg }: InputConfigArgType) => {
    return appAxios.put<InputConfigArgType>(url, arg);
  });
