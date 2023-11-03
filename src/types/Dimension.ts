export interface DimensionData {
  id: number;
  name: string;
  short_name: string;
  low_body?: string;
  high_body?: string;
  medium_body?: string;
  pathway_id?: string;
}

export interface DimensionResponse {
  data: DimensionData[];
}
