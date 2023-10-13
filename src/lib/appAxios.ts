import axios from "axios";

import { getToken } from "@/utils/auth";

const appAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL + "api/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

appAxios.interceptors.request.use(function (config) {
  if (config.headers) {
    const token = getToken();
    config.headers.Authorization = token ? `Bearer ${token}` : "";
  }
  return config;
});

appAxios.interceptors.response.use(
  async response => {
    if (!response.data) {
      return Promise.reject(response);
    }
    return response;
  },
  async error => {
    return Promise.reject(error);
  }
);

export default appAxios;
