export interface User {
  id: number;
  created_at: string;
  updated_at: string;
  email: string;
  password: string;
  name: string;
  role: string;
  bio: string;
  profile_url: string;
  cover_url: string;
  country_id: number;
  verified: boolean;
}

export type UserResponse = {
  current_page?: number;
  data?: User[];
  last_page?: number;
  per_page?: number;
  total?: number;
};

export interface TokenData {
  token: string;
}

export interface AuthResponse {
  data: User;
  token: string;
}

export interface Error {
  message: string;
}

export interface OtpResponse {
  message: string;
}

// gender
export interface Gender {
  id: number;
  type: string;
  created_at: string;
  updated_at: string;
}
