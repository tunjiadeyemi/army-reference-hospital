import React, { useState } from 'react';

const Pagination = ({
  totalItems,
  itemsPerPageOptions = [10, 20, 50],
  onPageChange
}: {
  totalItems: number;
  itemsPerPageOptions?: number[];
  onPageChange: (page: number, pageSize: number) => void;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(itemsPerPageOptions[0]);

  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page, pageSize); // Notify parent about page changes
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number(e.target.value);
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to the first page when page size changes
    onPageChange(1, newPageSize);
  };

  const getPageNumbers = () => {
    const visiblePages = 5; // Maximum number of pages to show
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between bg-green-50 px-4 py-3 rounded-md text-xs">
      {/* Page Size Selector */}
      <div className="flex items-center">
        <label className="mr-2">Page Size</label>
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          className="border border-gray-300 rounded px-2 py-1"
        >
          {itemsPerPageOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-3 py-1 rounded ${
            currentPage === 1 ? 'text-gray-400' : 'text-green-600 hover:bg-green-100'
          }`}
          disabled={currentPage === 1}
        >
          <img src="/arrow-left.svg" alt="" />
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded ${
              page === currentPage ? 'bg-green-500 text-white' : 'text-green-600 hover:bg-green-100'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages ? 'text-gray-400' : 'text-green-600 hover:bg-green-100'
          }`}
          disabled={currentPage === totalPages}
        >
          <img src="/arrow-right.svg" alt="" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
