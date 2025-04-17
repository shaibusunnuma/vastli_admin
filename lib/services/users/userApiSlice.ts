import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/lib/baseQuery";
import { providesList } from "../../common";
import { Operator, Session, UserResponse } from "@/types/users";

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery({ baseUrl: "operators" }),
  tagTypes: ["Operator", "OperatorSession"],
  endpoints: (build) => ({
    getOperators: build.query<UserResponse<Operator>, Partial<Operator>>({
      query: (filter) => ({
        url: "",
        params: { filter: { ...filter, page: 1 } },
      }),
      providesTags: (result, error) => providesList(result?.data, "Operator"),
    }),

    getOperatorById: build.query<Operator, string>({
      query: (userId) => ({
        url: `/${userId}`,
      }),
      providesTags: (result, error, userId) => [{ type: "Operator", id: userId }],
    }),

    getOperatorSessions: build.query<Session[], string>({
      query: (userId) => ({
        url: `sessions/${userId}`,
      }),
      providesTags: (result, error, userId) => [{ type: "OperatorSession", id: userId }],
    }),

    inviteOperator: build.mutation<Operator, Partial<Operator> & { restaurant?: string }>({
      query: ({ restaurant, ...data }) => ({
        url: "/invite",
        method: "POST",
        data,
        params: { restaurant },
      }),
      invalidatesTags: [{ type: "Operator", id: "LIST" }],
    }),

    addOperator: build.mutation<Operator, Partial<Operator>>({
      query: (data) => ({
        url: "",
        method: "POST",
        data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Operator", id },
        { type: "Operator", id: "LIST" },
      ],
    }),

    updateOperator: build.mutation<Operator, Partial<Operator>>({
      query: (updatedOperator) => ({
        url: `/${updatedOperator.id}`,
        method: "PATCH",
        data: updatedOperator,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Operator", id }],
    }),

    deleteOperator: build.mutation<void, string>({
      query: (userId) => ({
        url: `/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, userId) => [{ type: "Operator", id: userId }],
    }),
  }),
});

export const {
  useGetOperatorsQuery,
  useGetOperatorByIdQuery,
  useGetOperatorSessionsQuery,
  useInviteOperatorMutation,
  useUpdateOperatorMutation,
  useDeleteOperatorMutation,
  useAddOperatorMutation,
} = userApiSlice;
