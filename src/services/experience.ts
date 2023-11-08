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

export const useGetEducationById = <EducationResponse>(id: string): SWRResponse<EducationResponse, any> => {
  return useSWR<EducationResponse>(`/user/profile/educations/${id}`);
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
    educationId: string;
    school_name: string;
    degree: string;
    start_date: string;
    end_date: string;
  };
}
export const useUpdateEducation = () =>
  useSWRMutation(`/user/profile/educations`, (url, { arg }: UpdateUserResType) => {
    return appAxios.put<UpdateUserResType>(`${url}/${arg.educationId}`, {
      school_name: arg?.school_name,
      degree: arg?.degree,
      start_date: arg?.start_date,
      end_date: arg?.end_date,
    });
  });

export const useDeleteEducation = () =>
  useSWRMutation(`/user/profile/educations`, (url, { arg }: { arg: { edu_id: string } }) => {
    return appAxios.delete(`${url}/${arg.edu_id}`);
  });
