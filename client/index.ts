import axios from "axios";
import { SERVER_URL } from "@/constants";
import { authClient } from "@/lib/auth/auth-client";
import { getDeviceInfo } from "@/lib/device-info";

const axiosClient = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true, // This is crucial for sending cookies with requests
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      try {
        await authClient.refreshToken();
        const originalRequest = error.config;
        const deviceInfo = getDeviceInfo();
        originalRequest.headers["x-device-id"] = deviceInfo.deviceId;

        return axiosClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
