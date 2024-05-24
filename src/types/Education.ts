export interface Education {
  degree_id: any;
  other_school_degree: ReactNode;
  other_school_name: ReactNode;
  school_id: any;
  school: any;
  degree_relation: any;
  id: number;
  school_name: string;
  degree: string;
  start_date: string;
  end_date: string;
  is_present: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
  major: any;
  other_school_major: ReactNode;
}

export interface EducationResponse {
  data: Education[];
}

export interface EducationById {
  data: Education;
}
