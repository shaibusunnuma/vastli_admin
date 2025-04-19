import { SignInParams } from "@/types/auth.types";
import proxyAxios from "@/client/proxy-axios";
import ApiErrorHandler from "../error-handler";
import logger from "@/lib/logger";
import { getDeviceInfo } from "../device-info";

const deviceInfo = getDeviceInfo();

const client = proxyAxios;
const path = '/auth/admin/'

export const authClient = {
  async signIn(params: Omit<SignInParams, "deviceInfo">) {
    try {
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
      const { data } = await client.post(`${path}refresh-token`, {}, { headers: { "x-device-id": deviceInfo.deviceId } });
      return data;
    } catch (error) {
      logger.error("Failed to refresh token", error);
      throw ApiErrorHandler(error, "Token refresh failed");
    }
  },

  async signOut() {
    try {
      await client.post(`${path}logout`, {}, { headers: { "x-device-id": deviceInfo.deviceId } });
    } catch (error) {
      logger.error("Error during logout", error);
    }
  },
};

export default authClient;
