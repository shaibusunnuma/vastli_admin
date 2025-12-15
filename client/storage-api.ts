import client from "@/client";
import ApiErrorHandler from "@/lib/error-handler";

export async function uploadImage(imageFile: File, filePath: string) {
  try {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("filePath", filePath);
    const { data } = await client.post<{ url: string; filePath: string }>("/storage/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data.url;
  } catch (error: any) {
    throw ApiErrorHandler(error, "Error setting profile image");
  }
}

export async function removeFile(path: string) {
  const filePath = extractStoragePath(path);
  try {
    const { data } = await client.delete("/storage", { params: { filePath } });
    return data;
  } catch (error: any) {
    throw ApiErrorHandler(error, "Error removing profile image");
  }
}

function extractStoragePath(url: string): string | null {
  const match = url.match(/\/storage\/(.+)$/);
  return match ? match[1] : null;
}
