export const routeFilter = (params: any) => {
  return new URLSearchParams(params);
};

export const delay = (time: number) => new Promise(resolve => setTimeout(resolve, time));
