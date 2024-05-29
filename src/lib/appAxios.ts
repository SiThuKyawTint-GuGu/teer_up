import axios from "axios";
import { getToken } from "@/utils/auth";

const appAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
});

appAxios.interceptors.request.use(
  config => {
    if (config.headers) {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      if (!config.headers["Content-Type"]) {
        if (config.data instanceof FormData) {
          config.headers["Content-Type"] = "multipart/form-data";
        } else {
          config.headers["Content-Type"] = "application/json";
        }
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

appAxios.interceptors.response.use(
  response => {
    if (!response.data) {
      return Promise.reject(response);
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default appAxios;
