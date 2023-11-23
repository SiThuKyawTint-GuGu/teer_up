"use client";
import useSWR, { SWRResponse } from "swr";

export type ParamsType = {
  page: number;
  pagesize: number;
};

export const useGetNotifications = <ParamsType, NotificationResponse>(
  params?: ParamsType
): SWRResponse<NotificationResponse, any> => {
  return useSWR<NotificationResponse>(`/user/notifications`);
};
