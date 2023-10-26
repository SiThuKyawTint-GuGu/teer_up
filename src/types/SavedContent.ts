import { ContentPathway } from "./Content";
import { ContentCategory } from "./ContentCategory";
import { User } from "./User";

export interface SavedContent {
  id: number;
  title: string;
  description: string;
  created_at: string;
  type: string;
  image_url: string;
  user_id: number;
  slug: string;
  status: string;
  likes: number;
  comments: number;
  category: ContentCategory;
  content_video: null;
  content_event: null;
  content_article: null;
  content_pathways: ContentPathway[];
  content_opportunity: null;
  user: User;
  is_liked: boolean;
  is_saved: boolean;
  watched_count: number;
}

export interface SavedContentResponse {
  data: SavedContent[];
}
