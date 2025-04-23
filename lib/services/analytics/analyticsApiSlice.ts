import { createApi } from "@reduxjs/toolkit/query/react";
import { AnalyticsOverview, DateRange } from "@/types/analytics.types";
import { axiosBaseQuery } from "@/lib/baseQuery";

export const analyticsApiSlice = createApi({
  reducerPath: "analyticsApi",
  baseQuery: axiosBaseQuery({ baseUrl: "analytics" }),
  tagTypes: ["Analytics"],
  endpoints: (build) => ({
    getAnalyticsOverview: build.query<AnalyticsOverview, DateRange>({
      query: (dateRange) => ({ url: "/overview", params: { dateRange } }),
      providesTags: (result, error, dateRange) => [{ type: "Analytics", id: dateRange }],
    }),
  }),
});

export const { useGetAnalyticsOverviewQuery } = analyticsApiSlice;
