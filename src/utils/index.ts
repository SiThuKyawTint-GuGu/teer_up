export const routeFilter = (params: any) => {
  return new URLSearchParams(params);
};

export const delay = (time: number) => new Promise(resolve => setTimeout(resolve, time));

export const setLocalStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : [];
  }
};
