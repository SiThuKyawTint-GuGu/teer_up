import { USER_ROLE } from "@/shared/enums";
import { Education } from "./Education";
import { Experience } from "./Experience";

export interface Gender {
  id: number;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface PersonalInfo {
  birthday: string;
  created_at: string;
  gender_id: number;
  gender: Gender;
  id: number;
  updated_at: string;
  user_id: number;
}

export interface preference {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Preferences {
  id: number;
  created_at: string;
  updated_at: string;
  preference_id: number;
  user_id: number;
  preference: preference;
}

export interface Industry {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Industries {
  id: number;
  created_at: string;
  updated_at: string;
  industry_id: number;
  user_id: number;
  industry: Industry;
}

export interface UserProfile {
  bio: string;
  cover_url: string;
  created_at: string;
  educations: Education[];
  experiences: Experience[];
  email: string;
  id: number;
  name: string;
  personal_info: PersonalInfo;
  profile_url: string;
  role: USER_ROLE;
  updated_at: string;
  industries: Industries[];
  preferences: Preferences[];
}

export interface UserProfileResponse {
  data: UserProfile;
}
