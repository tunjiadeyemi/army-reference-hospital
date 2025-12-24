/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from 'react';
import type { MainDataTableProps } from '../utils/types/department';
import Pagination from './Pagination';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { LOGO_BASE64 } from '../utils/constants';
import EmptyStateIcon from '../assets/navIcons/EmptyStateIcon';
interface FilterableOption {
  label: string;
  value: string;
}

interface MainTableProps<T> extends MainDataTableProps<T> {
  filterable?: {
    options: FilterableOption[];
    value: string;
    onChange: (value: string) => void;
    filterKey: keyof T;
  };
}

const MainTable = <T extends Record<string, any>>({
  data,
  columns,
  itemsPerPageOptions = [10, 25, 50, 100],
  defaultItemsPerPage = 10,
  showExportButtons = true,
  searchable = true,
  className = '',
  onCellClick,
  filterable
}: MainTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter data based on search term and filterable
  const filteredData = useMemo(() => {
    let filtered = data;
    if (filterable && filterable.value) {
      filtered = filtered.filter((item) => String(item[filterable.filterKey]) === filterable.value);
    }
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        Object.values(item).some((value) =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    return filtered;
  }, [data, searchTerm, filterable && filterable.value]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when search term changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  const handleExport = async (format: string) => {
    if (format === 'PDF') {
      const doc = new jsPDF('p', 'pt', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      const logoWidth = 100;
      const logoHeight = 50;
      const logoX = (pageWidth - logoWidth) / 2;
      const logoY = 20;
      doc.addImage(LOGO_BASE64, 'PNG', logoX, logoY, logoWidth, logoHeight);

      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      const title = '';
      const textWidth = doc.getTextWidth(title);
      const textX = (pageWidth - textWidth) / 2;
      doc.text(title, textX, logoY + logoHeight + 30);

      // ✅ Prepare table content
      const tableColumn = columns.map((col) => col.header);
      const tableRows = data.map((row) => columns.map((col) => row[col.key]));

      // ✅ Render table with autoTable
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: logoY + logoHeight + 50,
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 5 },
        headStyles: { fillColor: [34, 160, 142] },
        didDrawPage: () => {
          const pageCount = doc.getNumberOfPages();
          const currentPage = (doc.internal as any).getCurrentPageInfo().pageNumber;
          // Date (left)
          doc.setFontSize(9);
          doc.setTextColor(100);
          const date = new Date().toLocaleDateString();
          doc.text(`Generated on: ${date}`, 40, pageHeight - 20);

          // Page number (right)
          doc.text(`Page ${currentPage} of ${pageCount}`, pageWidth - 100, pageHeight - 20);
        }
      });

      doc.save('table_export.pdf');
    } else if (format === 'CSV') {
      // Implement CSV export here
    } else if (format === 'Excel') {
      // Implement Excel export here
    } else if (format === 'Print') {
      window.print();
    }
  };
  return (
    <div className={`bg-white ${className}`}>
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        {/* Left side - Show entries */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Show</span>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between w-16 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none"
            >
              {itemsPerPage}
              <img src="/department/chevron-down.svg" className="w-4 h-4 ml-1" alt="Dropdown" />
            </button>
            {isDropdownOpen && (
              <div className="absolute z-10 w-16 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {itemsPerPageOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setItemsPerPage(option);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center - Export buttons */}
        {showExportButtons && (
          <div className="flex">
            {['CSV', 'Excel', 'PDF', 'Print'].map((format) => (
              <button
                key={format}
                onClick={() => handleExport(format)}
                className="px-4 py-2 cursor-pointer text-sm text-gray-700 border border-gray-300 first:rounded-l-md last:rounded-r-md hover:bg-gray-50"
              >
                {format}
              </button>
            ))}
          </div>
        )}

        {filterable && (
          <select
            className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
            value={filterable.value}
            onChange={(e) => filterable.onChange(e.target.value)}
          >
            <option value="">All</option>
            {filterable.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}

        {/* Right side - Search */}
        {searchable && (
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700">
              Search
            </button>
            <div className="relative">
              <img
                alt="search"
                src="/public/department/search-icon.svg"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
              />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md outline-none w-64"
              />
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#22A08E] text-white">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-6 py-4 text-left text-sm font-medium uppercase tracking-wider ${
                    column.className || ''
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <EmptyStateIcon />
            
                    <p className="text-gray-500 text-lg font-medium">No records found</p>
                    <p className="text-gray-400 text-sm mt-2">There are no records to display</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-[#CFE6C8] ">
                  {columns.map((column, colIndex) => (
                    <td
                      key={String(column.key)}
                      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
                        column.className || ''
                      }`}
                      onClick={
                        onCellClick
                          ? () =>
                              onCellClick({
                                value: row[column.key],
                                row,
                                column,
                                rowIndex,
                                colIndex
                              })
                          : undefined
                      }
                      style={onCellClick ? { cursor: 'pointer' } : {}}
                    >
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default MainTable;
