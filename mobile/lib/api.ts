import { useAuth } from "@clerk/clerk-expo";
import axios from "axios";

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export const createApiClient = async (
  getToken: () => Promise<string | null>
) => {
  const api = axios.create({
    baseURL: process.env.EXPO_BACKEND_API_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use(async (config) => {
    const token = await getToken();
    console.log("Clerk Token:", token); // Keep this line for debugging
    console.log("Full Request URL:", config.url);
    console.log("Request Method:", config.method);

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Request Headers:", config.headers);
    return config;
  });

  return api;
};

export const useApiClient = () => {
  const { getToken } = useAuth();
  console.log("token", getToken);
  return createApiClient(getToken);
};
