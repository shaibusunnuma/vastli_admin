import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/lib/baseQuery";
import { AdminRole } from "@/lib/constants/roles";

interface Admin {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  role?: AdminRole;
  status?: string;
}

interface AdminsResponse {
  data: Admin[];
  metadata: {
    total: number;
    page: number;
    lastPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

interface InviteAdminDto {
  email: string;
  firstName: string;
  lastName: string;
  role: AdminRole;
}

export const settingsAdminApiSlice = createApi({
  reducerPath: "settingsAdminApi",
  baseQuery: axiosBaseQuery({ baseUrl: "admins" }),
  tagTypes: ["Admins"],
  endpoints: (build) => ({
    getAdmins: build.query<AdminsResponse, { page: number; limit?: number }>({
      query: ({ page, limit = 50 }) => ({
        url: "",
        params: { filter: { page, limit } },
      }),
      providesTags: ["Admins"],
    }),

    inviteAdmin: build.mutation<Admin, InviteAdminDto>({
      query: (data) => ({
        url: "/invite",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Admins"],
    }),

    updateAdminRole: build.mutation<Admin, { id: string; role: AdminRole }>({
      query: ({ id, role }) => ({
        url: `/${id}/role`,
        method: "PATCH",
        data: { role },
      }),
      invalidatesTags: ["Admins"],
    }),

    removeAdmin: build.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admins"],
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useInviteAdminMutation,
  useUpdateAdminRoleMutation,
  useRemoveAdminMutation,
} = settingsAdminApiSlice;
