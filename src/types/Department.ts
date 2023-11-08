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
}

export interface DepartmentResponse {
  data: DepartmentData[];
}

export interface UserDepartmentResponse {
  data: UserDepartments;
}
