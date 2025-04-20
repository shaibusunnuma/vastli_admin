import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PartySizeChartProps {
  data: { name: string; value: number }[];
}

export const PartySizeChart: React.FC<PartySizeChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reservations by Party Size</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" name="Number of Reservations" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};