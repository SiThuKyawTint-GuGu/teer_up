'use client';
import appAxios from '@/lib/appAxios';
import { USER_ROLE } from '@/shared/enums';
import { User } from '@/types/User';
import { routeFilter } from '@/utils';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

type RegisterArgType = {
  arg: { email: string; password: string };
};

export interface ParamsType {
  page?: number;
  pageSize?: number;
  name?: string;
  role?: USER_ROLE;
}

type RegisterResType = {};
export const useRegister = () =>
  useSWRMutation(`/auth/sign-up`, (url, { arg }: RegisterArgType) =>
    appAxios.post<RegisterResType>(url, arg)
  );

type TokenResType = Pick<User, 'name'>;
export const useToken = (identityId: string, a: string) =>
  useSWR<TokenResType>(identityId && `/token/${identityId} ${a ? '?a=' + a : ''}`);

export const useUsers = (params: ParamsType) => {
  return useSWR<User>(`/user?${routeFilter(params)}`);
};
