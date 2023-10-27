export interface Mentor {
  id: number;
  name: string;
  email: string;
}

export interface Student {
  id: number;
  name: string;
  email: string;
}

export interface Mentorship {
  id: number;
  created_at: string;
  updated_at: string;
  content_id: number;
  mentor_id: number;
  student_id: number;
  student_reply: string;
  mentor_reply: string;
  status: string;
  mentor: Mentor;
  student: Student;
}

export interface MentorshipResponse {
  data: Mentorship[];
}
