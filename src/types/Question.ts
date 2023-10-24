export interface QuestionData {
  id: number;
  name: string;
  dimension: {};
  type: string;
  created_at: string;
  updated_at: string;
  option: [];
  demsion_id: number;
}

export interface QuestionResponse {
  data: QuestionData[];
}
