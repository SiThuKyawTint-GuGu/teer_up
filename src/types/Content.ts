export interface ContentResponseData {
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
