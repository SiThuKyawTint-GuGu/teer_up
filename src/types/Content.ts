export interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ContentVideo {
  id: string;
  video_url: string;
  thumbnail: string;
  content_id: string;
}
export interface User {
  name: string;
  email: string;
}
export interface ContentEvent {}

export interface ContentArticle {}

export interface ContentData {
  id: string;
  title: string;
  description: string;
  created_at: string;
  type: 'video' | 'article' | 'event';
  updated_at: string;
  user_id: string;
  image_url: string;
  status: string;
  category_id: number;
  content_video: ContentVideo | null;
  content_event: ContentEvent | null;
  content_article: ContentArticle | null;
  content_pathways: any;
  category: string;
  user: User;
}

export interface ContentType extends Pagination {
  data: ContentData[];
}
