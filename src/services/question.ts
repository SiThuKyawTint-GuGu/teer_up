"use client";
import appAxios from "@/lib/appAxios";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";

export type ParamsType = {
  page?: number;
  pageSize?: number;
  name?: string;
};

export interface QuestionArgType {
  arg: {
    id?: string;
    name?: string;
    link?: string;
    is_public?: boolean;
    category_id: number;
    content: any;
    formconfig_id: number;
  };
}

export const useGetQuestion = <QuestionType>(): SWRResponse<QuestionType, any> => {
  return useSWR<QuestionType>(`/admin/onboarding/questions`);
};

export const useGetQuestionById = <QuestionType>(id: string): SWRResponse<QuestionType, any> => {
  const key = id != "0" ? `/admin/onboarding/questions/${id}` : null;
  return useSWR<QuestionType>(key);
};

export const usePostQuestion = () =>
  useSWRMutation(`/admin/onboarding/questions`, (url, { arg }: QuestionArgType) => {
    return appAxios.post<QuestionArgType>(url, arg);
  });

export const useUpdateQuestion = (id: string) =>
  useSWRMutation(`/admin/onboarding/questions/${id}`, (url, { arg }: QuestionArgType) => {
    return appAxios.put<QuestionArgType>(url, arg);
  });

export const useDeleteQuestion = () =>
  useSWRMutation(`/admin/onboarding/questions`, (url, { arg }: { arg: { id: string } }) => {
    return appAxios.delete<QuestionArgType>(`${url}/${arg.id}`);
  });
