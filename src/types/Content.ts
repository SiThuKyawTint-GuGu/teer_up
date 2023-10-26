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

export interface OnBoardingOption {
  id: number | string;
  name: string;
  score: number;
  feedback: string;
}

export interface ContentPathway {
  content_id: number;
  created_at: Date;
  id: number;
  path_way_id: number;
  upadated_at: Date;
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
  description: string;
  created_at: string;
  type: "video" | "article" | "event" | "opportunity" | "pathway" | "onboarding";
  updated_at: string;
  user_id: string;
  image_url: string;
  slug: string;
  status: string;
  likes: number;
  saves: number;
  is_liked: boolean;
  is_saved: boolean;
  comments: number;
  category_id: number;
  content_video: ContentVideo | null;
  content_event: ContentEvent | null;
  content_article: ContentArticle | null;
  content_opportunity: ContentOpportunity | null;
  content_pathways: ContentPathway[] | null;
  category: string;
  user: User;
  name: string;
  dimension_id: 1;
  options: OnBoardingOption[];
  question_type: string;
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
