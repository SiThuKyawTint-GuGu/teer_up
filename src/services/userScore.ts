"use client";
import useSWR, { SWRResponse } from "swr";

export const useGetUserScores = <UserScoreResponse>(id: string): SWRResponse<UserScoreResponse, any> => {
  return useSWR<UserScoreResponse>(`/admin/users/${id}/scores`);
};
