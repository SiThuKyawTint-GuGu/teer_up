export interface LoginResponse {
  data: {
    id: string;
    createdAt: string;
    email: string;
    country: number;
    name: string;
    verified: boolean;
    role: string;
  };
  token: string;
}

export interface Error {
  message: string;
}
