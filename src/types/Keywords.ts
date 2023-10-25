export interface KeywordsData {
  id: number;
  keyword: string;
  created_at: string;
  updated_at: string;
}

export interface KeywordResponse {
  data: KeywordsData[];
}
