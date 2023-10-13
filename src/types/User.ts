export interface User {
  id: string;
  createdAt: string;
  email: string;
  country: number;
  name: string;
  verified: boolean;
  role: string;
}

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
