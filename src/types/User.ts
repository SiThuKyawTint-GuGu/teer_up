import { SkipStatusResponse } from "./Content";

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

export interface Dimension {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  short_name: string;
  high_body: null;
  medium_body: null;
  low_body: null;
}
export interface UserScores {
  id: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  skill: number;
  certainty: number;
  dimension_id: number;
  dimension: Dimension;
}
export interface UserScoresResponse {
  data: UserScores[];
}

export interface UserOnboardingStatusResponse {
  data: SkipStatusResponse;
}
