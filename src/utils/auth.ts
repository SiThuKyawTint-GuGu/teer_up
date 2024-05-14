import { User } from "@/types/User";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import CryptoJS from "crypto-js";
import jwt_decode from "jwt-decode";

export enum AUTH_TYPE {
  SIGNIN = "SIGNIN",
  SIGNUP = "SIGNUP",
}

export interface JWT_DECODE {
  email: string;
  exp: number;
  iat: number;
  id: number;
  role: string;
  verified: boolean;
  type?: AUTH_TYPE;
}

export const setUserInfo = (token: string, userInfo: User) => {
  const { exp } = jwt_decode(token) as any;
  const expires = new Date(exp * 1000); // Convert to milliseconds
  const cipherUserInfo = CryptoJS.AES.encrypt(JSON.stringify(userInfo), "userInfo").toString();
  const cipherText = CryptoJS.AES.encrypt(JSON.stringify(token), "token").toString();
  setCookie("token", cipherText, {
    expires,
  });
  setCookie("userInfo", cipherUserInfo, {
    expires,
  });
};

export const getUserInfo = () => {
  const userinfo = getCookie("userInfo");
  if (!userinfo) {
    return null;
  }
  const userInfoBytes = CryptoJS.AES.decrypt(userinfo, "userInfo");
  const decryptedUserInfo = JSON.parse(userInfoBytes.toString(CryptoJS.enc.Utf8));
  return decryptedUserInfo;
};

export const getToken = () => {
  const session = getCookie("token");
  if (!session) return false;
  const bytes = CryptoJS.AES.decrypt(session, "token");
  try {
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (err) {
    console.error("error", err);
  }
};

export const logout = () => {
  deleteCookie("token");
  deleteCookie("userInfo");
};
