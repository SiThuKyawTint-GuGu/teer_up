"use client";
import appAxios from "@/lib/appAxios";
import { CommentResponse } from "@/types/Content";
import { routeFilter } from "@/utils";
import { getToken } from "@/utils/auth";
import useSWR, { SWRResponse } from "swr";
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite";
import useSWRMutation from "swr/mutation";

export type ParamsType = {
  page?: number;
  pagesize?: number;
  name?: string;
  cursor?: number;
  type?: string;
  search?: string;
};

export interface ContentArgType {
  arg: {
    title?: string;
    description?: string;
    type?: string;
    category_id: number;
    content_video?: {
      video_url?: string;
      thumbnail?: string;
    };
  };
}
interface FileArgType {
  arg: {
    file?: any;
    data?: any;
    handleProgress?: any;
  };
}

export const useGetContentInfinite = <ParamsType>(params?: ParamsType): SWRInfiniteResponse<any> => {
  const getKey = (pageIndex: number, previousPageData: any) => {
    // Use the previous page data to determine if this is the first request
    if (previousPageData) return null;

    // Return the API endpoint with the page index
    return `/content?${routeFilter(params)}`;
  };
  return useSWRInfinite<any>(getKey, {
    revalidateFirstPage: true,
    revalidateAll: true,
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    parallel: true,
  });
};

export const useGetBrowseInfinite = ({
  search,
  type,
}: {
  search: string | null;
  type: string;
}): SWRInfiniteResponse => {
  return useSWRInfinite(
    (index: number) => `/content/browse?page=${index + 1}&type=${type}&pagesize=10&search=${search}`,
    {
      revalidateFirstPage: true,
      revalidateAll: true,
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      parallel: false,
    }
  );
};

export const useGetContent = <ParamsType, ContentType>(params?: ParamsType): SWRResponse<ContentType, any> => {
  return useSWR<ContentType>(`/admin/contents?${routeFilter(params)}`);
};

export const useGetContentById = <ContentType>(id: string): SWRResponse<ContentType, any> => {
  const key = id != "0" ? `/content/${id}` : null;
  return useSWR<ContentType>(key);
};

export const useUpdateContent = (id: string) =>
  useSWRMutation(`/content/${id}`, (url, { arg }: ContentArgType) => {
    return appAxios.put<ContentArgType>(url, arg);
  });

export const usePostContent = () =>
  useSWRMutation(`/content`, (url, { arg }: ContentArgType) => {
    return appAxios.post<ContentArgType>(url, arg);
  });

export const usePostFile = () =>
  useSWRMutation(`/content/fileupload`, (url, { arg }: FileArgType) => {
    return appAxios.post<{ data: { file_path: string } }>(url, arg, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent: any) => {
        if (arg.handleProgress) {
          const uploadPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          arg.handleProgress(uploadPercentage);
        }
      },
    });
  });

export const useDeleteContent = () =>
  useSWRMutation(`/content`, (url, { arg }: { arg: { id: string } }) => {
    return appAxios.delete<ContentArgType>(`${url}/${arg.id}`);
  });

type LikContentResType = {
  arg: {
    id: number | string;
  };
};
export const useLikeContent = () =>
  useSWRMutation(`/content/like`, (url, { arg }: LikContentResType) => {
    return appAxios.post(`${url}/${arg.id}`, arg);
  });

type CommentArgType = {
  arg: {
    id: number | string;
    comment?: string;
    parent_id?: number | string;
  };
};
export const usePostComment = () =>
  useSWRMutation(`/content`, (url, { arg }: CommentArgType) => {
    return appAxios.post(`${url}/${arg.id}/comments`, arg);
  });
type saveContentArg = {
  arg: {
    id: number | string;
  };
};
export const useSaveContent = () =>
  useSWRMutation(`/content/save`, (url, { arg }: saveContentArg) => {
    return appAxios.post(`${url}/${arg.id}`, arg);
  });

