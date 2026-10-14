import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL: url,
  withCredentials: true,
});

const authApi = axios.create({
  baseURL: url,
  withCredentials: true,
});

let token = "";

export const setToken = (newToken: string) => {
  token = newToken;
};

api.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `$Beare ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => {
    if (res.data && "data" in res.data) {
      return res.data.data;
    }
    return res.data;
  },
  async (error) => {
    const request = error.config;

    if (error.response?.status === 401 && !request._retry) {
      request._retry = true;

      try {
        const response = await authApi.post("/auth/refresh");

        const newToken = response.data?.data.token || response.data?.token;
        setToken(newToken);

        request.headers.Authorization = `Bearer ${newToken}`;

        return api(request);
      } catch (refreshErr) {
        setToken("");
        if (typeof window !== "undefined") {
          window.location.href = "/auth/signin";
        }
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  },
);
