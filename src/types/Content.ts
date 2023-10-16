export interface ContentData {
  id?: string;
  title?: string;
  description?: string;
  video_url: string;
  photo_url: string;
  type: string;
  user_id: string;
  status: string;
  category?: string;
  category_id?: string;
  content_article?: string;
  content_event?: string;
  content_video?: ContentVideoType;
  content_pathways: any[];
  user: UserType;
  created_at: string;
  updated_at: string;
}

export interface ContentResponseData {
  current_page?: number;
  data?: ContentData[];
  last_page?: number;
  per_page?: number;
  total?: number;
}

export interface ContentVideoType {
  content_id: string;
  id: number;
  thumbnail: string;
  video_url: string;
}

interface UserType {
  name: string;
  email: string;
}

export interface FileResponse {
  data?: {
    data?: {
      file_Path: string;
    };
  };
}
