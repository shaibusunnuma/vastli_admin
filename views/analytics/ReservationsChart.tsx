import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useGetReservationsTimeSeriesQuery } from '@/lib/services/analytics/analyticsApiSlice';
import { DateRange } from '@/types/analytics.types';

interface ReservationsChartProps {
  dateRange: DateRange;
}

export const ReservationsChart: React.FC<ReservationsChartProps> = ({ dateRange }) => {
  const { data: reservationsData } = useGetReservationsTimeSeriesQuery({ dateRange });
  const isHourlyOrDaily = dateRange === 'today' || dateRange === 'last7d' || dateRange === 'last30d' || dateRange === 'thisMonth' || dateRange === 'lastMonth';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reservations Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          {isHourlyOrDaily ? (
            <LineChart data={reservationsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#8884d8" name="Total Reservations" />
               <Line type="monotone" dataKey="seated" stroke="#82ca9d" name="Seated" />
               <Line type="monotone" dataKey="noShows" stroke="#ff0000" name="No Shows" />
            </LineChart>
          ) : ( // Assuming 'thisYear' for monthly bars
             <BarChart data={reservationsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" name="Total Reservations" />
                <Bar dataKey="seated" fill="#82ca9d" name="Seated" />
                <Bar dataKey="noShows" fill="#ff0000" name="No Shows" />
             </BarChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};