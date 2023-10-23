"use client";
import useSWR, { SWRResponse } from "swr";

export const useGetKeywords = <KeywordResponse>(): SWRResponse<KeywordResponse, any> => {
  return useSWR<KeywordResponse>(`/details/keywords`);
};
