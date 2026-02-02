import React, { useState, useEffect } from 'react';
import { useGetOfficers } from '../UnitBible/hooks/useUnitBible';

interface Officer {
  id: string | number;
  serviceNumber: string;
  name: string;
  rank: string;
}

interface OfficerSearchFieldProps {
  value: string;
  officerId?: string | number;
  onSelect: (officer: Officer) => void;
  onChange: (value: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export const OfficerSearchField = React.memo(
  ({
    value,
    officerId,
    onSelect,
    onChange,
    disabled = false,
    isLoading = false
  }: OfficerSearchFieldProps) => {
    const { data: officers } = useGetOfficers();
    const [openOfficerNames, setOpenOfficerNames] = useState(false);
    const [filteredOfficers, setFilteredOfficers] = useState<Officer[]>([]);
    const [isOfficerConfirmed, setIsOfficerConfirmed] = useState(false);
    const [officerFieldTouched, setOfficerFieldTouched] = useState(false);

    // Sync confirmation state when officerId changes
    useEffect(() => {
      setIsOfficerConfirmed(!!officerId && officerId !== 0);
    }, [officerId]);

    const handleSetOfficerId = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setOfficerFieldTouched(true);

      if (isOfficerConfirmed) {
        setIsOfficerConfirmed(false);
      }

      onChange(newValue);
      setOpenOfficerNames(true);

      const filtered = (officers as Officer[])?.filter(
        (officer: Officer) =>
          officer.serviceNumber.toLowerCase().includes(newValue.toLowerCase()) ||
          officer.name.toLowerCase().includes(newValue.toLowerCase())
      );
      setFilteredOfficers(filtered || []);

      if (newValue.trim() === '') {
        setOpenOfficerNames(false);
      }
    };

    const handleSelectOfficer = (officer: Officer) => {
      onChange(officer.serviceNumber);
      onSelect(officer);
      setIsOfficerConfirmed(true);
      setOpenOfficerNames(false);
    };

    const valueStr = String(value || '');
    const hasInput = valueStr.trim();
    const hasMatches = filteredOfficers.length > 0;

    let helperText = "Enter the officer's service number or name to search";
    let helperColor = 'text-gray-500';

    if (isOfficerConfirmed) {
      helperText = '✓ Officer confirmed';
      helperColor = 'text-green-600';
    } else if (officerFieldTouched && hasInput && !hasMatches) {
      helperText = 'No officer found with this service number or name';
      helperColor = 'text-amber-600';
    } else if (officerFieldTouched && hasInput && hasMatches && !isOfficerConfirmed) {
      helperText = 'Select an officer from the list to confirm';
      helperColor = 'text-blue-600';
    }

    return (
      <div className="relative w-full">
        <div className="relative">
          <input
            type="text"
            value={valueStr}
            onChange={handleSetOfficerId}
            onFocus={() => {
              if (valueStr && !isOfficerConfirmed) {
                setOpenOfficerNames(true);
              }
            }}
            onBlur={() => {
              setTimeout(() => setOpenOfficerNames(false), 200);
            }}
            placeholder="Search by service number or name"
            disabled={disabled || isLoading}
            className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-1 ${
              isOfficerConfirmed
                ? 'border-green-500 focus:ring-green-400 focus:border-green-400 bg-green-50'
                : officerFieldTouched && valueStr && !hasMatches
                  ? 'border-amber-400 focus:ring-amber-400 focus:border-amber-400'
                  : 'border-gray-300 focus:ring-gray-400 focus:border-gray-400'
            } ${
              disabled || isLoading
                ? 'bg-gray-50 text-gray-600 cursor-not-allowed'
                : 'placeholder-gray-400'
            }`}
          />
          {isOfficerConfirmed && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>

        <p className={`text-xs mt-1.5 ${helperColor}`}>{helperText}</p>

        {openOfficerNames && valueStr !== '' && !isOfficerConfirmed && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filteredOfficers.length > 0 ? (
              filteredOfficers.map((officer: Officer) => (
                <button
                  key={officer.id}
                  type="button"
                  onClick={() => handleSelectOfficer(officer)}
                  disabled={disabled || isLoading}
                  className="w-full px-4 py-2.5 text-left hover:bg-teal-50 focus:bg-teal-50 focus:outline-none disabled:opacity-50 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-900">{officer.name}</div>
                      <div className="text-xs text-gray-500">{officer.rank}</div>
                    </div>
                    <span className="text-sm text-gray-500">{officer.serviceNumber}</span>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-4 text-center">
                <p className="text-sm text-gray-600 font-medium">No officer found</p>
                <p className="text-xs text-gray-500 mt-1">Verify the service number or name</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

OfficerSearchField.displayName = 'OfficerSearchField';
