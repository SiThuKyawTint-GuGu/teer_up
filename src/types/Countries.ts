export interface Countries {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
}

export interface CountriesResponse {
  data: Countries[];
}
