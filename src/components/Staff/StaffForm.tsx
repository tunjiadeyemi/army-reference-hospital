/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

// Mock data for view mode

interface StaffFormProps {
  isEdit?: boolean;
  mockData?: any;
}

export default function StaffForm({ isEdit = true, mockData }: StaffFormProps) {
  const [formData, setFormData] = useState({
    armyNumber: isEdit ? '' : mockData?.armyNumber,
    rank: isEdit ? '' : mockData?.rank,
    name: isEdit ? '' : mockData?.name,
    dob: isEdit ? '' : mockData?.dob,
    maritalStatus: isEdit ? 'Single' : mockData?.maritalStatus,
    tradeClass: isEdit ? '' : mockData?.tradeClass,
    doe: isEdit ? '' : mockData?.doe,
    dolp: isEdit ? '' : mockData?.dolp,
    dtos: isEdit ? '' : mockData?.dtos,
    currentDepartment: isEdit ? '' : mockData?.currentDepartment,
    directorate: isEdit ? '' : mockData?.directorate,
    lastThreeUnits: isEdit ? ['', '', ''] : mockData?.lastThreeUnits,
    corps: isEdit ? '' : mockData?.corps,
    phoneNumber: isEdit ? '' : mockData?.phoneNumber,
    remarks: isEdit ? '' : mockData?.remarks
  });

  const handleInputChange = (field: string, value: string) => {
    if (!isEdit) return; // Only allow changes when in edit mode

    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUnitChange = (index: number, value: string) => {
    if (!isEdit) return; // Only allow changes when in edit mode

    const newUnits = [...formData.lastThreeUnits];
    newUnits[index] = value;
    setFormData((prev) => ({
      ...prev,
      lastThreeUnits: newUnits
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Form saved successfully!');
  };

  const ranks = [
    'Private',
    'Lance Corporal',
    'Corporal',
    'Sergeant',
    'Staff Sergeant',
    'Warrant Officer',
    '2nd Lieutenant',
    'Lieutenant',
    'Captain',
    'Major',
    'Lieutenant Colonel',
    'Colonel',
    'Brigadier',
    'Major General',
    'Lieutenant General',
    'General'
  ];

  const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ARMY NUMBER</label>
            <input
              type="text"
              placeholder="Army Number"
              value={formData.armyNumber}
              onChange={(e) => handleInputChange('armyNumber', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">RANK</label>
            <div className="relative">
              <select
                value={formData.rank}
                onChange={(e) => handleInputChange('rank', e.target.value)}
                disabled={!isEdit}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white text-gray-700 ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              >
                <option value="">Rank</option>
                {ranks.map((rank) => (
                  <option key={rank} value={rank}>
                    {rank}
                  </option>
                ))}
              </select>
              <img
                src="/chevron-down.svg"
                alt=""
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">NAME</label>
            <input
              type="text"
              placeholder="Full name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">DOB</label>
            <input
              type="text"
              placeholder="DD/MM/YY"
              value={formData.dob}
              onChange={(e) => handleInputChange('dob', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">MARITAL STATUS</label>
            <div className="relative">
              <select
                value={formData.maritalStatus}
                onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                disabled={!isEdit}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white text-gray-700 ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              >
                {maritalStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <img
                src="/chevron-down.svg"
                alt=""
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">TRADE CLASS</label>
            <input
              type="text"
              placeholder="Trade Class"
              value={formData.tradeClass}
              onChange={(e) => handleInputChange('tradeClass', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">DOE</label>
            <input
              type="text"
              placeholder="DOE"
              value={formData.doe}
              onChange={(e) => handleInputChange('doe', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">DOLP</label>
            <input
              type="text"
              placeholder="Dolp"
              value={formData.dolp}
              onChange={(e) => handleInputChange('dolp', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">DTOS</label>
            <input
              type="text"
              placeholder="DTOS"
              value={formData.dtos}
              onChange={(e) => handleInputChange('dtos', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Department
            </label>
            <input
              type="text"
              placeholder="Current department"
              value={formData.currentDepartment}
              onChange={(e) => handleInputChange('currentDepartment', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">DIRECTORATE</label>
            <input
              type="text"
              placeholder="Directorate"
              value={formData.directorate}
              onChange={(e) => handleInputChange('directorate', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LAST 3 UNITS SERVED
            </label>
            <div className="space-y-2">
              {formData.lastThreeUnits.map((unit: any, index: any) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-gray-600 font-medium">{index + 1}.</span>
                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => handleUnitChange(index, e.target.value)}
                    disabled={!isEdit}
                    className={`flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                      !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 5 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CORPS</label>
            <input
              type="text"
              placeholder="Corps"
              value={formData.corps}
              onChange={(e) => handleInputChange('corps', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">PHONE NUMBER</label>
            <input
              type="tel"
              placeholder="Phone number"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* Remarks */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">REMARK</label>
          <textarea
            placeholder="Remarks"
            rows={4}
            value={formData.remarks}
            onChange={(e) => handleInputChange('remarks', e.target.value)}
            disabled={!isEdit}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400 resize-vertical ${
              !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
            }`}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={!isEdit}
            className={`font-medium py-2 px-8 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
              !isEdit
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-teal-600 hover:bg-teal-700 text-white'
            }`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
