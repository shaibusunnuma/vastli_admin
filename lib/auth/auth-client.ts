import { SignInParams } from "@/types/auth.types";
import axios from "axios";
import { SERVER_URL } from "@/constants";
import ApiErrorHandler from "../error-handler";

const client = axios.create({
  baseURL: `${SERVER_URL}/auth/`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

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

  async signOut() {
    try {
      await client.post(`logout`);
    } catch (error) {}
  },
};

export default authClient;
