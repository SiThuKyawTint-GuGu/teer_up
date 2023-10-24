"use client";
import appAxios from "@/lib/appAxios";
import { USER_ROLE } from "@/shared/enums";
import { AuthResponse } from "@/types/User";
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

export const useGetUsers = <ParamsType, User>(params: ParamsType): SWRResponse<User, any> => {
  return useSWR<User>(`/user?${routeFilter(params)}`);
};

export const useGetUserById = <UserProfileResponse>(
  id: string,
  params?: ParamsType
): SWRResponse<UserProfileResponse, any> => {
  return useSWR<UserProfileResponse>(`/user/${id}?${routeFilter(params)}`);
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
    return appAxios.delete(`${url}/${arg.id}`);
  });

interface UpdatePersonalInfoType {
  arg: {
    gender_id: number;
    birthday: string;
  };
}
export const useUpdatePersonalInfo = () =>
  useSWRMutation(`/user/profile/personalinfo`, (url, { arg }: UpdatePersonalInfoType) => {
    return appAxios.put<UpdatePersonalInfoType>(`${url}`, arg);
  });

interface RegisterArgType {
  arg: {
    name: string;
    email: string;
    country: number | string;
  };
}
export const useUserRegister = () => {
  return useSWRMutation(`/user/register`, (url, { arg }: RegisterArgType) => {
    return appAxios.post<AuthResponse>(url, arg);
  });
};

interface LoginArgType {
  arg: {
    email: string;
  };
}
export const useUserLogin = () => {
  return useSWRMutation(`/user/login`, (url, { arg }: LoginArgType) => {
    return appAxios.post<AuthResponse>(url, arg);
  });
};

interface OtpArgType {
  arg: {
    verificationCode: string;
  };
}
export const useOtpVerified = () => {
  return useSWRMutation(`/user/verifyotp`, (url, { arg }: OtpArgType) => {
    return appAxios.post<AuthResponse>(url, arg);
  });
};

export const useGetOtp = () => {
  return useSWRMutation(`/user/requestotp`, url => {
    return appAxios.post<AuthResponse>(url);
  });
};

// gender
export const useGetGenders = <Gender>(): SWRResponse<Gender, any> => {
  return useSWR<Gender>(`/details/genders`);
};

// bio
export const useUpdateBio = () =>
  useSWRMutation(`/user/profile/bio`, (url, { arg }: { arg: { bio: string } }) => {
    return appAxios.put<{ arg: { bio: string } }>(`${url}`, arg);
  });
