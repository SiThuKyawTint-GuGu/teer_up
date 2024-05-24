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

// export const useGetDegrees = <EducationResponse>(): SWRResponse<EducationResponse, any> => {
//   return useSWR<EducationResponse>(`/schools/degrees`);
// };

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
    school_id: string;
    degree_id: string;
    major_id: string;
    is_present?: boolean;
    start_date: string;
    end_date: string;
    other_school_name:string,
    other_school_major:string,
    other_school_degree:string,
  };
}
export const useUpdateEducation = () =>
  useSWRMutation(`/user/profile/educations`, (url, { arg }: UpdateUserResType) => {
    return appAxios.put<UpdateUserResType>(`${url}/${arg.educationId}`, {
      school_id: arg?.school_id,
      degree_id: arg?.degree_id,
      major_id: arg?.major_id,
      start_date: arg?.start_date,
      end_date: arg?.end_date,
      is_present: arg?.is_present,
      other_school_name: arg?.other_school_name,
      other_school_major: arg?.other_school_major,
      other_school_degree: arg?.other_school_degree,
    });
  });

export const useDeleteEducation = () =>
  useSWRMutation(`/user/profile/educations`, (url, { arg }: { arg: { edu_id: string } }) => {
    return appAxios.delete(`${url}/${arg.edu_id}`);
  });
