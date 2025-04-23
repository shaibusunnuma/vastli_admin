import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useGetPartySizeDistributionQuery } from '@/lib/services/analytics/analyticsApiSlice';
import { DateRange } from '@/types/analytics.types';
import { useState, useMemo } from "react";
import { FilterSelect } from "@/views/analytics/FilterSelect";

interface PartySizeChartProps {
  dateRange: DateRange;
}

export const PartySizeChart: React.FC<PartySizeChartProps> = ({ dateRange }) => {
  const { data: partySizeData } = useGetPartySizeDistributionQuery({ dateRange });

  const [grouping, setGrouping] = useState<"detailed" | "grouped">("detailed");

  const groupingOptions = [
    { value: "detailed", label: "Detailed" },
    { value: "grouped", label: "Grouped" },
  ];

  const chartData = useMemo(() => {
    if (partySizeData && partySizeData.length) {
      if (grouping === "detailed") {
        return partySizeData.map(item => ({ name: item.partySize.toString(), value: item.count }));
      }
      const buckets = [
        { label: "1-2", min: 1, max: 2 },
        { label: "3-4", min: 3, max: 4 },
        { label: "5+", min: 5, max: Infinity },
      ];
      return buckets.map(bucket => {
        const count = partySizeData
          .filter(item => item.partySize >= bucket.min && item.partySize <= bucket.max)
          .reduce((sum, item) => sum + item.count, 0);
        return { name: bucket.label, value: count };
      });
    }
    return [];
  }, [partySizeData, grouping]);

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Reservations by Party Size</CardTitle>
        <FilterSelect
          label="View"
          options={groupingOptions}
          selectedValue={grouping}
          onSelectFilter={value => setGrouping(value as "detailed" | "grouped")}
        />
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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