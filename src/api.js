// import axios from "axios";

// export const BASE_URL = "http://localhost:8000/api";
// export const BASE_URL_IMG = "http://localhost:8000";
// const api = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default api;

import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const BASE_URL = import.meta.VITE_BASE_URL;
export const BASE_URL_IMG = import.meta.VITE_BASE_URL_IMG;

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      const decoded = jwtDecode(token);
      const expiry_date = decoded.exp;
      const current_time = Date.now() / 1000;
      if (expiry_date > current_time) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default api;
