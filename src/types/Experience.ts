export interface Experience {
  id: number;
  created_at: string;
  updated_at: string;
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  is_present: boolean;
  user_id: number;
  employment_type: string;
  location: string;
  description:string;
}

export interface ExperienceResponse {
  data: Experience[];
}

export interface ExperienceById {
  data: Experience;
}
