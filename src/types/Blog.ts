export interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Blog {
  id: number;
  name: string;
  link: string;
  is_public: boolean;
  content: string;
  created_at: string;
  updated_at: string;
  category_id: number;
  slug: string;
  category: Category;
}

export interface BlogResponse {
  data: Blog;
}
