import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRange } from "@/types/analytics.types";

interface DateRangePickerProps {
  onSelectRange: (range: DateRange) => void;
  selectedRange: DateRange;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ onSelectRange, selectedRange }) => {
  return (
    <div className="grid gap-2">
      <Select onValueChange={onSelectRange} value={selectedRange}>
        <SelectTrigger id="date-range" className="[&>span]:text-ellipsis [&>span]:overflow-hidden [&>span]:w-full">
          <SelectValue placeholder="Select date range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="last7d">Last 7 Days</SelectItem>
          <SelectItem value="last30d">Last 30 Days</SelectItem>
          <SelectItem value="thisMonth">This Month</SelectItem>
          <SelectItem value="lastMonth">Last Month</SelectItem>
          <SelectItem value="thisYear">This Year</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};