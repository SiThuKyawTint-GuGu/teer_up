import { User } from "./User";

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

export interface Input_config {
  id: number;
  input_options: Input_options[] | [];
  name: string;
  placeholder: string;
  type: "text" | "radio" | "date" | "email" | "password" | "dropdown";
}

export interface Input_options {
  id: number | string;
  label: string;
  value: string;
}

export interface FormConfig {
  created_at: string;
  id: number | string;
  formdetails_configs: {
    id: number;
    input_config: Input_config[];
  }[];
  name: string;
  type: string;
  from_datetime: string;
}
export interface ContentEvent {
  id: number;
  from_datetime: string;
  to_datetime: string;
  location: string;
  content_id: string;
  body: TrustedHTML;
  formconfig_id: number | string;
  form_config: FormConfig;
}

export interface ContentArticle {
  id: number;
  article_body: TrustedHTML;
  body: TrustedHTML;
  published_by: string;
  content_id: string;
}

export interface ContentKeywords {
  id: number;
  content_id: number;
  keyword_id: number;
  created_at: Date;
  updated_at: Date;
  keyword: {
    id: number;
    keyword: string;
    created_at: Date;
    updated_at: Date;
  };
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
  body: TrustedHTML;
  formconfig_id: number | string;
  form_config: FormConfig;
}
export interface MentorEducation {
  id: number | string;
  degree: string;
  school_name: string;
  user_id: number | string;
}
export interface MentorExperience {
  company: string;
  id: number | string;
  is_present: boolean;
  position: string;
  user_id: number | string;
}

export interface MentorIndustry {}
export interface ContentMentor {
  bio: string;
  name: string;
  education: MentorEducation[];
  email: string;
  expericence: MentorExperience[];
  id: number | string;
  industries: [];
  profile_url: string;
  cover_url: string;
}
export interface ContentHome {
  data: ContentHomeData[];
}
export interface ContentHomeData {
  id: number;
  name: string;
  slug: string;
  category_contents: ContentData[] | [];
}
export interface ContentData {
  content: {
    id: string;
    title: string;
    description: string;
    created_at: string;
    type: "video" | "article" | "event" | "opportunity" | "pathway" | "onboarding" | "mentor" | "html";
    html_body: TrustedHTML;
    updated_at: string;
    user_id: string;
    image_url: string;
    slug: string;
    status: string;
    likes: number;
    saves: number;
    mentor: ContentMentor;
    is_liked: boolean;
    is_saved: boolean;
    comments: number;
    category_id: number;
    content_video: ContentVideo | null;
    content_event: ContentEvent | null;
    content_article: ContentArticle | null;
    content_opportunity: ContentOpportunity | null;
    content_pathways: ContentData[] | null;
    content_keywords: ContentKeywords[];
    category: string;
    user: User;
    name: string;
    dimension_id: 1;
    options: OnBoardingOption[];
    question_type: string;
  };
}
export interface ContentData {
  id: string;
  title: string;
  description: string;
  created_at: string;
  type: "video" | "article" | "event" | "opportunity" | "pathway" | "onboarding" | "mentor" | "html";
  html_body: TrustedHTML;
  updated_at: string;
  user_id: string;
  image_url: string;
  slug: string;
  status: string;
  likes: number;
  saves: number;
  mentor: ContentMentor;
  is_liked: boolean;
  is_saved: boolean;
  comments: number;
  category_id: number;
  content_video: ContentVideo | null;
  content_event: ContentEvent | null;
  content_article: ContentArticle | null;
  content_opportunity: ContentOpportunity | null;
  content_pathways: ContentData[] | null;
  content_keywords: ContentKeywords[];
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
  parent_id: number | null;
  created_at: string;
  updated_at: string;
  user: User;
  replies: [];
  is_liked: boolean;
  comment_likes: number;
}
export interface CommentResponse {
  data: CommentData[];
  hasNextPage: boolean;
}

export interface SkipStatusResponse {
  completed: boolean;
  created_at: Date;
  id: number;
  in_progress: boolean;
  skip: boolean;
  updated_at: Date;
  user_id: boolean;
}
