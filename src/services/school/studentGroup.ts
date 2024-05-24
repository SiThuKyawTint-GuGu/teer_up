import appAxios from "@/lib/appAxios";
import useSWR, { SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";

export interface StudentGroupArg {
  arg: {
    id?: string;
  };
}

export const useCreateStudentGroup = () =>
  useSWRMutation(
    `/schools/groups`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          name: string;
          school_id: number;
        };
      }
    ) => {
      return appAxios.post(url, arg);
    }
  );

export const useAddToStudentGroup = () =>
  useSWRMutation(
    `/schools/groups/add-students`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          group_id: number;
          student_emails: string[];
        };
      }
    ) => {
      return appAxios.post(url, arg);
    }
  );

export const useGetStudentGroups = <StudentGroupResponse>(): SWRResponse<StudentGroupResponse, any> => {
  return useSWR<StudentGroupResponse>(`/schools/groups`);
};

export const useGetStudentGroupById = <ParamsType, StudentGroup>(params: {
  id: string;
}): SWRResponse<StudentGroup, any> => {
  return useSWR<StudentGroup>(`/schools/groups/${params.id}`);
};

export const useUpdateStudentGroup = () =>
  useSWRMutation(
    `/schools/groups`,
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
      return appAxios.put<StudentGroupArg>(`${url}/${arg.id}`, arg);
    }
  );

export const useDeleteStudentGroup = () =>
  useSWRMutation(
    `/schools/groups`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          id: string;
        };
      }
    ) => {
      return appAxios.delete<StudentGroupArg>(`${url}/${arg.id}`);
    }
  );
