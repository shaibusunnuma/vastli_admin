import { createApi } from "@reduxjs/toolkit/query/react";
import { AnalyticsOverview, DailyReservationStats, DateRange, PartySizeDistribution } from "@/types/analytics.types";
import { axiosBaseQuery } from "@/lib/baseQuery";
import { Reservation } from "@/types/reservations";

interface ReservationFilter {
  dateRange: DateRange;
  filter?: Partial<Reservation>;
}

export const analyticsApiSlice = createApi({
  reducerPath: "analyticsApi",
  baseQuery: axiosBaseQuery({ baseUrl: "analytics" }),
  tagTypes: ["Analytics"],
  endpoints: (build) => ({
    getAnalyticsOverview: build.query<AnalyticsOverview, DateRange>({
      query: (dateRange) => ({ url: "/overview", params: { dateRange } }),
      providesTags: (result, error, dateRange) => [{ type: "Analytics", id: dateRange }],
    }),
    getReservationsTimeSeries: build.query<DailyReservationStats[], ReservationFilter>({
      query: (filter) => ({ url: "/reservations/time-series", params: { ...filter } }),
      providesTags: (result, error, filter) => [{ type: "Analytics", id: filter.dateRange }],
    }),
    getPartySizeDistribution: build.query<PartySizeDistribution[], ReservationFilter>({
      query: (filter) => ({ url: "/party-size/distribution", params: { ...filter } }),
      providesTags: (result, error, filter) => [{ type: "Analytics", id: filter.dateRange }],
    }),
  }),
});

export const { useGetAnalyticsOverviewQuery, useGetReservationsTimeSeriesQuery, useGetPartySizeDistributionQuery } = analyticsApiSlice;
