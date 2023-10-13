'use client';
import appAxios from '@/lib/appAxios';
import { USER_ROLE } from '@/shared/enums';
import { User } from '@/types/User';
import { routeFilter } from '@/utils';
import useSWR, { SWRResponse } from 'swr';
import useSWRMutation from 'swr/mutation';
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

type TokenResType = Pick<User, 'name'>;
export const useToken = (identityId: string, a: string) =>
  useSWR<TokenResType>(identityId && `/token/${identityId} ${a ? '?a=' + a : ''}`);

export const useGetUser = <ParamsType, UserType>(
  params: ParamsType
): SWRResponse<UserType, any> => {
  return useSWR<UserType>(`/user?${routeFilter(params)}`);
};
