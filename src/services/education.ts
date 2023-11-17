"use client";
import appAxios from "@/lib/appAxios";
import { USER_ROLE } from "@/shared/enums";
import { routeFilter } from "@/utils";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";

export type EducationParamsType = {
  page?: number;
  pageSize?: number;
  name?: string;
  role?: USER_ROLE;
  cursor?: number;
};

export const useGetUserEducations = <EducationParamsType, EducationResponse>(
  params?: EducationParamsType
): SWRResponse<EducationResponse, any> => {
  return useSWR<EducationResponse>(`/user/profile/educations?${routeFilter(params)}`);
};

export const useGetEducationById = <EducationResponse>(id: string): SWRResponse<EducationResponse, any> => {
  return useSWR<EducationResponse>(`/user/profile/educations/${id}`);
};

interface CreateUserResType {
  arg: {
    school_name: string;
    degree: string;
    is_present?: boolean;
    start_date: string;
    end_date: string;
  };
}
export const useCreateEducation = () =>
  useSWRMutation(`/user/profile/educations`, (url, { arg }: CreateUserResType) => {
    return appAxios.post<CreateUserResType>(url, arg);
  });

interface UpdateUserResType {
  arg: {
    educationId: string;
    school_name: string;
    degree: string;
    is_present?: boolean;
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
      is_present: arg?.is_present,
    });
  });

export const useDeleteEducation = () =>
  useSWRMutation(`/user/profile/educations`, (url, { arg }: { arg: { edu_id: string } }) => {
    return appAxios.delete(`${url}/${arg.edu_id}`);
  });
