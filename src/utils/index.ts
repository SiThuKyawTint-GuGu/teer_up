export const routeFilter = (params: any) => {
  return new URLSearchParams(params);
};

export const delay = (time: number) => new Promise(resolve => setTimeout(resolve, time));

export const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string) => {
  const storedData = localStorage.getItem(key);
  return storedData && JSON.parse(storedData);
};
