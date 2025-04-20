import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface TableUtilizationChartProps {
  data: any[];
}

export const TableUtilizationChart: React.FC<TableUtilizationChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Table Utilization Rate</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
            <Tooltip formatter={(value) => `${(parseFloat(value as string) * 100).toFixed(1)}%`} />
            <Legend />
            <Bar dataKey="Utilization Rate" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};