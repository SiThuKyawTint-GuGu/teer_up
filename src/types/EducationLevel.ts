export interface EduLevel {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  major_id: number;
}

export interface AllEduLevelResponse {
  data: EduLevel[];
}
