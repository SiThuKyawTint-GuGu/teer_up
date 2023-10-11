import Cookies from 'js-cookie';

export const setToken = (token: string) => {
  Cookies.set('token', token, {
    expires: 1,
  });
};

export const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

export const setLocalStorage = (data: { userName: string }) => {
  localStorage.setItem('userData', JSON.stringify(data));
};

export const getLocalStorageData = () => {
  const getData: any = typeof window !== 'undefined' && localStorage?.getItem('userData');
  return JSON.parse(getData);
};

export const logout = () => {
  Cookies.remove('token');
};
