import DropdownMenu from './DropdownMenu'
import { getSortOptions } from '../utils/site-config'

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
  const sortConfig = getSortOptions()
  
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