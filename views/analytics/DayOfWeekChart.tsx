import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useGetWeekDayDistributionQuery } from '@/lib/services/analytics/analyticsApiSlice';
import { useMemo } from 'react';
import { DateRange } from '@/types/analytics.types';

interface DayOfWeekChartProps {
  dateRange: DateRange;
}

export const DayOfWeekChart: React.FC<DayOfWeekChartProps> = ({ dateRange }) => {
  const { data: weekDayData } = useGetWeekDayDistributionQuery({ dateRange });
  const chartData = useMemo(() => {
    const labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekDayData?.map(item => ({ name: labels[item.weekday], count: item.count })) ?? [];
  }, [weekDayData]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reservations by Day of Week</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" name="Total Reservations" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};