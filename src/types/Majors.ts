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

export interface Major {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  degree_id: number;
  degree: Degree;
}

export interface AllMajorResponse {
  data: Major[];
}
