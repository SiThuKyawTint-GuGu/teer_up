"use client";
import useSWR, { SWRResponse } from "swr";

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
