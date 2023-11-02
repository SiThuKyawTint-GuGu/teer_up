import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { getToken } from "@/utils/auth";

const appAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

appAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.headers) {
      const token = getToken();
      config.headers.Authorization = token ? `Bearer ${token}` : "";
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

appAxios.interceptors.response.use(
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

export default appAxios;
