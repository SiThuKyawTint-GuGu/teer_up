export interface UserData {
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
  data: UserData;
  token: string;
}

export interface Error {
  message: string;
}
