"use client";
import appAxios from "@/lib/appAxios";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";

type KeywordArgType = {
  arg: { id?: number; name?: string };
};

export type ParamsType = {
  name?: string;
};

export const useGetKeywords = <KeywordResponse>(): SWRResponse<KeywordResponse, any> => {
  return useSWR<KeywordResponse>(`/details/keywords`);
};

export const useGetKeywordsById = <KeywordResponse>(
  id: number
): SWRResponse<KeywordResponse, any> => {
  return useSWR<KeywordResponse>(`/details/keywords/${id}`);
};

export const useCreateKeywords = () =>
  useSWRMutation(`/details/keywords`, (url, { arg }: KeywordArgType) => {
    return appAxios.post<KeywordArgType>(url, arg);
  });

export const useUpdateKeywords = () =>
  useSWRMutation(`/details/keywords`, (url, { arg }: KeywordArgType) => {
    return appAxios.put<KeywordArgType>(`${url}/${arg.id}`, arg);
  });

export const useDeleteKeywords = () =>
  useSWRMutation(`/details/keywords`, (url, { arg }: { arg: { id: string } }) => {
    return appAxios.delete<KeywordArgType>(`${url}/${arg.id}`);
  });
