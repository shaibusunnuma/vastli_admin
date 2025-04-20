import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface KpiCardProps {
  title: string;
  value: string | number;
  description?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({ title, value, description }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {/* Icon could go here */}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  );
};