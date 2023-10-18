import { deleteCookie, getCookie, setCookie } from "cookies-next";
import CryptoJS from "crypto-js";

import { User } from "@/types/User";

export const setUserInfo = (token: string, userInfo: User) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);
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
};
