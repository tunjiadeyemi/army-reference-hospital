/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

import useFormChangeHandler from '../../hooks/dashboardhooks/useLargeFormHandler';
import {
  useCreateSickReport,
  useGetSickReports,
  useOfficersData,
  useUpdateSickReport
} from '../../hooks/dashboardhooks/useDasboardData';
import Loader from '../ui/Loader';
import { showSuccess } from '../../utils/toast';

interface SickFormProps {
  isEdit?: boolean;
  mockData?: any;
}

export default function SickForm({ isEdit = true, mockData }: SickFormProps) {
  interface SickFormData {
    id: number;
    serviceNumber: string;
    recServiceNumber: string;
    rank: string;
    name: string;
    department: string;
    excuse_duty: string;
    excuse_duty_days: string;
    admission: string;
    recRank: string;
    recName: string;
    admission_days: string;
    sick_leave_days: string;
    return_date: string;
    remark: string;
    officer_id?: string;
    recommending_officer_id?: string;
  }

  interface DropdownsState {
    rank: boolean;
    department: boolean;
    excuseDuty: boolean;
    recOfficerSelect: boolean;
    recName: boolean;
    recRank: boolean;
    name: boolean;
  }

  interface HandleInputChange {
    (field: keyof SickFormData, value: string): void;
  }

  type DropdownField = keyof DropdownsState;

  const getInitialSickReport = (): SickFormData => {
    if (mockData) {
      return {
        id: mockData.id || '',
        serviceNumber: mockData.serviceNumber || '',
        recServiceNumber: mockData.recommending_officer?.armyNumber || '',
        rank: mockData.rank || '',
        name: mockData.name || '',
        department: mockData.department || '',
        officer_id: mockData.id || '',
        recommending_officer_id: mockData.recommending_officer_id || '',
        excuse_duty: mockData.excuse || mockData.excuse_duty || '',
        excuse_duty_days: String(mockData.excuse_duty_days || ''),
        admission: mockData.admission || '',
        recRank: mockData.recommending_officer?.rank || mockData.recRank || '',
        recName: mockData.recommending_officer?.name || mockData.recName || '',
        admission_days: String(mockData.admission_days || ''),
        sick_leave_days: String(mockData.sick_leave_days || ''),
        return_date: mockData.returnDate || mockData.return_date || '',
        remark: mockData.remark || mockData.remarks || ''
      };
    }
    return {
      id: parseInt(''),
      serviceNumber: '',
      recServiceNumber: '',
      rank: '',
      name: '',
      department: '',
      excuse_duty: 'Excuse shaving',
      excuse_duty_days: '10',
      admission: 'Yes',
      recRank: '',
      recName: '',
      admission_days: '',
      sick_leave_days: '',
      return_date: '05/20/2026',
      remark: ''
    };
  };

  const [dropdowns, setDropdowns] = useState<DropdownsState>({
    rank: false,
    department: false,
    excuseDuty: false,
    recOfficerSelect: false,
    recName: false,
    recRank: false,
    name: false
  });

  // FORM SELECT OPTIONS
  const excuseDutyOptions = [
    'Excuse shaving',
    'Excuse all duty',
    'Excuse Belt',
    'Excuse Marching',
    'None'
  ];
  const departmentOptions = ['Weapons', 'Training', 'Mobilization'];
  const rankOptions = ['Colonel', 'Soldier', 'Major'];

  // HOOKS
  const { formData, setFormData } = useFormChangeHandler<SickFormData>(getInitialSickReport());
  const { data: officersData = [] } = useOfficersData();

  const createMutation = useCreateSickReport();
  const updateMutation = useUpdateSickReport();
  const { refetch } = useGetSickReports();
  const { isPending } = createMutation;
  const { isPending: updating } = updateMutation;

  // FUNCTIONS
  const toggleDropdown = (field: DropdownField) => {
    if (!isEdit) return;
    setDropdowns((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleInputChange: HandleInputChange = (field, value) => {
    if (!isEdit) return;
    setFormData((prev) => ({
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

    // Map SickFormData field to DropdownsState field if they differ
    const dropdownField = field === 'excuse_duty' ? 'excuseDuty' : field;

    if (dropdownField in dropdowns) {
      setDropdowns((prev) => ({
        ...prev,
        [dropdownField as keyof DropdownsState]: false
      }));
    }
  };

  const filteredOfficerId = officersData.filter(
    (officer: any) => formData.serviceNumber === officer.serviceNumber
  );

  const filteredSelectedOfficerId = officersData.filter(
    (officer: any) => formData.recServiceNumber === officer.serviceNumber
  );

  const handleSetArmyName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const serviceNumber = e.target.value;
    handleInputChange('serviceNumber', serviceNumber);

    // Find officer with matching service number
    const matchingOfficer = officersData.find(
      (officer: any) => officer.serviceNumber === serviceNumber
    );

    if (matchingOfficer) {
      setFormData((prev) => ({
        ...prev,
        name: matchingOfficer.name,
        rank: matchingOfficer.rank || prev.rank,
        department: matchingOfficer.department || prev.department
      }));
    }
  };

  const handleSickReport = async () => {
    const payload = {
      ...formData,
      officer_id: filteredOfficerId[0]?.id || '',
      recommending_officer_id: filteredSelectedOfficerId[0]?.id || ''
    };

    try {
      if (mockData) {
        await updateMutation.mutateAsync(payload, {
          onSuccess: async () => {
            showSuccess('Successfully Updated Sick Report');
            await refetch();
          }
        });
      } else {
        await createMutation.mutateAsync(payload, {
          onSuccess: async () => {
            showSuccess('Successfully Added Sick Report');
            await refetch();
          }
        });
      }
    } catch (error) {
      console.error('Error submitting sick report:', error);
    }
  };

  interface Officer {
    rank: string;
    name: string;
    serviceNumber: string;
    appointment: string;
    image: string;
    id?: string;
  }

  const selectOfficer = (officer: Officer, section: 'rec' | 'cmd') => {
    if (!isEdit) return;
    if (section === 'rec') {
      setFormData((prev) => ({
        ...prev,
        recRank: officer.rank,
        recName: officer.name,
        recServiceNumber: officer.serviceNumber
      }));
      setDropdowns((prev) => ({
        ...prev,
        recOfficerSelect: false
      }));
    }
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
              value={formData.serviceNumber}
              onChange={handleSetArmyName}
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
            {dropdowns.rank && isEdit && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                {rankOptions.map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => selectOption('rank', option)}
                    className={`w-full px-3 py-2 text-left hover:bg-gray-50 text-gray-900 ${
                      index === 0 ? 'rounded-t-md' : ''
                    } ${index === rankOptions.length - 1 ? 'rounded-b-md' : ''}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Name */}
        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
            NAME
          </label>
          <div className="col-span-9 relative">
            <button
              type="button"
              onClick={() => toggleDropdown('name')}
              disabled={!isEdit}
              className={`w-full px-3 py-2.5 border border-gray-300 rounded-md text-left focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 flex justify-between items-center ${
                !isEdit ? 'bg-gray-50 cursor-not-allowed' : ''
              }`}
            >
              <span className={formData.name ? 'text-gray-900' : 'text-gray-400'}>
                {formData.name || 'Name'}
              </span>
              {isEdit && <img src="/chevron-down.svg" alt="" className="h-5 w-5 text-gray-400" />}
            </button>
            {dropdowns.name && isEdit && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {officersData.map((officer: any, index: number) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => selectOption('name', officer.name)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 text-gray-900 first:rounded-t-md last:rounded-b-md"
                  >
                    <div className="flex justify-between items-center">
                      <span>{officer.name}</span>
                      <span className="text-sm text-gray-500">{officer.serviceNumber}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
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
            {dropdowns.department && isEdit && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                {departmentOptions.map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => selectOption('department', option)}
                    className={`w-full px-3 py-2 text-left hover:bg-gray-50 text-gray-900 ${
                      index === 0 ? 'rounded-t-md' : ''
                    } ${index === departmentOptions.length - 1 ? 'rounded-b-md' : ''}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
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
              <span className="text-gray-900">{formData.excuse_duty}</span>
              {isEdit && <img src="/chevron-down.svg" alt="" className="h-5 w-5 text-gray-400" />}
            </button>
            {dropdowns.excuseDuty && isEdit && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                {excuseDutyOptions.map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => selectOption('excuse_duty', option)}
                    className={`w-full px-3 py-2 text-left hover:bg-gray-50 ${
                      option === formData.excuse_duty ? 'bg-teal-500 text-white' : 'text-gray-900'
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
              value={formData.excuse_duty_days}
              onChange={(e) => handleInputChange('excuse_duty_days', e.target.value)}
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
              value={formData.admission_days}
              onChange={(e) => handleInputChange('admission_days', e.target.value)}
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
              value={formData.sick_leave_days}
              onChange={(e) => handleInputChange('sick_leave_days', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
              }`}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex justify-between items-center mb-6">
            <hr className="border-gray-200 flex-1" />
            <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide text-center px-4">
              RECOMMENDING OFFICER
            </h3>
            <hr className="border-gray-200 flex-1" />
            <div className="relative ml-4">
              <button
                type="button"
                onClick={() => toggleDropdown('recOfficerSelect')}
                disabled={!isEdit}
                className={`text-sm whitespace-nowrap font-medium ${
                  isEdit ? 'text-teal-600 hover:text-teal-700' : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                Add officer
              </button>
              {dropdowns.recOfficerSelect && isEdit && (
                <div className="absolute right-0 mt-1 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  {officersData.map((officer: any, index: number) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => selectOfficer(officer, 'rec')}
                      className="w-full cursor-pointer px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 first:rounded-t-md last:rounded-b-md"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-900">{officer.name}</div>
                          <div className="text-sm text-gray-500">{officer.rank}</div>
                        </div>
                        <div className="text-sm text-gray-500">{officer.serviceNumber}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
                ARMY NO.
              </label>
              <div className="col-span-9">
                <input
                  type="text"
                  placeholder="Army Number"
                  value={formData.recServiceNumber}
                  onChange={(e) => handleInputChange('recServiceNumber', e.target.value)}
                  disabled={!isEdit}
                  className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                    !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
                  }`}
                />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
                NAME
              </label>
              <div className="col-span-9 relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown('recName')}
                  disabled={!isEdit}
                  className={`w-full px-3 py-2.5 border border-gray-300 rounded-md text-left focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 flex justify-between items-center ${
                    !isEdit ? 'bg-gray-50 cursor-not-allowed' : ''
                  }`}
                >
                  <span className={formData.recName ? 'text-gray-900' : 'text-gray-400'}>
                    {formData.recName || 'Name'}
                  </span>
                  {isEdit && (
                    <img src="/chevron-down.svg" alt="" className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {dropdowns.recName && isEdit && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {officersData.map((officer: any, index: number) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => selectOption('recName', officer.name)}
                        className="w-full px-3 py-2 text-left hover:bg-gray-50 text-gray-900 first:rounded-t-md last:rounded-b-md"
                      >
                        <div className="flex justify-between items-center">
                          <span>{officer.name}</span>
                          <span className="text-sm text-gray-500">{officer.serviceNumber}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
                RANK
              </label>
              <div className="col-span-9 relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown('recRank')}
                  disabled={!isEdit}
                  className={`w-full px-3 py-2.5 border border-gray-300 rounded-md text-left focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 flex justify-between items-center ${
                    !isEdit ? 'bg-gray-50 cursor-not-allowed' : ''
                  }`}
                >
                  <span className={formData.recRank ? 'text-gray-900' : 'text-gray-400'}>
                    {formData.recRank || 'Rank'}
                  </span>
                  {isEdit && (
                    <img src="/chevron-down.svg" alt="" className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {dropdowns.recRank && isEdit && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {rankOptions.map((option, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => selectOption('recRank', option)}
                        className="w-full px-3 py-2 text-left hover:bg-gray-50 text-gray-900 first:rounded-t-md last:rounded-b-md"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <hr className="border-gray-200 my-8" />
            <div className="flex justify-center pt-4"></div>
          </div>
        </div>

        {/* Return Date */}
        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
            RETURN DATE
          </label>
          <div className="col-span-9">
            <input
              type="text"
              value={formData.return_date}
              onChange={(e) => handleInputChange('return_date', e.target.value)}
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
              value={formData.remark}
              onChange={(e) => handleInputChange('remark', e.target.value)}
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
            onClick={handleSickReport}
            type="button"
            disabled={!isEdit || isPending || updating}
            className={`font-medium py-3 px-8 rounded-md transition-colors duration-200 ${
              isEdit && !isPending && !updating
                ? 'bg-teal-600 hover:bg-teal-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isPending || updating ? <Loader /> : mockData ? 'Update' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
