export const routeFilter = (params: any) => {
  return new URLSearchParams(params);
};

export const delay = () => new Promise(resolve => setTimeout(resolve, 1000));
