export interface ContentCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ContentCategoryResponse {
  data: ContentCategory[];
}
