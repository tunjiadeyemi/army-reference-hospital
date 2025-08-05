import type { TableProps } from '../utils/types';

const Table = <T,>({ data, columns, className = '' }: TableProps<T>) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#2D403D] text-white">
              {columns.map((column, index) => (
                <th key={index} className="px-4 py-3 text-left text-sm font-medium">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-4 py-3 text-sm text-[#2D403D] hover:bg-[#CFE6C8] ${
                      column.className || ''
                    }`}
                  >
                    {String(row[column.accessKey])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
