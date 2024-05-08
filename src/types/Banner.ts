export interface BannerData {
  id: number;
  admin_id: number;
  image_url: string;
  content_id: number | null;
  external_link_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BannerDataResponse {
  total: number;
  data: BannerData[];
}
