export interface ContentData {
  id: string;
  title: string;
  description: string;
  video_url: string;
  photo_url: string;
  user: {
    name: string;
  };
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface ContentResponseData {
  current_page: number;
  data: ContentData[];
  last_page: number;
  per_page: number;
  total: number;
}
