export interface IndustryData {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface IndustryResponse {
  data: IndustryData[];
}
