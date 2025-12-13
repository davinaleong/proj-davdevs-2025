'use client'

import Pagination from "./components/Pagination"

export default function Home() {
  const handlePageChange = (page: number) => {
    console.log(`Navigate to page ${page}`);
  };

  return (
    <div>
      <Pagination 
        currentPage={3}
        totalPages={10}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
