export interface User {
  created_at?: string;
  email?: string;
  id?: string;
  name?: string;
  role?: string;
  updated_at?: string;
  verified?: boolean;
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
