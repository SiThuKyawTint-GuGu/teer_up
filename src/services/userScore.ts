"use client";
import useSWR, { SWRResponse } from "swr";

export type ParamsType = {
  page: number;
  pagesize: number;
  status?: any;
  search?: string;
};

export const useGetUserScores = <UserScoreResponse>(): SWRResponse<UserScoreResponse, any> => {
  return useSWR<UserScoreResponse>(`/admin/users/7/scores`);
};
