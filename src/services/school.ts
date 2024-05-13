import appAxios from "@/lib/appAxios";
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
