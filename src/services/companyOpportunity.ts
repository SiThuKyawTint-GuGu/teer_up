"use client";
import useSWR, { SWRResponse } from "swr";

export const useGetCompanyOpportunity = <ContentCategoryResponse>(): SWRResponse<ContentCategoryResponse, any> => {
  return useSWR<ContentCategoryResponse>(`/companies/opportunities`);
};

export const useGetCompanyOpportunityById = <ContentCategoryResponse>(
  id: string
): SWRResponse<ContentCategoryResponse, any> => {
  const key = id != "0" ? `/companies/opportunities/${id}` : null;
  return useSWR<ContentCategoryResponse>(key);
};
