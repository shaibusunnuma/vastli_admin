import client from "@/client";
import ApiErrorHandler from "../error-handler";

export const adminApi = {
  // Email management
  async addEmail(emailAddress: string) {
    try {
      const { data } = await client.post("/admins/emails", { emailAddress });
      return data;
    } catch (error: any) {
      throw ApiErrorHandler(error, "Failed to add email");
    }
  },

  async sendEmailVerification(emailAddress: string) {
    try {
      const { data } = await client.post("/admins/emails/send-verification", { emailAddress });
      return data;
    } catch (error: any) {
      throw ApiErrorHandler(error, "Failed to send verification");
    }
  },

  async verifyEmail(emailAddress: string, code: string) {
    try {
      const { data } = await client.post("/admins/emails/verify", { emailAddress, code });
      return data;
    } catch (error: any) {
      throw ApiErrorHandler(error, "Failed to verify email");
    }
  },

  async removeEmail(emailAddress: string) {
    try {
      const { data } = await client.delete(`/admins/emails/${encodeURIComponent(emailAddress)}`);
      return data;
    } catch (error: any) {
      throw ApiErrorHandler(error, "Failed to remove email");
    }
  },

  // Phone management
  async addPhone(phoneNumber: string) {
    try {
      const { data } = await client.post("/admins/phones", { phoneNumber });
      return data;
    } catch (error: any) {
      throw ApiErrorHandler(error, "Failed to add phone");
    }
  },

  async sendPhoneVerification(phoneNumber: string) {
    try {
      const { data } = await client.post("/admins/phones/send-verification", { phoneNumber });
      return data;
    } catch (error: any) {
      throw ApiErrorHandler(error, "Failed to send verification");
    }
  },

  async verifyPhone(phoneNumber: string, code: string) {
    try {
      const { data } = await client.post("/admins/phones/verify", { phoneNumber, code });
      return data;
    } catch (error: any) {
      throw ApiErrorHandler(error, "Failed to verify phone");
    }
  },

  async removePhone(phoneNumber: string) {
    try {
      const { data } = await client.delete(`/admins/phones/${encodeURIComponent(phoneNumber)}`);
      return data;
    } catch (error: any) {
      throw ApiErrorHandler(error, "Failed to remove phone");
    }
  },
};

export default adminApi;
