import appAxios from "@/lib/appAxios";
import { routeFilter } from "@/utils";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";
export const useGetContent = <ParamsType, ContentType>(
  params: ParamsType
): SWRResponse<ContentType, any> => {
  return useSWR<ContentType>(`/content?${routeFilter(params)}`);
};

export const useLikeContent = <likeResponse>(contentId: string) =>
  useSWRMutation(`/content/like/${contentId}`, url => {
    return appAxios.post<likeResponse>(url);
  });
