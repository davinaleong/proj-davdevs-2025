import Pagination from "./Pagination"

interface ListFooterProps {
    // Pagination props
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    
    // General props
    className?: string;
}

export default function ListFooter({
    currentPage,
    totalPages,
    onPageChange,
    className = ""
}: ListFooterProps) {
    return (
        <footer className={`p-2 ${className}`}>
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </footer>
    )
}