"use client";
import appAxios from "@/lib/appAxios";
import { USER_ROLE } from "@/shared/enums";
import { routeFilter } from "@/utils";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";

export type ExperienceParamsType = {
  page?: number;
  pageSize?: number;
  name?: string;
  role?: USER_ROLE;
  cursor?: number;
};

export const useGetUserExperiences = <ExperienceParamsType, ExperienceResponse>(
  params?: ExperienceParamsType
): SWRResponse<ExperienceResponse, any> => {
  return useSWR<ExperienceResponse>(`/user/profile/experiences?${routeFilter(params)}`);
};

export const useGetExperienceById = <ExperienceResponse>(id: string): SWRResponse<ExperienceResponse, any> => {
  return useSWR<ExperienceResponse>(`/user/profile/experiences/${id}`);
};

interface CreateUserReqType {
  arg: {
    company: string;
    position: string;
    start_date: string;
    end_date: string;
  };
}
export const useCreateExperiences = () =>
  useSWRMutation(`/user/profile/experiences`, (url, { arg }: CreateUserReqType) => {
    return appAxios.post<CreateUserReqType>(url, arg);
  });

interface UpdateUserResType {
  arg: {
    exp_id: string;
    company: string;
    position: string;
    start_date: string;
    end_date: string;
  };
}
export const useUpdateExperience = () =>
  useSWRMutation(`/user/profile/experiences`, (url, { arg }: UpdateUserResType) => {
    return appAxios.put<UpdateUserResType>(`${url}/${arg.exp_id}`, arg);
  });

export const useDeleteEducation = () =>
  useSWRMutation(`/user/profile/educations`, (url, { arg }: { arg: { edu_id: string } }) => {
    return appAxios.delete(`${url}/${arg.edu_id}`);
  });
