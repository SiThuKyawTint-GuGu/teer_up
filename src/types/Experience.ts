export interface Experience {
  id: 5;
  created_at: string;
  updated_at: string;
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  is_present: boolean;
  user_id: number;
}

export interface ExperienceResponse {
  data: Experience[];
}

export interface ExperienceById {
  data: Experience;
}
