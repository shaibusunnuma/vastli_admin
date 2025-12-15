import { SignInParams } from "@/types/auth.types";
import proxyAxios from "@/client/proxy-axios";
import ApiErrorHandler from "../error-handler";
import logger from "@/lib/logger";
import { getDeviceInfo } from "../device-info";

// Lazy getter for device info
let cachedDeviceInfo: ReturnType<typeof getDeviceInfo> | null = null;
const getDeviceInfoLazy = () => {
  if (!cachedDeviceInfo) {
    cachedDeviceInfo = getDeviceInfo();
  }
  return cachedDeviceInfo;
};

const client = proxyAxios;
const path = '/auth/'

export const authClient = {
  async signIn(params: Omit<SignInParams, "deviceInfo">) {
    try {
      const deviceInfo = getDeviceInfoLazy();
      const { data } = await client.post(`${path}login`, { ...params, deviceInfo });
      return data.user;
    } catch (error: any) {
      throw ApiErrorHandler(error, "Login failed");
    }
  },
  async prepareFirstFactor(payload: { email: string }) {
    try {
      await client.post(`${path}forgot-password`, payload);
    } catch (error) {
      throw ApiErrorHandler(error, "Failed to prepare first factor");
    }
  },

  async attemptFirstFactor(params: { email: string; code: string; password: string }) {
    try {
      const deviceInfo = getDeviceInfoLazy();
      const { data } = await client.post(`${path}reset-password`, { ...params, deviceInfo });
      return data;
    } catch (error: any) {
      throw ApiErrorHandler(error, "Failed to attempt first factor");
    }
  },

  async getUser() {
    try {
      const { data } = await client.get(`${path}user`);
      return data;
    } catch (error) {
      return null;
    }
  },

  async refreshToken() {
    try {
      const { data } = await client.post(`${path}refresh-cookie`, {});
      return data;
    } catch (error) {
      logger.error("Failed to refresh token", error);
      throw ApiErrorHandler(error, "Token refresh failed");
    }
  },

  async signOut() {
    try {
      await client.post(`${path}logout`, {});
    } catch (error) {
      logger.error("Error during logout", error);
    }
  },

  async updatePassword(params: { currentPassword: string; newPassword: string }) {
    try {
      const deviceInfo = getDeviceInfoLazy();
      const { data } = await client.post(`${path}update-password`, { ...params, deviceInfo });
      return data;
    } catch (error: any) {
      throw ApiErrorHandler(error, "Failed to update password");
    }
  },
};

export default authClient;
