import SearchInput from "./../components/SearchInput"
import SortInput from './../components/SortInput'

interface ListHeaderProps {
    // Search props
    onSearch?: (searchTerm: string) => void;
    onSearchChange?: (searchTerm: string) => void;
    searchPlaceholder?: string;
    
    // Sort props
    sortValue?: string;
    onSortChange?: (value: string) => void;
    
    // General props
    className?: string;
}

export default function ListHeader({
    onSearch,
    onSearchChange,
    searchPlaceholder,
    sortValue,
    onSortChange,
    className = ""
}: ListHeaderProps) {
    return (
        <header className={`flex gap-2 bg-slate-100 dark:bg-gray-900 p-2 ${className}`}>
            <SearchInput 
                onSearch={onSearch}
                onSearchChange={onSearchChange}
                placeholder={searchPlaceholder}
                className="flex-2" 
            />
            <SortInput 
                value={sortValue}
                onChange={onSortChange}
                className="flex-1" 
            />
        </header>
    )
}