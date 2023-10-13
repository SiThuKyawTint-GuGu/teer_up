import appAxios from "@/lib/appAxios";
import { AuthResponse, UserData } from "@/types/User";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

type RegisterArgType = {
  arg: { email: string; password: string };
};

type RegisterResType = {};
export const useRegister = () =>
  useSWRMutation(`/auth/sign-up`, (url, { arg }: RegisterArgType) =>
    appAxios.post<RegisterResType>(url, arg)
  );

export const useLogin = () =>
  useSWRMutation(`/user/login`, (url, { arg }: RegisterArgType) =>
    appAxios.post<AuthResponse>(url, arg)
  );

type TokenResType = Pick<UserData, "name">;
export const useToken = (identityId: string, a: string) =>
  useSWR<TokenResType>(identityId && `/token/${identityId} ${a ? "?a=" + a : ""}`);
