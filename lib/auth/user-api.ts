import { AuthUser } from "@/types/auth.types";
import client from "@/client";
import ApiErrorHandler from "../error-handler";

const userApi = {

  async update(user: Partial<AuthUser>) {
    try {
      const { data } = await client.patch("/users/update", user);
      return data;
    } catch (error: any) {
      throw ApiErrorHandler(error, "Error updating user");
    }
  },

  async setProfileImage(imageFile: File | string) {
    try {
      const formData = new FormData();
      if (typeof imageFile === "string") {
        // @ts-expect-error: special react native format for form data
        formData.append("file", {
          uri: imageFile,
          type: "image/jpeg",
          name: imageFile.split("/").pop(),
        });
      } else {
        formData.append("file", imageFile);
      }
      formData.append("filePath", "profile_photos");
      const { data } = await client.post("/storage/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (error: any) {
      throw ApiErrorHandler(error, "Error setting profile image");
    }
  },

  extractStoragePath(url: string): string | null {
    const match = url.match(/\/storage\/(.+)$/);
    return match ? match[1] : null;
  },
};

export default userApi;
