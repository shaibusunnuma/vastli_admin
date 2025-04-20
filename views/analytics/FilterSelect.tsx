import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface FilterSelectProps {
  label: string;
  options: { value: string; label: string }[];
  onSelectFilter: (value: string) => void;
  selectedValue: string;
}

export const FilterSelect: React.FC<FilterSelectProps> = ({ label, options, onSelectFilter, selectedValue }) => {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Select onValueChange={onSelectFilter} value={selectedValue}>
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};