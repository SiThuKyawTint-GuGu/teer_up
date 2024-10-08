export enum WINDOW_WIDTH {
  _2XL = 1536,
  XL = 1280,
  LG = 1024,
  MD = 768,
  SM = 640,
}

export enum THEME {
  DARK = "dark",
  LIGHT = "light",
}

export enum SELECT_ICONS {
  DOWN_CARET = "arrow",
  PLUS = "plus",
}

export enum USER_ROLE {
  MENTOR = "mentor",
  STUDENT = "student",
  ADMIN = "admin",
  SCHOOL = "school",
  COMPANY = "company",
}

export const ROLES = {
  [USER_ROLE.MENTOR]: "mentor",
  [USER_ROLE.STUDENT]: "student",
  [USER_ROLE.ADMIN]: "admin",
};

export enum PROFILE_TRIGGER {
  PROFILE = "PROFILE",
  COVER = "COVER",
}

export enum REQUEST_TYPES {
  ACCEPTED = "accepted",
  CONFIRMED = "confirmed",
  PENDING = "pending",
  DENIED = "denied",
}
