"use client";
import appAxios from "@/lib/appAxios";
import { USER_ROLE } from "@/shared/enums";
import { User } from "@/types/User";
import { routeFilter } from "@/utils";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";

type RegisterArgType = {
  arg: { email: string; password: string };
};

export type ParamsType = {
  page?: number;
  pageSize?: number;
  name?: string;
  role?: USER_ROLE;
};

type RegisterResType = {};
export const useRegister = () =>
  useSWRMutation(`/auth/sign-up`, (url, { arg }: RegisterArgType) =>
    appAxios.post<RegisterResType>(url, arg)
  );

type TokenResType = Pick<User, "name">;
export const useToken = (identityId: string, a: string) =>
  useSWR<TokenResType>(identityId && `/token/${identityId} ${a ? "?a=" + a : ""}`);

export const useGetUser = <ParamsType, UserResponse>(
  params: ParamsType
): SWRResponse<UserResponse, any> => {
  return useSWR<UserResponse>(`/user?${routeFilter(params)}`);
};

interface CreateUserResType {
  arg: {
    name: string;
    email: string;
    role: USER_ROLE;
  };
}
export const useCreateUser = () =>
  useSWRMutation(`/user`, (url, { arg }: CreateUserResType) => {
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
    return appAxios.delete<UpdateUserResType>(`${url}/${arg.id}`);
  });
