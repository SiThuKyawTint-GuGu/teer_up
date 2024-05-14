interface Major {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  school_id: number;
  majors: any[];
}

interface Degree {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  school_id: number;
  majors: Major[];
}

export interface School {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  type: string;
  school_admin_id: number;
  degrees: Degree[];
}

export interface GetAllSchoolsResponse {
  data: School[];
}

interface UserScore {
  // Define properties for user scores if available
}

export interface SchoolAdmin {
  id: number;
  created_at: string;
  updated_at: string;
  email: string;
  role: string;
  name: string;
  bio: string | null;
  last_login: string;
  profile_url: string | null;
  personal_info: string | null;
  user_scores: UserScore[];
  referred_by_user: string | null;
}

export interface SchoolAdminResponse {
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;
  message: string;
  data: SchoolAdmin[];
}

export interface ParamsType {
  page?: number;
  pageSize?: number;
  name?: string;
  role?: string;
  search?: number;
}
