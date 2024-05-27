import useSWR, { SWRResponse } from "swr";

export interface CompanyArgType {
  arg: {
    id?: string;
  };
}

export const useGetCompanies = <CompanyDataResponse>(): SWRResponse<CompanyDataResponse, any> => {
  return useSWR<CompanyDataResponse>(`/companies`);
};
