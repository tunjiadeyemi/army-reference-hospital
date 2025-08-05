/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface User {
  status?: any;
  dateCreated?: string;
  lastEdited?: string;
  [key: string]: any; // Allow other properties for flexibility
}

interface StatusHeaderProps {
  user: User;
  onPDF?: () => void;
  onPrint?: () => void;
  onEdit?: () => void;
}

const StatusHeader: React.FC<StatusHeaderProps> = ({ user, onPDF, onPrint, onEdit }) => {
  // Default dates if not provided
  const dateCreated = user.dateCreated || '22/05/2025';
  const lastEdited = user.lastEdited || '06/07/2025';
  const timeCreated = '1300 : 20sec';
  const timeEdited = '1300';

  const getStatusConfig = (status: string) => {
    switch (status && status.toLowerCase()) {
      case 'active':
        return {
          label: 'Active',
          color: 'text-[#22A08E]',
          dotColor: 'bg-[#22A08E]'
        };
      case 'inactive':
        return {
          label: 'SOS ( Inactive )',
          color: 'text-red-500',
          dotColor: 'bg-red-500'
        };
      case 'pending':
        return {
          label: 'Pending',
          color: 'text-yellow-600',
          dotColor: 'bg-yellow-500'
        };
      case 'suspended':
        return {
          label: 'Suspended',
          color: 'text-orange-600',
          dotColor: 'bg-orange-500'
        };
      default:
        return {
          label: 'Unknown',
          color: 'text-gray-500',
          dotColor: 'bg-gray-300'
        };
    }
  };

  const statusConfig = getStatusConfig(user.status);

  return (
    <div className="w-full bg-white px-6 py-4">
      {/* Top row with dates and buttons */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-8 text-sm text-gray-600">
          <span>
            Date created: {dateCreated} {timeCreated}
          </span>
          <span>
            Last edited: {lastEdited} {timeEdited}
          </span>
        </div>
        <div className="flex">
          <button
            onClick={onPDF}
            className="px-3 py-1 text-sm text-gray-600 border border-gray-300 cursor-pointer rounded-l-md hover:bg-gray-50 transition-colors"
          >
            PDF
          </button>
          <button
            onClick={onPrint}
            className="px-3 py-1 text-sm text-gray-600 border border-l-0 border-r-0 border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            Print
          </button>
          <button
            onClick={onEdit}
            className="px-3 py-1 text-sm text-gray-600 border border-gray-300 cursor-pointer rounded-r-md hover:bg-gray-50 transition-colors"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Status section */}
      <div className="text-center">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Status</h2>
        <div className="flex justify-center items-center gap-8">
          {/* Active status */}
          <div className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center ${
                user.status === 'active' ? 'bg-white' : ''
              }`}
            >
              {user.status === 'active' && <div className="w-2 h-2 bg-gray-400 rounded-full"></div>}
            </div>
            <span
              className={`text-sm ${user.status === 'active' ? 'text-gray-600' : 'text-gray-400'}`}
            >
              Active
            </span>
          </div>

          {/* Dynamic status */}
          <div className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full border-2 border-red-500 flex items-center justify-center ${
                user.status !== 'active' ? 'bg-white' : ''
              }`}
            >
              {user.status !== 'active' && (
                <div className={`w-2 h-2 ${statusConfig.dotColor} rounded-full`}></div>
              )}
            </div>
            <span
              className={`text-sm ${
                user.status !== 'active' ? statusConfig.color : 'text-gray-400'
              }`}
            >
              {user.status !== 'active' ? statusConfig.label : 'SOS ( Inactive )'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusHeader;
