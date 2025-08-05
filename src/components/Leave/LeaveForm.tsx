/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

// Mock data for view mode

interface LeaveFormProps {
  isEdit?: boolean;
  mockData?: any;
}

export default function LeaveForm({ isEdit = true, mockData }: LeaveFormProps) {
  // Mock data for officers
  const mockOfficers = [
    {
      rank: 'Colonel',
      name: 'John Smith',
      armyNumber: 'COL001',
      appointment: 'Commanding Officer',
      image: '/mock-image.svg'
    },
    {
      rank: 'Major',
      name: 'Sarah Johnson',
      armyNumber: 'MAJ002',
      appointment: 'Head of Department',
      image: '/mock-image.svg'
    },
    {
      rank: 'Captain',
      name: 'Michael Brown',
      armyNumber: 'CPT003',
      appointment: 'Section Commander',
      image: '/mock-image.svg'
    },
    {
      rank: 'Lieutenant',
      name: 'Emily Davis',
      armyNumber: 'LT004',
      appointment: 'Platoon Leader',
      image: '/mock-image.svg'
    }
  ];

  // Dropdown options
  const rankOptions = [
    'Private',
    'Lance Corporal',
    'Corporal',
    'Sergeant',
    'Staff Sergeant',
    'Warrant Officer',
    'Second Lieutenant',
    'Lieutenant',
    'Captain',
    'Major',
    'Lieutenant Colonel',
    'Colonel',
    'Brigadier',
    'Major General'
  ];

  const remarkOptions = ['Recommended', 'Not Recommended', 'Approved with conditions', 'Deferred'];

  const cmdRemarkOptions = ['Approve', 'Disapprove', 'Approve with modification', 'Pending review'];

  const [formData, setFormData] = useState(
    isEdit
      ? {
          armyNumber: '',
          rank: '',
          name: '',
          destination: '',
          numberOfDays: '',
          from: '',
          to: '',
          reasonForApplication: '',
          signature: '',
          // Recommending Officer
          recRank: '',
          recName: '',
          appointment: '',
          remark: 'Recommended',
          noOfDaysRecommended: '10',
          recSignature: '',
          // Commanding Officer
          cmdRank: '',
          cmdName: '',
          cmdAppointment: '',
          cmdRemark: 'Approve',
          noOfDaysApprove: '5',
          returnDate: '',
          cmdSignature: ''
        }
      : mockData
  );

  const [dropdowns, setDropdowns] = useState({
    rank: false,
    recRank: false,
    recName: false,
    remark: false,
    cmdRank: false,
    cmdName: false,
    cmdRemark: false,
    recOfficerSelect: false,
    cmdOfficerSelect: false
  });

  const toggleDropdown = (field: keyof typeof dropdowns) => {
    if (!isEdit) return;
    setDropdowns((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    if (!isEdit) return;
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const selectOption = (field: string, value: string) => {
    if (!isEdit) return;
    handleInputChange(field, value);
    setDropdowns((prev) => ({
      ...prev,
      [field]: false
    }));
  };

  const selectOfficer = (officer: (typeof mockOfficers)[0], section: 'rec' | 'cmd') => {
    if (!isEdit) return;
    if (section === 'rec') {
      setFormData((prev: any) => ({
        ...prev,
        recRank: officer.rank,
        recName: officer.name,
        appointment: officer.appointment
      }));
      setDropdowns((prev) => ({
        ...prev,
        recOfficerSelect: false
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        cmdRank: officer.rank,
        cmdName: officer.name,
        cmdAppointment: officer.appointment
      }));
      setDropdowns((prev) => ({
        ...prev,
        cmdOfficerSelect: false
      }));
    }
  };

  return (
    <div className="flex-1 max-w-4xl mx-auto p-8 bg-white">
      <div className="space-y-6">
        {/* Basic Information */}
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
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {rankOptions.map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => selectOption('rank', option)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 text-gray-900 first:rounded-t-md last:rounded-b-md"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

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

        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
            DESTINATION
          </label>
          <div className="col-span-9">
            <input
              type="text"
              placeholder="Destination"
              value={formData.destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
            NUMBER OF DAYS
          </label>
          <div className="col-span-9">
            <input
              type="text"
              placeholder="Number of Days"
              value={formData.numberOfDays}
              onChange={(e) => handleInputChange('numberOfDays', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
              }`}
            />
          </div>
        </div>

        {/* Duration Section */}
        <div className="text-center py-4">
          <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">DURATION</h3>
        </div>

        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-2 text-sm font-medium text-gray-700 uppercase tracking-wide">
            FROM
          </label>
          <div className="col-span-4">
            <input
              type="text"
              placeholder="From"
              value={formData.from}
              onChange={(e) => handleInputChange('from', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
              }`}
            />
          </div>
          <label className="col-span-1 text-sm font-medium text-gray-700 uppercase tracking-wide text-center">
            TO
          </label>
          <div className="col-span-5">
            <input
              type="text"
              placeholder="To"
              value={formData.to}
              onChange={(e) => handleInputChange('to', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 items-start">
          <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
            REASON FOR APPLICATION
          </label>
          <div className="col-span-9">
            <textarea
              rows={4}
              placeholder="Remarks"
              value={formData.reasonForApplication}
              onChange={(e) => handleInputChange('reasonForApplication', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-none ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 items-start">
          <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
            SIGNATURE
          </label>
          <div className="col-span-9">
            <div className="w-full h-20 border border-gray-300 rounded-md"></div>
          </div>
        </div>

        {/* Recommending Officer Section */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide text-center flex-1">
              RECOMMENDING OFFICER
            </h3>
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('recOfficerSelect')}
                disabled={!isEdit}
                className={`text-sm font-medium ${
                  isEdit ? 'text-teal-600 hover:text-teal-700' : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                Add officer
              </button>
              {dropdowns.recOfficerSelect && isEdit && (
                <div className="absolute right-0 mt-1 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  {mockOfficers.map((officer, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => selectOfficer(officer, 'rec')}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 first:rounded-t-md last:rounded-b-md"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-900">{officer.name}</div>
                          <div className="text-sm text-gray-500">{officer.rank}</div>
                        </div>
                        <div className="text-sm text-gray-500">{officer.armyNumber}</div>
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
                    {mockOfficers.map((officer, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => selectOption('recName', officer.name)}
                        className="w-full px-3 py-2 text-left hover:bg-gray-50 text-gray-900 first:rounded-t-md last:rounded-b-md"
                      >
                        <div className="flex justify-between items-center">
                          <span>{officer.name}</span>
                          <span className="text-sm text-gray-500">{officer.armyNumber}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
                APPOINTMENT
              </label>
              <div className="col-span-9">
                <input
                  type="text"
                  placeholder="HOD"
                  value={formData.appointment}
                  onChange={(e) => handleInputChange('appointment', e.target.value)}
                  disabled={!isEdit}
                  className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                    !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
                REMARK
              </label>
              <div className="col-span-9 relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown('remark')}
                  disabled={!isEdit}
                  className={`w-full px-3 py-2.5 border border-gray-300 rounded-md text-left focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 flex justify-between items-center ${
                    !isEdit ? 'bg-gray-50 cursor-not-allowed' : ''
                  }`}
                >
                  <span className="text-gray-900">{formData.remark}</span>
                  {isEdit && (
                    <img src="/chevron-down.svg" alt="" className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {dropdowns.remark && isEdit && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {remarkOptions.map((option, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => selectOption('remark', option)}
                        className="w-full px-3 py-2 text-left hover:bg-gray-50 text-gray-900 first:rounded-t-md last:rounded-b-md"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
                NO. OF DAYS RECOMMENDED
              </label>
              <div className="col-span-9">
                <input
                  type="text"
                  value={formData.noOfDaysRecommended}
                  onChange={(e) => handleInputChange('noOfDaysRecommended', e.target.value)}
                  disabled={!isEdit}
                  className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                    !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-start">
              <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
                SIGNATURE
              </label>
              <div className="col-span-9">
                <div className="w-full h-20 border border-gray-300 rounded-md"></div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="button"
                disabled={!isEdit}
                className={`font-medium py-3 px-8 rounded-md transition-colors duration-200 ${
                  isEdit
                    ? 'bg-gray-400 hover:bg-gray-500 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Send to the recommending Officer
              </button>
            </div>
          </div>
        </div>

        {/* Commanding Officer Section */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide text-center flex-1">
              COMMANDING OFFICER
            </h3>
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('cmdOfficerSelect')}
                disabled={!isEdit}
                className={`text-sm font-medium ${
                  isEdit ? 'text-teal-600 hover:text-teal-700' : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                Add officer
              </button>
              {dropdowns.cmdOfficerSelect && isEdit && (
                <div className="absolute right-0 mt-1 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  {mockOfficers.map((officer, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => selectOfficer(officer, 'cmd')}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 first:rounded-t-md last:rounded-b-md"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-900">{officer.name}</div>
                          <div className="text-sm text-gray-500">{officer.rank}</div>
                        </div>
                        <div className="text-sm text-gray-500">{officer.armyNumber}</div>
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
                RANK
              </label>
              <div className="col-span-9 relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown('cmdRank')}
                  disabled={!isEdit}
                  className={`w-full px-3 py-2.5 border border-gray-300 rounded-md text-left focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 flex justify-between items-center ${
                    !isEdit ? 'bg-gray-50 cursor-not-allowed' : ''
                  }`}
                >
                  <span className={formData.cmdRank ? 'text-gray-900' : 'text-gray-400'}>
                    {formData.cmdRank || 'Rank'}
                  </span>
                  {isEdit && (
                    <img src="/chevron-down.svg" alt="" className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {dropdowns.cmdRank && isEdit && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {rankOptions.map((option, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => selectOption('cmdRank', option)}
                        className="w-full px-3 py-2 text-left hover:bg-gray-50 text-gray-900 first:rounded-t-md last:rounded-b-md"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
                NAME
              </label>
              <div className="col-span-9 relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown('cmdName')}
                  disabled={!isEdit}
                  className={`w-full px-3 py-2.5 border border-gray-300 rounded-md text-left focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 flex justify-between items-center ${
                    !isEdit ? 'bg-gray-50 cursor-not-allowed' : ''
                  }`}
                >
                  <span className={formData.cmdName ? 'text-gray-900' : 'text-gray-400'}>
                    {formData.cmdName || 'Name'}
                  </span>
                  {isEdit && (
                    <img src="/chevron-down.svg" alt="" className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {dropdowns.cmdName && isEdit && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {mockOfficers.map((officer, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => selectOption('cmdName', officer.name)}
                        className="w-full px-3 py-2 text-left hover:bg-gray-50 text-gray-900 first:rounded-t-md last:rounded-b-md"
                      >
                        <div className="flex justify-between items-center">
                          <span>{officer.name}</span>
                          <span className="text-sm text-gray-500">{officer.armyNumber}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
                APPOINTMENT
              </label>
              <div className="col-span-9">
                <input
                  type="text"
                  placeholder="HOD"
                  value={formData.cmdAppointment}
                  onChange={(e) => handleInputChange('cmdAppointment', e.target.value)}
                  disabled={!isEdit}
                  className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                    !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
                REMARK
              </label>
              <div className="col-span-9 relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown('cmdRemark')}
                  disabled={!isEdit}
                  className={`w-full px-3 py-2.5 border border-gray-300 rounded-md text-left focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 flex justify-between items-center ${
                    !isEdit ? 'bg-gray-50 cursor-not-allowed' : ''
                  }`}
                >
                  <span className="text-gray-900">{formData.cmdRemark}</span>
                  {isEdit && (
                    <img src="/chevron-down.svg" alt="" className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {dropdowns.cmdRemark && isEdit && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {cmdRemarkOptions.map((option, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => selectOption('cmdRemark', option)}
                        className="w-full px-3 py-2 text-left hover:bg-gray-50 text-gray-900 first:rounded-t-md last:rounded-b-md"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
                NO. OF DAYS APPROVE
              </label>
              <div className="col-span-9">
                <input
                  type="text"
                  value={formData.noOfDaysApprove}
                  onChange={(e) => handleInputChange('noOfDaysApprove', e.target.value)}
                  disabled={!isEdit}
                  className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                    !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
                RETURN DATE
              </label>
              <div className="col-span-9 relative">
                <input
                  type="text"
                  value={formData.returnDate}
                  onChange={(e) => handleInputChange('returnDate', e.target.value)}
                  disabled={!isEdit}
                  className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 pl-10 ${
                    !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                  }`}
                />
                <img
                  src="/unitBible/calendar-icon.svg"
                  alt=""
                  className="h-5 w-5 text-gray-400 absolute left-3 top-3"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-start">
              <label className="col-span-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
                SIGNATURE
              </label>
              <div className="col-span-9">
                <div className="w-full h-20 border border-gray-300 rounded-md"></div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="button"
                disabled={!isEdit}
                className={`font-medium py-3 px-8 rounded-md transition-colors duration-200 ${
                  isEdit
                    ? 'bg-gray-500 hover:bg-gray-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Send to Commanding Officer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
