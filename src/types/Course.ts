interface School {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  type: string;
  school_admin_id: number | null;
}

interface Degree {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  school_id: number;
  school: School;
}

interface Major {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  degree_id: number;
  degree: Degree;
}

export interface Course {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  credit: number;
  major_id: number;
  major: Major;
}

export interface AllCoursesResponse {
  data: Course[];
}
