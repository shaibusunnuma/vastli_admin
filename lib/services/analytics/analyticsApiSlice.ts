import { createApi } from "@reduxjs/toolkit/query/react";
import { AnalyticsOverview, DailyReservationStats, DateRange, PartySizeDistribution, WeekdayDistribution } from "@/types/analytics.types";
import { axiosBaseQuery } from "@/lib/baseQuery";
import { Reservation } from "@/types/reservations";

interface Filter {
  dateRange: DateRange;
  filter?: Partial<Reservation>;
}

export const analyticsApiSlice = createApi({
  reducerPath: "analyticsApi",
  baseQuery: axiosBaseQuery({ baseUrl: "analytics" }),
  tagTypes: ["Overview", "TimeSeries", "PartySizeDistribution", "WeekDayDistribution"],
  endpoints: (build) => ({
    getAnalyticsOverview: build.query<AnalyticsOverview, DateRange>({
      query: (dateRange) => ({ url: "/reservations/overview", params: { dateRange } }),
      providesTags: (result, error, dateRange) => [{ type: "Overview", id: dateRange }],
    }),
    getReservationsTimeSeries: build.query<DailyReservationStats[], Filter>({
      query: (filter) => ({ url: "/reservations/time-series", params: { ...filter } }),
      providesTags: (result, error, filter) => [{ type: "TimeSeries", id: filter.dateRange }],
    }),
    getPartySizeDistribution: build.query<PartySizeDistribution[], Filter>({
      query: (filter) => ({ url: "/reservations/partysize-distribution", params: { ...filter } }),
      providesTags: (result, error, filter) => [{ type: "PartySizeDistribution", id: filter.dateRange }],
    }),
    getWeekDayDistribution: build.query<WeekdayDistribution[], Filter>({
      query: (filter) => ({ url: "/reservations/weekday-distribution", params: { ...filter } }),
      providesTags: (result, error, filter) => [{ type: "WeekDayDistribution", id: filter.dateRange }],
    }),
  }),
});

export const { useGetAnalyticsOverviewQuery, useGetReservationsTimeSeriesQuery, useGetPartySizeDistributionQuery, useGetWeekDayDistributionQuery } =
  analyticsApiSlice;
