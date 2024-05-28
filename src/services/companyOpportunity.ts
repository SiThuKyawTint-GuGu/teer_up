"use client";
import appAxios from "@/lib/appAxios";
import { OpportunityContentArgType } from "@/types/CompanyOpportunity";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";

export const useGetCompanyOpportunity = <CompanyOpportunityResponse>(): SWRResponse<
  CompanyOpportunityResponse,
  any
> => {
  return useSWR<CompanyOpportunityResponse>(`/companies/opportunities`);
};

export const useGetCompanyOpportunityById = <CompanyOpportunityResponseById>(
  id: string
): SWRResponse<CompanyOpportunityResponseById, any> => {
  const key = id != "0" ? `/companies/opportunities/${id}` : null;
  return useSWR<CompanyOpportunityResponseById>(key);
};

export const usePostContentOpportunity = () =>
  useSWRMutation(`/content`, (url, { arg }: OpportunityContentArgType) => {
    return appAxios.post<OpportunityContentArgType>(url, arg);
  });
