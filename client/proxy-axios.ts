import axios from "axios";
import { getDeviceInfo } from "@/lib/device-info";

const proxyAxios = axios.create({
  baseURL: "/api/vastli-proxy",
  headers: {
    "Content-Type": "application/json",
    "X-Client-Type": "web",
    "X-User-Type": "admin",
  },
  withCredentials: true,
});

proxyAxios.interceptors.request.use(
  async (config) => {
    // Add device ID to all requests
    const deviceInfo = getDeviceInfo();
    config.headers["X-Device-Id"] = deviceInfo.deviceId;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default proxyAxios;
