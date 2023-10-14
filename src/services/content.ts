import { routeFilter } from '@/utils';
import useSWR, { SWRResponse } from 'swr';

export const useGetContent = <ParamsType, ContentType>(
  params: ParamsType
): SWRResponse<ContentType, any> => {
  return useSWR<ContentType>(`/content?${routeFilter(params)}`);
};
