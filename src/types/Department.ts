export interface DepartmentData {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface DepartmentResponse {
  data: DepartmentData[];
}
