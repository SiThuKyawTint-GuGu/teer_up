export interface DimensionData {
  id: number;
  name: string;
}

export interface DimensionResponse {
  data: DimensionData[];
}

// user dimension
export interface UserContent {
  id: number;
  title: string;
  description: string;
  slug: string;
}
export interface UserDimensionResult {
  id: number;
  name: string;
  short_name: null;
  certainty_body: string;
  skill_body: string;
  content: UserContent;
}

export interface UserDimension {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  short_name: string;
  high_body: string;
  medium_body: string;
  low_body: string;
}

export interface UserDimensionResultResponse {
  data: UserDimensionResult[];
}

export interface UserDimensionResponse {
  data: UserDimension[];
}
