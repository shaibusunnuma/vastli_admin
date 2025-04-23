import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterSelectProps {
  label: string;
  options: { value: string; label: string }[];
  onSelectFilter: (value: string) => void;
  selectedValue: string;
}

export const FilterSelect: React.FC<FilterSelectProps> = ({ label, options, onSelectFilter, selectedValue }) => {
  return (
    <div className="flex flex-row gap-2">
      <Select onValueChange={onSelectFilter} value={selectedValue}>
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} className="text-muted-foreground" />
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