import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import CryptoJS from 'crypto-js';

import { UserData } from '@/types/type';

export const setUserInfo = (token: string, userInfo: UserData) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);
  const cipherUserInfo = CryptoJS.AES.encrypt(JSON.stringify(userInfo), 'userInfo').toString();
  const cipherText = CryptoJS.AES.encrypt(JSON.stringify(token), 'token').toString();
  setCookie('token', cipherText, {
    expires,
  });
  setCookie('userInfo', cipherUserInfo, {
    expires,
  });
};

export const getToken = () => {
  const session = getCookie('token');
  if (!session) return false;
  const bytes = CryptoJS.AES.decrypt(session, 'token');
  try {
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (err) {
    console.error('error', err);
  }
};

export const logout = () => {
  deleteCookie('token');
};
