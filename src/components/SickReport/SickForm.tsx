/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

interface SickFormProps {
  isEdit?: boolean;
  mockData?: any;
}

export default function SickForm({ isEdit = true, mockData }: SickFormProps) {
  const [formData, setFormData] = useState(
    isEdit
      ? {
          armyNumber: '',
          rank: '',
          name: '',
          department: '',
          excuseDuty: 'Excuse shaving',
          excuseDutyDays: '10',
          admission: 'Yes-',
          admissionDays: '',
          sickLeaveDays: '',
          returnDate: '05/20/2026',
          remarks: ''
        }
      : mockData
  );

  const [dropdowns, setDropdowns] = useState({
    rank: false,
    department: false,
    excuseDuty: false
  });

  const excuseDutyOptions = [
    'Excuse shaving',
    'Excuse all duty',
    'Excuse Belt',
    'Excuse Marching',
    'None'
  ];

  interface SickFormData {
    armyNumber: string;
    rank: string;
    name: string;
    department: string;
    excuseDuty: string;
    excuseDutyDays: string;
    admission: string;
    admissionDays: string;
    sickLeaveDays: string;
    returnDate: string;
    remarks: string;
  }

  interface DropdownsState {
    rank: boolean;
    department: boolean;
    excuseDuty: boolean;
  }

  type DropdownField = keyof DropdownsState;

  const toggleDropdown = (field: DropdownField) => {
    if (!isEdit) return;
    setDropdowns((prev: DropdownsState) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  interface HandleInputChange {
    (field: keyof SickFormData, value: string): void;
  }

  const handleInputChange: HandleInputChange = (field, value) => {
    if (!isEdit) return;
    setFormData((prev: SickFormData) => ({
      ...prev,
      [field]: value
    }));
  };

  interface SelectOptionHandler {
    (field: keyof SickFormData, value: string): void;
  }

  const selectOption: SelectOptionHandler = (field, value) => {
    if (!isEdit) return;
    handleInputChange(field, value);
    setDropdowns((prev: DropdownsState) => ({
      ...prev,
      [field]: false
    }));
  };

  return (
    <div className="px-5">
      <div className="space-y-6">
        {/* Army Number */}
        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
            ARMY NUMBER
          </label>
          <div className="col-span-9">
            <input
              type="text"
              placeholder="Army Number"
              value={formData.armyNumber}
              onChange={(e) => handleInputChange('armyNumber', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
              }`}
            />
          </div>
        </div>

        {/* Rank */}
        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
            RANK
          </label>
          <div className="col-span-9 relative">
            <button
              type="button"
              onClick={() => toggleDropdown('rank')}
              disabled={!isEdit}
              className={`w-full px-3 py-2.5 border border-gray-300 rounded-md text-left focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 flex justify-between items-center ${
                !isEdit ? 'bg-gray-50 cursor-not-allowed' : ''
              }`}
            >
              <span className={formData.rank ? 'text-gray-900' : 'text-gray-400'}>
                {formData.rank || 'Rank'}
              </span>
              {isEdit && <img src="/chevron-down.svg" alt="" className="h-5 w-5 text-gray-400" />}
            </button>
          </div>
        </div>

        {/* Name */}
        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
            NAME
          </label>
          <div className="col-span-9">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
              }`}
            />
          </div>
        </div>

        {/* Department */}
        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
            DEPARTMENT
          </label>
          <div className="col-span-9 relative">
            <button
              type="button"
              onClick={() => toggleDropdown('department')}
              disabled={!isEdit}
              className={`w-full px-3 py-2.5 border border-gray-300 rounded-md text-left focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 flex justify-between items-center ${
                !isEdit ? 'bg-gray-50 cursor-not-allowed' : ''
              }`}
            >
              <span className={formData.department ? 'text-gray-900' : 'text-gray-400'}>
                {formData.department || 'Department'}
              </span>
              {isEdit && <img src="/chevron-down.svg" alt="" className="h-5 w-5 text-gray-400" />}
            </button>
          </div>
        </div>

        {/* Action Header */}
        <div className="text-center py-4">
          <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">ACTION</h3>
        </div>

        {/* Excuse Duty */}
        <div className="grid grid-cols-12 gap-4 items-start">
          <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
            EXCUSE DUTY
          </label>
          <div className="col-span-6 relative">
            <button
              type="button"
              onClick={() => toggleDropdown('excuseDuty')}
              disabled={!isEdit}
              className={`w-full px-3 py-2.5 border border-gray-300 rounded-md text-left focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 flex justify-between items-center ${
                !isEdit ? 'bg-gray-50 cursor-not-allowed' : ''
              }`}
            >
              <span className="text-gray-900">{formData.excuseDuty}</span>
              {isEdit && <img src="/chevron-down.svg" alt="" className="h-5 w-5 text-gray-400" />}
            </button>
            {dropdowns.excuseDuty && isEdit && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                {excuseDutyOptions.map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => selectOption('excuseDuty', option)}
                    className={`w-full px-3 py-2 text-left hover:bg-gray-50 ${
                      option === 'Excuse shaving' ? 'bg-teal-500 text-white' : 'text-gray-900'
                    } ${index === 0 ? 'rounded-t-md' : ''} ${
                      index === excuseDutyOptions.length - 1 ? 'rounded-b-md' : ''
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Excuse Duty Days */}
        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
            EXCUSE DUTY (NO. OF DAYS)
          </label>
          <div className="col-span-9">
            <input
              type="text"
              value={formData.excuseDutyDays}
              onChange={(e) => handleInputChange('excuseDutyDays', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* Admission and Admission Days */}
        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
            ADMISSION
          </label>
          <div className="col-span-4">
            <input
              type="text"
              value={formData.admission}
              onChange={(e) => handleInputChange('admission', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
          <label className="col-span-2 text-sm font-medium text-gray-700 uppercase tracking-wide">
            ADMISSION NO. OF DAYS
          </label>
          <div className="col-span-3">
            <input
              type="text"
              placeholder="No of days"
              value={formData.admissionDays}
              onChange={(e) => handleInputChange('admissionDays', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
              }`}
            />
          </div>
        </div>

        {/* Sick Leave */}
        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
            SICK LEAVE NO. OF DAYS
          </label>
          <div className="col-span-9">
            <input
              type="text"
              placeholder="No of days"
              value={formData.sickLeaveDays}
              onChange={(e) => handleInputChange('sickLeaveDays', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
              }`}
            />
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 my-8" />

        {/* Return Date */}
        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
            RETURN DATE
          </label>
          <div className="col-span-9">
            <input
              type="text"
              value={formData.returnDate}
              onChange={(e) => handleInputChange('returnDate', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* Remarks */}
        <div className="grid grid-cols-12 gap-4 items-start">
          <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
            REMARKS
          </label>
          <div className="col-span-9">
            <textarea
              rows={3}
              placeholder="Remarks"
              value={formData.remarks}
              onChange={(e) => handleInputChange('remarks', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-none ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
              }`}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center pt-8">
          <button
            type="button"
            disabled={!isEdit}
            className={`font-medium py-3 px-8 rounded-md transition-colors duration-200 ${
              isEdit
                ? 'bg-teal-600 hover:bg-teal-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
