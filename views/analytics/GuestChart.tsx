import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface GuestChartProps {
  data: any[];
}

export const GuestChart: React.FC<GuestChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New vs. Returning Guests</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="New Guests" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="Returning Guests" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};