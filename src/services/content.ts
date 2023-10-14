'use client';
import appAxios from '@/lib/appAxios';
import { routeFilter } from '@/utils';
import useSWR, { SWRResponse } from 'swr';

export type ParamsType = {
  page?: number;
  pageSize?: number;
  id?: string;
};

export interface ContentArgType {
  title: string;
  description: string;
  type?: string;
  status?: string;
  image_url?: string;
  category_id?: number;
}

export const useGetContent = <ParamsType, ContentType>(
  params: ParamsType
): SWRResponse<ContentType, any> => {
  return useSWR<ContentType>(`/content?${routeFilter(params)}`);
};

export const useGetContentById = <ParamsType, ContentType>(
  params: ParamsType
): SWRResponse<ContentType, any> => {
  return useSWR<ContentType>(`/content?${routeFilter(params)}`);
};

export const usePostContent = async (arg: ContentArgType) => {
  try {
    const response = await appAxios.post<any>('/content', arg, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Handle response if needed
    console.log('Post request successful:', response.data);

    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error posting content:', error);
    throw new Error('Failed to post content');
  }
};
