export interface Education {
  id: number;
  school_name: string;
  degree: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  user_id: number;
}

export interface EducationResponse {
  data: Education[];
}
