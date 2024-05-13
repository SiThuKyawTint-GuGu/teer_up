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
