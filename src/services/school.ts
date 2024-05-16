import appAxios from "@/lib/appAxios";
import { routeFilter } from "@/utils";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";

export interface SchoolArgType {
  arg: {
    id?: string;
  };
}

export const useGetSchools = <SchoolDataResponse>(): SWRResponse<SchoolDataResponse, any> => {
  return useSWR<SchoolDataResponse>(`/schools`);
};

export const useGetDegrees = <DegreeDataResponse>(): SWRResponse<DegreeDataResponse, any> => {
  return useSWR<DegreeDataResponse>(`/schools/degrees`);
};

export const useGetMajors = <MajorDataResponse>(): SWRResponse<MajorDataResponse, any> => {
  return useSWR<MajorDataResponse>(`/schools/majors`);
};

export const useGetCourses = <CourseDataResponse>(): SWRResponse<CourseDataResponse, any> => {
  return useSWR<CourseDataResponse>(`/schools/courses`);
};

export const useGetSchoolAdmins = <ParamsType, SchoolAdmin>(params: ParamsType): SWRResponse<SchoolAdmin, any> => {
  return useSWR<SchoolAdmin>(`/user?${routeFilter(params)}`);
};

export const useCreateSchool = () =>
  useSWRMutation(`/schools`, (url, { arg }: { arg: any }) => {
    return appAxios.post<SchoolArgType>(url, arg);
  });

// update school
export const useUpdateSchool = () =>
  useSWRMutation(
    `/schools`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          id: string;
          name: string;
          email: string;
          type: string;
        };
      }
    ) => {
      return appAxios.put<SchoolArgType>(`${url}/${arg.id}`, arg);
    }
  );

export const useDeleteSchool = () =>
  useSWRMutation(`/schools`, (url, { arg }: { arg: { id: string } }) => {
    return appAxios.delete<SchoolArgType>(`${url}/${arg.id}`);
  });

export const useGetDegreeBySchoolId = <ParamsType, Degree>(params: { id: string }): SWRResponse<Degree, any> => {
  return useSWR<Degree>(`/schools/degrees/school/${params.id}`);
};

export const useCreateDegree = () =>
  useSWRMutation(`/schools/degrees`, (url, { arg }: { arg: any }) => {
    return appAxios.post<SchoolArgType>(url, arg);
  });

// update degree /schools/degrees/id
export const useUpdateDegree = () =>
  useSWRMutation(
    `/schools/degrees`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          id: string;
          name: string;
        };
      }
    ) => {
      return appAxios.put<SchoolArgType>(`${url}/${arg.id}`, arg);
    }
  );

export const useDeleteDegree = () =>
  useSWRMutation(`/schools/degrees`, (url, { arg }: { arg: { id: string } }) => {
    return appAxios.delete<SchoolArgType>(`${url}/${arg.id}`);
  });

// courses
export const useGetCoursesBySchoolId = <ParamsType, Course>(params: { id: string }): SWRResponse<Course, any> => {
  return useSWR<Course>(`/schools/courses/school/${params.id}`);
};

export const useCreateCourse = () =>
  useSWRMutation(
    `/schools/courses`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          name: string;
          credit: number;
          major_id: number;
        };
      }
    ) => {
      return appAxios.post<SchoolArgType>(url, arg);
    }
  );

export const useDeleteCourse = () =>
  useSWRMutation(`/schools/courses`, (url, { arg }: { arg: { id: string } }) => {
    return appAxios.delete<SchoolArgType>(`${url}/${arg.id}`);
  });

export const useUpdateCourse = () =>
  useSWRMutation(
    `/schools/courses`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          id: string;
          name: string;
          credit: number;
        };
      }
    ) => {
      return appAxios.put<SchoolArgType>(`${url}/${arg.id}`, arg);
    }
  );

// majors
export const useGetMajorsBySchoolId = <ParamsType, Major>(params: { id: string }): SWRResponse<Major, any> => {
  return useSWR<Major>(`/schools/majors/school/${params.id}`);
};

export const useCreateMajor = () =>
  useSWRMutation(
    `/schools/majors`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          name: string;
          degree_id: number;
        };
      }
    ) => {
      return appAxios.post<SchoolArgType>(url, arg);
    }
  );

export const useDeleteMajor = () =>
  useSWRMutation(`/schools/majors`, (url, { arg }: { arg: { id: string } }) => {
    return appAxios.delete<SchoolArgType>(`${url}/${arg.id}`);
  });

export const useGetAllMajors = <Major>(params: { id: string }): SWRResponse<Major, any> => {
  return useSWR<Major>(`/schools/majors`);
};

export const useUpdateMajor = () =>
  useSWRMutation(
    `/schools/majors`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          id: string;
          name: string;
          degree_id: number;
        };
      }
    ) => {
      return appAxios.put<SchoolArgType>(`${url}/${arg.id}`, arg);
    }
  );
