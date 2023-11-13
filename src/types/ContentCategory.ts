export interface ContentCategory {
  id: number;
  name: string;
  slug: string;
  icon_url?: string;
  banner_icon_url?: string;
}
export interface ContentCategoryResponse {
  data: ContentCategory[];
}
