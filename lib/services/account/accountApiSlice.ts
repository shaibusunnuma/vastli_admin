import { createApi } from "@reduxjs/toolkit/query/react";
import { Account } from "@/types/account.types";
import { axiosBaseQuery } from "@/lib/baseQuery";

export const accountApiSlice = createApi({
  reducerPath: "accountApi",
  baseQuery: axiosBaseQuery({ baseUrl: "accounts" }),
  tagTypes: ["Accounts"],
  endpoints: (build) => ({
    getAccountById: build.query<Account, string>({
      query: (accountId) => ({ url: `/${accountId}` }),
      providesTags: (result, error, accountId) => [{ type: "Accounts", id: accountId }],
    }),

    addAccount: build.mutation<Account, Partial<Account>>({
      query: (newAccount) => ({
        url: "",
        method: "POST",
        data: newAccount,
      }),
      invalidatesTags: [{ type: "Accounts", id: "LIST" }],
    }),

    updateAccount: build.mutation<Account, Partial<Account>>({
      query: (updatedAccount) => ({
        url: `/${updatedAccount.id}`,
        method: "PATCH",
        data: updatedAccount,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Accounts", id }],
    }),
  }),
});

export const { useGetAccountByIdQuery, useAddAccountMutation, useUpdateAccountMutation } =
  accountApiSlice;
