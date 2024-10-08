export interface UserDepartments {
  id: number;
  department_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  department: DepartmentData;
}

export interface DepartmentData {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  published: any;
}

export interface DepartmentResponse {
  data: {
    map: any;
    published: DepartmentData[];
  };
}

export interface UserDepartmentResponse {
  data: UserDepartments;
}
