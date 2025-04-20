'use client';

import { useState, useEffect } from 'react';
import { DateRangePicker } from '@/views/analytics/DateRangePicker';
import { ReservationsChart } from '@/views/analytics/ReservationsChart';
import { GuestChart } from '@/views/analytics/GuestChart';
import { TableUtilizationChart } from '@/views/analytics/TableUtilizationChart';
import { SourceBreakdownChart } from '@/views/analytics/SourceBreakdownChart';
import { PartySizeChart } from '@/views/analytics/PartySizeChart';
import { DayOfWeekChart } from '@/views/analytics/DayOfWeekChart';
import { generateSampleData } from '@/lib/sampleData'; // Adjust the import path as needed
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { KpiCard } from '@/views/analytics/KpiCard';


const AnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState('last7d');
  const [sampleData, setSampleData] = useState(generateSampleData(dateRange));

  useEffect(() => {
    setSampleData(generateSampleData(dateRange));
  }, [dateRange]);

  // Calculate KPI values based on current sample data
  const totalReservations = sampleData.sampleReservationsData.reduce((sum, d) => sum + d.total, 0);
  const totalCovers = sampleData.sampleReservationsData.reduce((sum, d) => sum + d.seated, 0);
  const averagePartySize = sampleData.samplePartySizeData.reduce((sum, d) => sum + d.value * parseInt(d.name.replace('+', '').split('-')[0]), 0) / sampleData.samplePartySizeData.reduce((sum, d) => sum + d.value, 0) || 0;
  const totalNoShows = sampleData.sampleReservationsData.reduce((sum, d) => sum + d.noShows, 0);
  const noShowRate = totalReservations > 0 ? (totalNoShows / totalReservations) * 100 : 0;
   // Assuming cancellation data is part of sampleReservationsData structure
  const totalCancelled = sampleData.sampleReservationsData.reduce((sum, d) => sum + d.cancelled, 0);
  const cancellationRate = totalReservations > 0 ? (totalCancelled / totalReservations) * 100 : 0;
  // Average turn time is harder to simulate accurately without more complex data, using a placeholder
  const averageTurnTime = "Approx. 75 min";


  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <DateRangePicker selectedRange={dateRange} onSelectRange={setDateRange} />
      </div>

      {/* Overview Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Total Reservations" value={totalReservations} description={`Based on data for ${dateRange}`} />
        <KpiCard title="Total Covers" value={totalCovers} description={`Based on data for ${dateRange}`} />
        <KpiCard title="Average Party Size" value={averagePartySize.toFixed(1)} description="Average number of guests per reservation" />
        <KpiCard title="No-Show Rate" value={`${noShowRate.toFixed(1)}%`} description={`Of total reservations in ${dateRange}`} />
         <KpiCard title="Cancellation Rate" value={`${cancellationRate.toFixed(1)}%`} description={`Of total reservations in ${dateRange}`} />
         <KpiCard title="Average Turn Time" value={averageTurnTime} description="Estimated average table turn time" />
      </div>

      {/* Reservations Deep Dive */}
      <div className="grid gap-4 md:grid-cols-2">
         <ReservationsChart data={sampleData.sampleReservationsData} range={dateRange} />
         <SourceBreakdownChart data={sampleData.sampleReservationSourceData} />
         <PartySizeChart data={sampleData.samplePartySizeData} />
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
              <div className="h-[350px] flex items-center justify-center text-muted-foreground">
                Repeat Guest Rate Chart Placeholder
              </div>
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
             <div className="h-[350px] flex items-center justify-center text-muted-foreground">
               Staff Performance Charts Placeholder
             </div>
           </CardContent>
         </Card>
       </div>

    </div>
  );
};

export default AnalyticsDashboard;
