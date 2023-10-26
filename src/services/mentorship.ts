import appAxios from "@/lib/appAxios";
import { USER_ROLE } from "@/shared/enums";
import { routeFilter } from "@/utils";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";
("use client");

export type ParamsType = {
  page?: number;
  pageSize?: number;
  name?: string;
  role?: USER_ROLE[] | USER_ROLE;
  cursor?: number;
};

export const useGetMentorship = <ParamsType, MentorshipResponse>(
  params: ParamsType
): SWRResponse<MentorshipResponse, any> => {
  return useSWR<MentorshipResponse>(`/mentorships?${routeFilter(params)}`);
};

export const useGetMentorshipById = <MentorshipResponse>(
  id: string,
  params?: ParamsType
): SWRResponse<MentorshipResponse, any> => {
  return useSWR<MentorshipResponse>(`/user/${id}?${routeFilter(params)}`);
};

interface RequestArgType {
  arg: {
    content_id: number;
    message: string;
  };
}
export const useRequestMentorship = () =>
  useSWRMutation(`/mentorships`, (url, { arg }: RequestArgType) => {
    return appAxios.post<RequestArgType>(url, arg);
  });

interface UpdateUserResType {
  arg: {
    name: string;
    role: string;
    id: string;
  };
}
export const useUpdateUser = () =>
  useSWRMutation(`/user`, (url, { arg }: UpdateUserResType) => {
    return appAxios.put<UpdateUserResType>(`${url}/${arg.id}`, arg);
  });
