"use client";
import { routeFilter } from "@/utils";
import useSWR, { SWRResponse } from "swr";

export type ParamsType = {
  page: number;
  pagesize: number;
  status?: string;
  search?: string;
};

export const useGetMentorship = <ParamsType, MentorshipType>(
  params?: ParamsType
): SWRResponse<MentorshipType, any> => {
  return useSWR<MentorshipType>(`/mentorships?${routeFilter(params)}`);
};
