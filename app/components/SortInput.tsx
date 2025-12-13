import DropdownMenu from './DropdownMenu'
import sortConfig from './../config/sort-options.json'

interface SortInputProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export default function SortInput({ 
  value = '',
  onChange,
  className = ""
}: SortInputProps) {
  return (
    <DropdownMenu
      groups={sortConfig.groups}
      value={value}
      onChange={onChange}
      placeholder="Sort"
      className={className}
    />
  );
}