"use client";
import appAxios from "@/lib/appAxios";
import { USER_ROLE } from "@/shared/enums";
import { AuthResponse, UserScoresResponse } from "@/types/User";
import { routeFilter } from "@/utils";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";

export enum ON_BOARDING_SKIP {
  SKIP = "skip",
  COMPLETED = "completed",
  IN_PROGRESS = "in_progress",
}

export type ParamsType = {
  page?: number;
  pageSize?: number;
  name?: string;
  role?: USER_ROLE[] | USER_ROLE;
  cursor?: number;
};

export const useGetUsers = <ParamsType, User>(params: ParamsType): SWRResponse<User, any> => {
  return useSWR<User>(`/user?${routeFilter(params)}`);
};
export const useGetUser = <UserProfileResponse>(): SWRResponse<UserProfileResponse, any> => {
  return useSWR<UserProfileResponse>(`/user/profile`);
};

export const useGetUserById = <UserProfileResponse>(
  id: string,
  params?: ParamsType
): SWRResponse<UserProfileResponse, any> => {
  return useSWR<UserProfileResponse>(`/user/${id}?${routeFilter(params)}`);
};

interface CreateUserResType {
  arg: {
    name: string;
    email: string;
    role: USER_ROLE;
  };
}
export const useCreateUser = () =>
  useSWRMutation(`/user`, (url, { arg }: CreateUserResType) => {
    return appAxios.post<CreateUserResType>(url, arg);
  });

interface UpdateUserResType {
  arg: {
    name: string;
    role: string;
    id: string;
  };
}
export const useUpdateUser = () =>
  useSWRMutation(`/user`, (url, { arg }: UpdateUserResType) => {
    return appAxios.put<UpdateUserResType>(`${url}/${arg.id}`, arg);
  });

export const useDeleteUser = () =>
  useSWRMutation(`/user`, (url, { arg }: { arg: { id: string } }) => {
    return appAxios.delete(`${url}/${arg.id}`);
  });

interface UpdatePersonalInfoType {
  arg: {
    gender_id: number;
    birthday: string;
  };
}
export const useUpdatePersonalInfo = () =>
  useSWRMutation(`/user/profile/personalinfo`, (url, { arg }: UpdatePersonalInfoType) => {
    return appAxios.put<UpdatePersonalInfoType>(`${url}`, arg);
  });

interface RegisterArgType {
  arg: {
    name: string;
    email: string;
    referral_code?: string | undefined;
  };
}
export const useUserRegister = () => {
  return useSWRMutation(`/user/register`, (url, { arg }: RegisterArgType) => {
    return appAxios.post<AuthResponse>(url, arg);
  });
};

interface LoginArgType {
  arg: {
    email: string;
    token?: string;
  };
}
export const useUserLogin = () => {
  return useSWRMutation(`/user/login`, (url, { arg }: LoginArgType) => {
    return appAxios.post<AuthResponse>(url, arg);
  });
};
interface OAuthLoginArgType {
  arg: {
    accessToken: string;
  };
}
export const useOAuthLogin = () => {
  return useSWRMutation(`/user/oauth`, (url, { arg }: OAuthLoginArgType) => {
    return appAxios.post<AuthResponse>(
      url,
      {},
      {
        headers: { Authorization: arg.accessToken },
      }
    );
  });
};

interface OtpArgType {
  arg: {
    verificationCode: string;
    token?: string;
  };
}
export const useOtpVerified = () => {
  return useSWRMutation(`/user/verifyotp`, (url, { arg }: OtpArgType) => {
    return appAxios.post<AuthResponse>(url, arg);
  });
};

export const useGetOtp = () => {
  return useSWRMutation(`/user/requestotp`, url => {
    return appAxios.post<AuthResponse>(url);
  });
};

// gender
export const useGetGenders = <Gender>(): SWRResponse<Gender, any> => {
  return useSWR<Gender>(`/details/genders`);
};

// bio
export const useUpdateBio = () =>
  useSWRMutation(`/user/profile/bio`, (url, { arg }: { arg: { bio: string } }) => {
    return appAxios.put<{ arg: { bio: string } }>(`${url}`, arg);
  });

// upload images
interface UploadFileArgType {
  arg: {
    file: any;
  };
}
export const useUploadCover = () =>
  useSWRMutation(`/user/profile/cover-img`, (url, { arg }: UploadFileArgType) => {
    return appAxios.post<UploadFileArgType>(url, arg, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  });

export const useUploadProfile = () =>
  useSWRMutation(`/user/profile/profile-img`, (url, { arg }: UploadFileArgType) => {
    return appAxios.post<UploadFileArgType>(url, arg, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  });

export const useDeleteCoverPhoto = () =>
  useSWRMutation(`/user/profile/cover-img`, url => {
    return appAxios.delete(url);
  });

export const useDeleteProfilePhoto = () =>
  useSWRMutation(`/user/profile/profile-img`, url => {
    return appAxios.delete(url);
  });

export const useUpdateProfileIndustry = () =>
  useSWRMutation(`/user/profile/industries`, (url, { arg }: { arg: { industry_id: number } }) => {
    return appAxios.put<{ arg: { industry_id: number } }>(url, arg);
  });

export const useUpdateProfilePreference = () =>
  useSWRMutation(`/user/profile/preferences`, (url, { arg }: { arg: { preference_id: number } }) => {
    return appAxios.put<{ arg: { preference_id: number } }>(url, arg);
  });

export const useGetUserScores = (): SWRResponse => {
  return useSWR<UserScoresResponse>(`/user/scores`);
};

export const useGetUserOnboardingStatus = <UserOnboardingStatusResponse>(): SWRResponse<
  UserOnboardingStatusResponse,
  any
> => {
  return useSWR<UserOnboardingStatusResponse>(`/user/onboarding/status`);
};

export const useUpdateUserOnboardingStatus = () =>
  useSWRMutation(`/user/onboarding/status`, (url, { arg }: { arg: { in_progress: boolean } }) => {
    return appAxios.put<{ arg: { skip: ON_BOARDING_SKIP } }>(url, arg);
  });

export const useResetScores = () =>
  useSWRMutation(`/user/onboarding/reset-scores`, url => {
    return appAxios.post(url);
  });
