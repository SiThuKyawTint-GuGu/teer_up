"use client";
import appAxios from "@/lib/appAxios";
import { USER_ROLE } from "@/shared/enums";
import { routeFilter } from "@/utils";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";

export type ParamsType = {
  page?: number;
  pageSize?: number;
  name?: string;
  role?: USER_ROLE;
  cursor?: number;
};

export const useGetUserEducations = <ParamsType, User>(
  params?: ParamsType
): SWRResponse<User, any> => {
  return useSWR<User>(`/user/profile/education?${routeFilter(params)}`);
};

export const useGetUserById = <UserProfileResponse>(
  id: string,
  params?: ParamsType
): SWRResponse<UserProfileResponse, any> => {
  return useSWR<UserProfileResponse>(`/user/${id}?${routeFilter(params)}`);
};

interface CreateUserResType {
  arg: {
    school_name: string;
    degree: string;
    start_date: string;
    end_date: string;
  };
}
export const useCreateEducation = () =>
  useSWRMutation(`/user/profile/education`, (url, { arg }: CreateUserResType) => {
    return appAxios.post<CreateUserResType>(url, arg);
  });

interface UpdateUserResType {
  arg: {
    name: string;
    id: string;
  };
}
export const useUpdateUser = () =>
  useSWRMutation(`/user`, (url, { arg }: UpdateUserResType) => {
    return appAxios.put<UpdateUserResType>(`${url}/${arg.id}`, arg);
  });

export const useDeleteUser = () =>
  useSWRMutation(`/user`, (url, { arg }: { arg: { id: string } }) => {
    return appAxios.delete(`${url}/${arg.id}`);
  });
