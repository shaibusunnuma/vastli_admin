"use client";

import { useState, useEffect } from "react";
import { DateRangePicker } from "@/views/analytics/DateRangePicker";
import { ReservationsChart } from "@/views/analytics/ReservationsChart";
import { SourceBreakdownChart } from "@/views/analytics/SourceBreakdownChart";
import { PartySizeChart } from "@/views/analytics/PartySizeChart";
import { DayOfWeekChart } from "@/views/analytics/DayOfWeekChart";
import { generateSampleData } from "@/lib/sampleData";
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
    <div className="flex flex-col gap-6">
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
        <DayOfWeekChart dateRange={dateRange} />
      </div>

      {/* Guest Analytics */}
      {/* <div className="grid gap-4 md:grid-cols-1">
        <GuestChart data={sampleData.sampleGuestData} />
        <Card>
          <CardHeader>
            <CardTitle>Repeat Guest Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] flex items-center justify-center text-muted-foreground">Repeat Guest Rate Chart Placeholder</div>
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
};

export default AnalyticsDashboard;
