"use client";
import appAxios from "@/lib/appAxios";
import { USER_ROLE } from "@/shared/enums";
import { User } from "@/types/User";
import { routeFilter } from "@/utils";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";

type RegisterArgType = {
  arg: { email: string; name: string };
};

export type ParamsType = {
  page?: number;
  pageSize?: number;
  name?: string;
  role?: USER_ROLE;
};

type TokenResType = Pick<User, "name">;
export const useToken = (identityId: string, a: string) =>
  useSWR<TokenResType>(identityId && `/token/${identityId} ${a ? "?a=" + a : ""}`);

export const useGetUser = <ParamsType, UserResponse>(
  params: ParamsType
): SWRResponse<UserResponse, any> => {
  return useSWR<UserResponse>(`/user?${routeFilter(params)}`);
};

interface UpdateUserResType {
  arg: {
    name: string;
  };
}
export const useUpdateUser = (userId: string) =>
  useSWRMutation(`/user/${userId}`, (url, { arg }: UpdateUserResType) => {
    return appAxios.put<UpdateUserResType>(url, arg);
  });

export const useDeleteUser = (userId: string) =>
  useSWRMutation(`/user/${userId}`, url => {
    return appAxios.delete<UpdateUserResType>(url);
  });
export const useRegister = () =>
  useSWRMutation(`/user/register`, (url, { arg }: RegisterArgType) =>
    appAxios.post<RegisterArgType>(url, arg)
  );
