import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/lib/baseQuery";
import { providesList } from "../../common";
import { AuthUser } from "@/types/auth.types";
import { UserResponse } from "@/types/users";

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery({ baseUrl: "users" }),
  tagTypes: ["Users"],
  endpoints: (build) => ({
    getUsers: build.query<UserResponse<AuthUser>, Partial<AuthUser>>({
      query: (filter) => ({
        url: "",
        params: { filter: { ...filter, page: 1 } },
      }),
      providesTags: (result, error) => providesList(result?.data, "Users"),
    }),

    getUserById: build.query<AuthUser, string>({
      query: (userId) => ({
        url: `/${userId}`,
      }),
      providesTags: (result, error, userId) => [{ type: "Users", id: userId }],
    }),

    inviteUser: build.mutation<AuthUser, Partial<AuthUser> & { restaurant?: string }>({
      query: ({ restaurant, ...data }) => ({
        url: "/invite",
        method: "POST",
        data,
        params: { restaurant },
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),

    updateUser: build.mutation<AuthUser, Partial<AuthUser>>({
      query: (updatedUser) => ({
        url: `/${updatedUser.id}`,
        method: "PATCH",
        data: updatedUser,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Users", id }],
    }),

    deleteUser: build.mutation<void, string>({
      query: (userId) => ({
        url: `/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, userId) => [{ type: "Users", id: userId }],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery, useInviteUserMutation, useUpdateUserMutation, useDeleteUserMutation } = userApiSlice;
