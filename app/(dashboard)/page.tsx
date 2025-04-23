"use client";

import { useState, useEffect } from "react";
import { DateRangePicker } from "@/views/analytics/DateRangePicker";
import { ReservationsChart } from "@/views/analytics/ReservationsChart";
import { GuestChart } from "@/views/analytics/GuestChart";
import { TableUtilizationChart } from "@/views/analytics/TableUtilizationChart";
import { SourceBreakdownChart } from "@/views/analytics/SourceBreakdownChart";
import { PartySizeChart } from "@/views/analytics/PartySizeChart";
import { DayOfWeekChart } from "@/views/analytics/DayOfWeekChart";
import { generateSampleData } from "@/lib/sampleData";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { KpiCard } from "@/views/analytics/KpiCard";
import { DateRange } from "@/types/analytics.types";
import { useGetAnalyticsOverviewQuery } from "@/lib/services/analytics/analyticsApiSlice";
import { Skeleton } from "@/components/ui/skeleton";

const AnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState<DateRange>(DateRange.LAST_7_DAYS);
  const [sampleData, setSampleData] = useState(generateSampleData(dateRange));

  const { data, isLoading } = useGetAnalyticsOverviewQuery(dateRange);
  useEffect(() => {
    setSampleData(generateSampleData(dateRange));
  }, [dateRange]);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <DateRangePicker selectedRange={dateRange} onSelectRange={setDateRange} />
      </div>

      {isLoading || !data ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KpiCard title="Total Reservations" value={data.totalReservations} description={`Based on data for ${dateRange}`} />
          <KpiCard title="Average Party Size" value={data.averagePartySize.toFixed(1)} description="Average number of guests per reservation" />
          <KpiCard title="No-Show Rate" value={`${data.noShowRate.toFixed(1)}%`} description={`Of total reservations in ${dateRange}`} />
          <KpiCard title="Cancellation Rate" value={`${data.cancellationRate.toFixed(1)}%`} description={`Of total reservations in ${dateRange}`} />
        </div>
      )}

      {/* Reservations Deep Dive */}
      <div className="grid gap-4 md:grid-cols-2">
        <ReservationsChart dateRange={dateRange} />
        <SourceBreakdownChart data={sampleData.sampleReservationSourceData} />
        <PartySizeChart dateRange={dateRange} />
        <DayOfWeekChart data={sampleData.sampleDayOfWeekData} />
      </div>

      {/* Guest Analytics */}
      <div className="grid gap-4 md:grid-cols-1">
        <GuestChart data={sampleData.sampleGuestData} />
        {/* Add more guest analytics charts here, e.g., Repeat Guest Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Repeat Guest Rate</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for Repeat Guest Rate Chart */}
            <div className="h-[350px] flex items-center justify-center text-muted-foreground">Repeat Guest Rate Chart Placeholder</div>
          </CardContent>
        </Card>
      </div>

      {/* Table & Capacity Management */}
      <div className="grid gap-4 md:grid-cols-1">
        <TableUtilizationChart data={sampleData.sampleTableUtilizationData} />
        {/* Add more table/capacity charts here */}
        <Card>
          <CardHeader>
            <CardTitle>Average Party Size per Table Size</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for Average Party Size per Table Size Chart */}
            <div className="h-[350px] flex items-center justify-center text-muted-foreground">
              Average Party Size per Table Size Chart Placeholder
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Staff Performance (Optional Placeholder) */}
      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Staff Performance (Placeholder)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] flex items-center justify-center text-muted-foreground">Staff Performance Charts Placeholder</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
