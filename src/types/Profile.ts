import { USER_ROLE } from "@/shared/enums";
import { Education } from "./Education";

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

export interface UserPreferences {
  id: number;
  name: string;
}

export interface UserCareerInterests {
  id: number;
  name: string;
}

export interface UserProfile {
  bio: string;
  cover_url: string;
  created_at: string;
  educations: Education[];
  email: string;
  id: number;
  name: string;
  personal_info: PersonalInfo;
  profile_url: string;
  role: USER_ROLE;
  updated_at: string;
  user_preferences: UserPreferences;
  usercareer_interests: UserCareerInterests;
}

export interface UserProfileResponse {
  data: UserProfile;
}
