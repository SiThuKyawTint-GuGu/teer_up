import { ContentArticle, ContentEvent, ContentOpportunity } from "./Content";

export enum TRIGGER_TYPE {
  FILTER = "FILTER",
  UNFINISHED = "UNFINISHED",
  UNSAVED = "UNSAVED",
  UNFINISHEDPATH = "UNFINISHEDPATH",
}

export interface ContentVideo {
  id: number;
  video_url: string;
  thumbnail: string;
}

export interface Content {
  id: number;
  title: string;
  description: string;
  created_at: string;
  type: string;
  updated_at: string;
  image_url: string;
  user_id: number;
  slug: string;
  status: string;
  category_id: number;
  mentor_id: number;
  content_video: ContentVideo | null;
  content_article: ContentArticle | null;
  content_opportunity: ContentOpportunity | null;
  content_event: ContentEvent | null;
}

export interface SavedContent {
  id: number;
  user_id: number;
  content_id: number;
  created_at: string;
  updated_at: string;
  content: Content;
}

export interface UnfinishedPathway extends Omit<SavedContent, ""> {
  progress: number;
  current_content_id: number;
}

export interface SavedContentResponse {
  data: SavedContent[];
}

export interface UnfinishedPathwayResponse {
  data: UnfinishedPathway[];
}

export interface ContentHistoryData {
  last_watched_time: string;
  id: number;
  title: string;
  description: string;
  created_at: string;
  type: string;
  updated_at: string;
  image_url: string;
  user_id: number;
  slug: string;
  status: string;
  category_id: number | null;
  mentor_id: number | null;
  submit_label: string | null;
}

export interface ContentHistoryResponse {
  hasNextPage: boolean;
  current_page: number;
  per_page: number;
  order: string;
  data: ContentHistoryData[];
}
