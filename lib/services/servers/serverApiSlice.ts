import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/lib/baseQuery";
import { Server, UserResponse } from "@/types/users";
import { providesList } from "../../common";

export const serverApiSlice = createApi({
  reducerPath: "serverApi",
  baseQuery: axiosBaseQuery({ baseUrl: "users" }),
  tagTypes: ["Servers"],
  endpoints: (build) => ({
    getServers: build.query<UserResponse<Server>, { filter: object; query?: string }>({
      query: ({ filter, query }) => ({
        url: "",
        params: { filter, query },
      }),
      providesTags: (result, error) => providesList(result?.data, "Servers"),
    }),

    getServerById: build.query<Server, string>({
      query: (userId) => ({
        url: `/${userId}`,
      }),
      providesTags: (result, error, userId) => [{ type: "Servers", id: userId }],
    }),

    addServer: build.mutation<Server, Partial<Server>>({
      query: (newServer) => ({
        url: "",
        method: "POST",
        data: newServer,
      }),
      invalidatesTags: [{ type: "Servers", id: "LIST" }],
    }),

    updateServer: build.mutation<Server, Partial<Server>>({
      query: (updatedServer) => ({
        url: `/${updatedServer.id}`,
        method: "PATCH",
        data: updatedServer,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Servers", id }],
    }),

    deleteServer: build.mutation<void, string>({
      query: (userId) => ({
        url: `/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, userId) => [{ type: "Servers", id: userId }],
    }),
  }),
});

export const {
  useGetServersQuery,
  useGetServerByIdQuery,
  useAddServerMutation,
  useUpdateServerMutation,
  useDeleteServerMutation,
} = serverApiSlice;
