"use client";
import appAxios from "@/lib/appAxios";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";

type DepartmentArgType = {
  arg: { id?: number; name?: string };
};

export type ParamsType = {
  name?: string;
};

export const useGetDepartment = <DepartmentResponse>(): SWRResponse<DepartmentResponse, any> => {
  return useSWR<DepartmentResponse>(`/details/departments`);
};

export const useGetDepartmentById = <DepartmentResponse>(id: number): SWRResponse<DepartmentResponse, any> => {
  // const key = id != 0 ? `/admin/contentcategories/${id}` : null;
  return useSWR<DepartmentResponse>(`/details/departments/${id}`);
};

export const useCreateDepartment = () =>
  useSWRMutation(`/details/departments`, (url, { arg }: DepartmentArgType) => {
    return appAxios.post<DepartmentArgType>(url, arg);
  });

export const useUpdateDepartment = () =>
  useSWRMutation(`/details/departments`, (url, { arg }: DepartmentArgType) => {
    return appAxios.put<DepartmentArgType>(`${url}/${arg.id}`, arg);
  });

export const useDeleteDepartment = () =>
  useSWRMutation(`/details/departments`, (url, { arg }: { arg: { id: string } }) => {
    return appAxios.delete<DepartmentArgType>(`${url}/${arg.id}`);
  });

export const useUpdateUserDepartment = () =>
  useSWRMutation(`/user/onboarding/departments`, (url, { arg }: { arg: { departments: number[] } }) => {
    return appAxios.put(url, arg);
  });

export const useUpdateUserDepartmentById = () =>
  useSWRMutation(`/user/profile/departments`, (url, { arg }: { arg: { department_id: number } }) => {
    return appAxios.put<{ arg: { department_id: number } }>(url, arg);
  });
