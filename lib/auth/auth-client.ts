import { SignInParams } from "@/types/auth.types";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { SERVER_URL } from "@/constants";
import ApiErrorHandler from "../error-handler";
import logger from "@/lib/logger";

const client = axios.create({
  baseURL: `${SERVER_URL}/auth/`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Flag to prevent multiple refresh token requests
let isRefreshing = false;
// Queue of requests to retry after token refresh
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void }[] = [];

// Process the queue of failed requests
const processQueue = (error: any | null, token: string | null = null) => {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Add response interceptor to handle token refresh
client.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    
    // If error is not 401 or request has already been retried, reject
    if (!error.response || error.response.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }
    
    // If we're already refreshing, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => {
        return client(originalRequest);
      }).catch(err => {
        return Promise.reject(err);
      });
    }
    
    originalRequest._retry = true;
    isRefreshing = true;
    
    try {
      // Try to refresh the token
      const { data } = await client.post('refresh-token');
      isRefreshing = false;
      processQueue(null, data.access_token);
      return client(originalRequest);
    } catch (refreshError) {
      isRefreshing = false;
      processQueue(refreshError);
      // If refresh fails, redirect to login
      logger.error('Token refresh failed', refreshError);
      return Promise.reject(refreshError);
    }
  }
);

export const authClient = {
  async signIn(params: SignInParams) {
    try {
      const { data } = await client.post("login", params);
      return data.user;
    } catch (error: any) {
      throw ApiErrorHandler(error, "Login failed");
    }
  },

  async getUser() {
    try {
      const { data } = await client.get("user");
      return data;
    } catch (error) {
      return null;
    }
  },

  async refreshToken() {
    try {
      const { data } = await client.post("refresh-token");
      return data;
    } catch (error) {
      logger.error('Failed to refresh token', error);
      throw ApiErrorHandler(error, "Token refresh failed");
    }
  },

  async signOut() {
    try {
      await client.post(`logout`);
    } catch (error) {
      logger.error('Error during logout', error);
    }
  },
};

export default authClient;
