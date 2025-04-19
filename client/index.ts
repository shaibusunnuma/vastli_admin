import proxyAxios from "@/client/proxy-axios";
import { authClient } from "@/lib/auth/auth-client";
import { getDeviceInfo } from "@/lib/device-info";

const axiosClient = proxyAxios;

// axiosClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response.status === 401) {
//       // Only try refresh ONCE per original request
//       const originalRequest = error.config;
//       if (!originalRequest._retry) {
//         originalRequest._retry = true;
//         try {
//           await authClient.refreshToken();
//           return axiosClient(originalRequest);
//         } catch (refreshError) {
//           // Optionally: clear auth state, redirect to login, etc.
//           // e.g. window.location.href = '/sign-in';
//           return Promise.reject(refreshError);
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosClient;
