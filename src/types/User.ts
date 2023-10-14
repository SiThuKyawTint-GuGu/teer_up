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
  currentPage?: number;
  data?: User[];
  totalCount?: number;
  totalPages?: number;
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
