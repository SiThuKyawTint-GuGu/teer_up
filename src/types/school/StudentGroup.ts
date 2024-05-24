export interface School {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  type: string;
  school_admin_id: number;
}

export interface Student {
  id: number;
  created_at: string;
  updated_at: string;
  email: string;
  password: string;
  name: string;
  role: string;
  bio: string;
  profile_url: string | null;
  cover_url: string | null;
  country_id: number;
  last_login: string;
  referral_code: string;
  referred_by_code: string | null;
  oauthProvider: string | null;
  oauthId: string | null;
  oauthToken: string | null;
  resume_url: string | null;
}

export interface StudentGroup {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  school_id: number;
  school: School;
  students: Student[];
}

export interface StudentGroupDataResponse {
  data: StudentGroup;
}
