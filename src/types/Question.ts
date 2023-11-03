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

export interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface QuestionResponse extends Pagination {
  data: QuestionData[];
}