export const useLikeComment = () =>
  useSWRMutation(`/content`, (url, { arg }: CommentArgType) => {
    return appAxios.post(`${url}/${arg.parent_id}/comments/${arg.id}/likes`, arg);
  });

// const getKey = (pageIndex: number) => {
//   return `/demo?page=${pageIndex + 1}`;
// };

// const { data, isLoading } = useSWRInfinite(getKey, {
//   revalidateFirstPage: false,
//   revalidateAll: true,
//   parallel: true,
// });

// const demos: Demo[] = useMemo(
//   () => data?.flatMap((page) => page?.data) || [],
//   [data]
// );

export const useGetComment = (id: number | string): SWRInfiniteResponse => {
  const getKey = (index: number) => `/content/${id}/comments?cursor=${index}&pagesize=30`;
  return useSWRInfinite<CommentResponse>(getKey, {
    revalidateFirstPage: true,
    revalidateAll: true,
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    parallel: false,
  });
};

export const useGetContentBySlug = <ContentData>(slug: string): SWRResponse => {
  const url = `content/slug/${slug}`;
  return useSWR<ContentData>(url);
};

// saved content
export enum SAVED_CONTENT_TYPES {
  ALL = "all",
  ARTICLE = "article",
  EVENT = "event",
  OPPORTUNITY = "opportunity",
  PATHWAY = "pathway",
  VIDEO = "video",
  MENTOR = "mentor",
}

export type SavedContentParams = {
  page?: number;
  pagesize?: number;
  type?: SAVED_CONTENT_TYPES | string;
  status?: string;
};

export const useGetSavedContents = <SavedContentParams, SavedContentResponse>(
  params?: SavedContentParams
): SWRResponse<SavedContentResponse, any> => {
  return useSWR<SavedContentResponse>(`/content/save?${routeFilter(params)}`);
};

type PostOnBoardingArg = {
  arg: {
    question_id: string | number;
    option_id: string | number;
  };
};

export const usePostOnboarding = () =>
  useSWRMutation(`/user/onboarding`, (url, { arg }: PostOnBoardingArg) => {
    return appAxios.post(url, arg);
  });
type RequestMentorShipArg = {
  arg: {
    content_id: number | string;
    message: string;
  };
};
export const useRequestMentorship = () =>
  useSWRMutation(`/mentorships`, (url, { arg }: RequestMentorShipArg) => {
    return appAxios.post(url, arg);
  });

interface ContentFormArg {
  arg: {
    content_id: string | number;
    formconfig_id: number | string;
    inputs: {
      inputconfig_id: number | string;
      value: string;
    }[];
  };
}

export const useContentForm = () =>
  useSWRMutation(`/forms`, (url, { arg }: ContentFormArg) => {
    return appAxios.post(url, arg);
  });

export interface SearchParamsType {
  type?: string;
  status?: string;
  search: string;
  pageSize?: number;
  page?: number;
}
export const useGetContentSearch = <SearchParamsType, ContentType>(
  params: SearchParamsType
): SWRResponse<ContentType, any> => {
  return useSWR<ContentType>(`/content/search?${routeFilter(params)}`);
};

interface WatchCountArg {
  arg: {
    watched_time: number;
    content_id: number | string;
  };
}
export const useContentWatchCount = () =>
  useSWRMutation(`/content/watch-count`, (url, { arg }: WatchCountArg) => {
    return appAxios.post(url, arg);
  });

interface SkipOnboardingArg {
  arg: {
    skip: boolean;
  };
}

export const useSkipOnboarding = () =>
  useSWRMutation(`/user/onboarding/status`, (url, { arg }: SkipOnboardingArg) => {
    return appAxios.put(url, arg);
  });

export const useGetOnboardingStatus = () => {
  const token = getToken();
  return useSWR(token ? `/user/onboarding/status` : null);
};

export const useGetOnboardingQuestions = (params?: ParamsType): SWRResponse => {
  const token = getToken();
  return useSWR(token ? `user/onboarding?${routeFilter(params)}` : null);
};
