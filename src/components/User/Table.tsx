/* eslint-disable @typescript-eslint/no-explicit-any */

import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const Table = ({
  title,
  data,
  columns,
  tableName = '',
  showHeader = false,
  isSchool = false,
  deletable = false, // New prop for delete
  editable = false, // New prop for edit
  onDelete, // Callback function for delete
  onEdit, // Callback function for edit
  onAdminNameClick // Callback function for admin name click
}: any) => {
  const { setShowAdminDetails, setAdminDetails } = useContext(AppContext);

  return (
    <div className="w-full bg-white rounded-lg">
      {title && <h2 className="text-lg font-semibold p-4 pb-2">{title}</h2>}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          {showHeader && (
            <thead>
              <tr>
                {columns.map((column: any, index: any) => (
                  <th
                    key={index}
                    className="py-4 px-4 text-left text-sm font-medium bg-[#22A08E] text-white"
                  >
                    {column.header}
                  </th>
                ))}
                {editable && (
                  <th className="py-4 px-4 text-left text-sm font-medium bg-[#22A08E] text-white"></th>
                )}
                {deletable && (
                  <th className="py-4 px-4 text-left text-sm font-medium bg-[#22A08E] text-white"></th>
                )}
              </tr>
            </thead>
          )}
          <tbody>
            {data?.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + (editable ? 1 : 0) + (deletable ? 1 : 0)}
                  className="text-center py-[5rem]"
                >
                  <img
                    src="/empty-state-icons/schools.svg"
                    alt="image"
                    className="w-10 mx-auto mb-2"
                  />
                  <p>{tableName !== 'admin' ? `No ${tableName} available` : 'Yet to add admin'}</p>
                </td>
              </tr>
            )}
            {!isSchool &&
              data?.map((row: any, rowIndex: any) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-[#22A08E]'}>
                  {columns.map((column: any, colIndex: any) => {
                    if (column.accessor === 'status') {
                      return (
                        <td
                          key={colIndex}
                          className={`py-2.5 px-4 text-sm cursor-pointer ${
                            row[column.accessor] === 'Active' ? 'text-[#22A08E]' : 'text-[#FF2A2A]'
                          } `}
                        >
                          {row[column.accessor]}
                        </td>
                      );
                    } else {
                      return (
                        <td key={colIndex} className="py-2.5 px-4 text-sm text-gray-700">
                          {row[column.accessor] || 'Nil'}
                        </td>
                      );
                    }
                  })}

                  {editable && (
                    <td className="py-2.5 px-4 text-sm text-blue-600 cursor-pointer">
                      <button onClick={() => onEdit && onEdit(row)} className="hover:underline">
                        <img src="/edit-icon.svg" alt="" />
                      </button>
                    </td>
                  )}
                  {deletable && (
                    <td className="py-2.5 px-4 text-sm text-red-600 cursor-pointer">
                      <button onClick={() => onDelete && onDelete(row)} className="hover:underline">
                        <img src="/delete-icon.svg" alt="" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            {isSchool &&
              data?.map((row: any, rowIndex: any) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-[#FBFBFB]'}>
                  {columns.map((column: any, colIndex: any) => {
                    if (column.accessor === 'Name') {
                      return (
                        <td
                          key={colIndex}
                          className="py-2.5 px-4 text-sm text-gray-700 cursor-pointer"
                          // onClick={() => {
                          //   setSchoolDetails(row);
                          //   setShowSchoolDetails(true);
                          // }}
                        >
                          {row[column.accessor]}
                        </td>
                      );
                    } else if (column.accessor === 'name') {
                      return (
                        <td
                          key={colIndex}
                          onClick={() => onAdminNameClick(row)}
                          className="py-2.5 px-4 text-sm text-green-700 cursor-pointer"
                          // onClick={() => {
                          //   setStudentDetails(row);
                          //   setShowStudentDetails(true);
                          // }}
                        >
                          {row[column.accessor]}
                        </td>
                      );
                    } else if (column.accessor === 'adminName') {
                      return (
                        <td
                          key={colIndex}
                          className="py-2.5 px-4 text-sm text-green-700 cursor-pointer"
                          onClick={() => {
                            setAdminDetails(row);
                            setShowAdminDetails(true);
                          }}
                        >
                          {row[column.accessor]}
                        </td>
                      );
                    } else if (column.accessor === 'status') {
                      return (
                        <td
                          key={colIndex}
                          className={`py-2.5 px-4 text-sm cursor-pointer ${
                            row[column.accessor] === 'Active' ? 'text-[#22A08E]' : 'text-[#FF2A2A]'
                          } `}
                        >
                          {row[column.accessor]}
                        </td>
                      );
                    } else {
                      return (
                        <td key={colIndex} className="py-2.5 px-4 text-sm text-gray-700">
                          {row[column.accessor]}
                        </td>
                      );
                    }
                  })}
                  {editable && (
                    <td className="py-2.5 px-4 text-sm text-blue-600 cursor-pointer">
                      <button
                        onClick={() => onEdit && onEdit(row)}
                        className="hover:scale-110 duration-300 transition-all"
                      >
                        <img src="/edit-icon.svg" alt="" />
                      </button>
                    </td>
                  )}
                  {deletable && (
                    <td className="py-2.5 px-4 text-sm text-red-600 cursor-pointer">
                      <button
                        onClick={() => onDelete && onDelete(row)}
                        className="hover:scale-110 duration-300 transition-all"
                      >
                        <img src="/delete-icon.svg" alt="" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
