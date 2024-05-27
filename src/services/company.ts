import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";
import appAxios from "@/lib/appAxios";
import { SchoolArgType } from "@/services/school";

export interface CompanyArgType {
  arg: {
    id?: string;
  };
}

export const useCreateCompany = () =>
  useSWRMutation(`/companies`, (url, { arg }: { arg: any }) => {
    return appAxios.post<CompanyArgType>(url, arg);
  });

export const useGetCompanies = <CompanyDataResponse>(): SWRResponse<CompanyDataResponse, any> => {
  return useSWR<CompanyDataResponse>(`/companies`);
};

export const useDeleteCompany = () =>
  useSWRMutation(`/companies`, (url, { arg }: { arg: { id: string } }) => {
    return appAxios.delete<CompanyArgType>(`${url}/${arg.id}`);
  });

export const useUpdateCompany = () =>
  useSWRMutation(
    `/companies`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          id: string;
          name: string;
          email?: string;
          company_admin_id?: number;
        };
      }
    ) => {
      return appAxios.put<SchoolArgType>(`${url}/${arg.id}`, arg);
    }
  );
