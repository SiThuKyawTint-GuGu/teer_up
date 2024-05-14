import appAxios from "@/lib/appAxios";
import { routeFilter } from "@/utils";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";

export interface SchoolArgType {
  arg: {
    id?: string;
  };
}

export const useGetSchools = <SchoolDataResponse>(): SWRResponse<SchoolDataResponse, any> => {
  return useSWR<SchoolDataResponse>(`/schools`);
};

export const useDeleteSchool = () =>
  useSWRMutation(`/schools`, (url, { arg }: { arg: { id: string } }) => {
    return appAxios.delete<SchoolArgType>(`${url}/${arg.id}`);
  });

export const useGetSchoolAdmins = <ParamsType, SchoolAdmin>(params: ParamsType): SWRResponse<SchoolAdmin, any> => {
  return useSWR<SchoolAdmin>(`/user?${routeFilter(params)}`);
};

export const useCreateSchool = () =>
  useSWRMutation(`/schools`, (url, { arg }: { arg: any }) => {
    return appAxios.post<SchoolArgType>(url, arg);
  });
