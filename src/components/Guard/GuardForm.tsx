/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

interface GuardFormProps {
  isEdit?: boolean;
  mockData?: any;
}

export default function GuardForm({ isEdit = true, mockData }: GuardFormProps) {
  const [formData, setFormData] = useState({
    armyNumber: isEdit ? '' : mockData?.armyNumber,
    rank: isEdit ? '' : mockData?.rank,
    name: isEdit ? '' : mockData?.name,
    offence: isEdit ? '' : mockData?.offence,
    dateDetained: isEdit ? '' : mockData?.dateDetained,
    detainedBy: isEdit ? '' : mockData?.detainedBy,
    releasedBy: isEdit ? '' : mockData?.releasedBy,
    remark: isEdit ? '' : mockData?.remark
  });

  const handleInputChange = (e: any) => {
    if (!isEdit) return; // Only allow changes when in edit mode

    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Form Data:', formData);
    alert('Form saved successfully!');
  };

  const rankOptions = [
    'Rank',
    'General',
    'Lieutenant General',
    'Major General',
    'Brigadier',
    'Colonel',
    'Lieutenant Colonel',
    'Major',
    'Captain',
    'Lieutenant',
    '2nd Lieutenant',
    'Warrant Officer',
    'Staff Sergeant',
    'Sergeant',
    'Corporal',
    'Lance Corporal',
    'Private'
  ];

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="space-y-6">
          {/* Army Number */}
          <div className="flex items-center">
            <label className="block text-sm font-medium text-gray-700 w-48 flex-shrink-0">
              ARMY NUMBER
            </label>
            <input
              type="text"
              name="armyNumber"
              value={formData.armyNumber}
              onChange={handleInputChange}
              placeholder="Army Number"
              disabled={!isEdit}
              className={`flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>

          {/* Rank */}
          <div className="flex items-center">
            <label className="block text-sm font-medium text-gray-700 w-48 flex-shrink-0">
              RANK
            </label>
            <div className="flex-1 relative">
              <select
                name="rank"
                value={formData.rank}
                onChange={handleInputChange}
                disabled={!isEdit}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              >
                {rankOptions.map((rank) => (
                  <option key={rank} value={rank === 'Rank' ? '' : rank}>
                    {rank}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="flex items-center">
            <label className="block text-sm font-medium text-gray-700 w-48 flex-shrink-0">
              NAME
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              disabled={!isEdit}
              className={`flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>

          {/* Offence */}
          <div className="flex items-center">
            <label className="block text-sm font-medium text-gray-700 w-48 flex-shrink-0">
              OFFENCE
            </label>
            <input
              type="text"
              name="offence"
              value={formData.offence}
              onChange={handleInputChange}
              placeholder="Offence"
              disabled={!isEdit}
              className={`flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>

          {/* Date Detained */}
          <div className="flex items-center">
            <label className="block text-sm font-medium text-gray-700 w-48 flex-shrink-0">
              DATE DETAINED
            </label>
            <div className="flex-1 relative">
              <input
                type="date"
                name="dateDetained"
                value={formData.dateDetained}
                onChange={handleInputChange}
                disabled={!isEdit}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
              {/* <img
                src="/unitBible/calendar-icon.svg"
                alt=""
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
              /> */}
            </div>
          </div>

          {/* Detained By */}
          <div className="flex items-center">
            <label className="block text-sm font-medium text-gray-700 w-48 flex-shrink-0">
              DETAINED BY
            </label>
            <input
              type="text"
              name="detainedBy"
              value={formData.detainedBy}
              onChange={handleInputChange}
              placeholder="Detain by"
              disabled={!isEdit}
              className={`flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>

          {/* Released By */}
          <div className="flex items-center">
            <label className="block text-sm font-medium text-gray-700 w-48 flex-shrink-0">
              RELEASED BY
            </label>
            <input
              type="text"
              name="releasedBy"
              value={formData.releasedBy}
              onChange={handleInputChange}
              placeholder="Release by"
              disabled={!isEdit}
              className={`flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>

          {/* Remark */}
          <div className="flex items-start">
            <label className="block text-sm font-medium text-gray-700 w-48 flex-shrink-0 pt-3">
              REMARK
            </label>
            <textarea
              name="remark"
              value={formData.remark}
              onChange={handleInputChange}
              placeholder="Remark"
              rows={4}
              disabled={!isEdit}
              className={`flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-center pt-8">
            <button
              onClick={handleSave}
              disabled={!isEdit}
              className={`font-medium py-3 px-12 rounded-lg transition-colors duration-200 shadow-sm ${
                !isEdit
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
              }`}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
