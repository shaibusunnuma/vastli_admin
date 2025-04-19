import { SignInParams } from "@/types/auth.types";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { SERVER_URL } from "@/constants";
import ApiErrorHandler from "../error-handler";
import logger from "@/lib/logger";
import { getDeviceInfo } from "../device-info";

const deviceInfo = getDeviceInfo();

const client = axios.create({
  baseURL: `${SERVER_URL}/auth/admin/`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: unknown) => void }[] = [];

const processQueue = (error: unknown | null, token: string | null = null) => {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  
  failedQueue = [];
};

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
      const { data } = await client.post('refresh-token');
      isRefreshing = false;
      processQueue(null, data.access_token);
      return client(originalRequest);
    } catch (refreshError) {
      isRefreshing = false;
      processQueue(refreshError);
      logger.error('Token refresh failed', refreshError);
      return Promise.reject(refreshError);
    }
  }
);

export const authClient = {
  async signIn(params: Omit<SignInParams, 'deviceInfo'>) {
    try {
      const { data } = await client.post("login", { ...params, deviceInfo });
      return data.user;
    } catch (error: any) {
      throw ApiErrorHandler(error, "Login failed");
    }
  },
  async prepareFirstFactor(payload: { email: string }) {
    try {
      await client.post("forgot-password", payload);
    } catch (error) {
      throw ApiErrorHandler(error, "Failed to prepare first factor");
    }
  },

  async attemptFirstFactor(params: { email: string; code: string; password: string }) {
    try {
      const { data } = await client.post("reset-password", { ...params, deviceInfo });
      return data;
    } catch (error: any) {
      throw ApiErrorHandler(error, "Failed to attempt first factor");
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
      const { data } = await client.post("refresh-token",);
      return data;
    } catch (error) {
      logger.error('Failed to refresh token', error);
      throw ApiErrorHandler(error, "Token refresh failed");
    }
  },

  async signOut() {
    try {
      await client.post(`logout`, {}, { headers: { "x-device-id": deviceInfo.deviceId } });
    } catch (error) {
      logger.error('Error during logout', error);
    }
  },
};

export default authClient;
