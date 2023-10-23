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
export interface ContentEvent {
  id: number;
  from_datetime: string;
  to_datetime: string;
  location: string;
  content_id: string;
}

export interface ContentArticle {
  id: number;
  article_body: TrustedHTML;
  published_by: string;
  content_id: string;
}

export interface ContentOpportunity {
  id: number | string;
  form_config_id: number | string;
  link: string;
  location: string;
}
export interface ContentData {
  id: string;
  title: string;
  description: TrustedHTML;
  created_at: string;
  type: "video" | "article" | "event" | "opportunity" | "pathway";
  updated_at: string;
  user_id: string;
  image_url: string;
  slug: string;
  status: string;
  likes: number;
  is_liked: boolean;
  comments: number;
  category_id: number;
  content_video: ContentVideo | null;
  content_event: ContentEvent | null;
  content_article: ContentArticle | null;
  content_opportunity: ContentOpportunity | null;
  content_pathways: any;
  category: string;
  user: User;
}

export interface ContentType extends Pagination {
  data: ContentData[];
}

export type likeResponse = {
  message: string;
};

export interface CommentData {
  id: number | string;
  comment: string;
  user_id: number | string;
  content_id: number | string;
  parent_id: null;
  created_at: string;
  updated_at: string;
  user: {
    name: string;
    id: string | number;
    email: string;
  };
  replies: [];
}
export interface CommentResponse {
  data: CommentData[];
  hasNextPage: boolean;
}
