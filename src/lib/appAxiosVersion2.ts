import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { getToken } from "@/utils/auth";

const appAxiosVersion2 = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v2`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

appAxiosVersion2.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.headers) {
      const token = getToken();
      if (!config.headers.getAuthorization()) {
        config.headers.Authorization = token ? `Bearer ${token}` : "";
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

appAxiosVersion2.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (!response.data) {
      return Promise.reject(response);
    }
    return response;
  },
  async (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default appAxiosVersion2;
