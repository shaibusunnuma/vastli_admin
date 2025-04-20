import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface DayOfWeekChartProps {
  data: { name: string; total: number }[];
}

export const DayOfWeekChart: React.FC<DayOfWeekChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reservations by Day of Week</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#82ca9d" name="Total Reservations" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};