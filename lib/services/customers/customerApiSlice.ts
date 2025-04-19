import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/lib/baseQuery";
import { Customer, CustomerStats, UserResponse } from "@/types/users";
import { providesList } from "../../common";

export const customerApiSlice = createApi({
  reducerPath: "customerApi",
  baseQuery: axiosBaseQuery({ baseUrl: "customers" }),
  tagTypes: ["Customers"],
  endpoints: (build) => ({
    getCustomers: build.query<UserResponse<Customer>, { filter: object; query?: string }>({
      query: ({ filter, query }) => ({
        url: "",
        params: { filter, query },
      }),
      providesTags: (result, _error) => providesList(result?.data, "Customers"),
    }),

    getCustomersByFilter: build.query<Customer[], Partial<Customer>>({
      query: (filter) => ({
        url: "/filter",
        params: filter,
      }),
      providesTags: (result, _error, filter) => providesList(result, "Customers", JSON.stringify(filter)),
    }),

    getCustomersStats: build.query<CustomerStats, Partial<Customer>>({
      query: (filter) => ({
        url: "/stats",
        params: filter,
      }),
      providesTags: [{ type: "Customers", id: "STATS" }],
    }),

    getCustomerById: build.query<Customer, string>({
      query: (userId) => ({
        url: `/${userId}`,
      }),
      providesTags: (_result, _error, userId) => [{ type: "Customers", id: userId }],
    }),

    addCustomer: build.mutation<Customer, Partial<Customer>>({
      query: (newCustomer) => ({
        url: "",
        method: "POST",
        data: newCustomer,
      }),
      invalidatesTags: (result) => [
        { type: "Customers", id: "LIST" },
        { type: "Customers", id: result?.id },
      ],
    }),

    updateCustomer: build.mutation<Customer, Partial<Customer>>({
      query: (updatedCustomer) => ({
        url: `/${updatedCustomer.id}`,
        method: "PATCH",
        data: updatedCustomer,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Customers", id }],
    }),

    deleteCustomer: build.mutation<void, string>({
      query: (userId) => ({
        url: `/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, userId) => [{ type: "Customers", id: userId }],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useGetCustomersByFilterQuery,
  useGetCustomersStatsQuery,
  useAddCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApiSlice;
