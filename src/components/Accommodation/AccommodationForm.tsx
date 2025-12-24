/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useGetOfficers } from '../UnitBible/hooks/useUnitBible';
import {
  useCreateAccomodation,
  useGetAccomodations
} from '../../hooks/dashboardhooks/useDasboardData';

import { showSuccess } from '../../utils/toast';

interface AccommodationFormProps {
  isEdit?: boolean;
  mockData?: any;
}

export default function ArmyAllocationForm({ isEdit = true, mockData }: AccommodationFormProps) {
  const [formData, setFormData] = useState(
    isEdit
      ? {
          officer_id: null,
          serviceNumber: '',
          // rank: '',
          name: '',
          block_no: '',
          room_no: '',
          unit: '',
          allocation_date: ''
          // remark: ''
        }
      : {
          ...mockData
        }
  );

  const [isRankDropdownOpen, setIsRankDropdownOpen] = useState(false);

  const ranks = [
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
    'Brigadier General',
    'Major General',
    'Lieutenant General',
    'General'
  ];

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    if (!isEdit) return; // Only allow changes when in edit mode
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRankSelect = (rank: any) => {
    if (!isEdit) return; // Only allow changes when in edit mode
    handleInputChange('rank', rank);
    setIsRankDropdownOpen(false);
  };
  
  const [openOfficerNames, setOpenOfficerNames] = useState(false);
  const handleSelectOfficer = (officer: any) => {
    handleInputChange('name', officer.name);
    handleInputChange('serviceNumber', officer.serviceNumber);
    handleInputChange('rank', officer.rank);
    const newArmyNumber = officer.serviceNumber;

    const findId = officers.find(
      (officer: any) =>
        String(officer.serviceNumber).trim().toLowerCase() ===
        String(newArmyNumber).trim().toLowerCase()
    );
    setOpenOfficerNames(false);
    if (findId) {
      setFormData((prev: any) => ({
        ...prev,
        officer_id: findId.id
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        officer_id: null
      }));
    }
  };
  const toggleRankDropdown = () => {
    if (!isEdit) return; // Only allow dropdown to open in edit mode
    setIsRankDropdownOpen(!isRankDropdownOpen);
  };
  const { data: officers } = useGetOfficers();
  const [filteredArmy, setFilteredArmy] = useState([]);
  const [, setOfficerID] = useState({});
  const handleSetOfficerId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newArmyNumber = e.target.value;
    console.log('ARMY NO.:', newArmyNumber);

    setOpenOfficerNames(true);
    handleInputChange('serviceNumber', newArmyNumber);

    const filtered = officers.filter((officer: any) =>
      officer.serviceNumber.toLowerCase().includes(newArmyNumber.toLowerCase())
    );
    setFilteredArmy(filtered);
    const findId = officers.find(
      (officer: any) =>
        String(officer.serviceNumber).trim().toLowerCase() ===
        String(newArmyNumber).trim().toLowerCase()
    );
    setOfficerID(findId);

    if (findId) {
      setFormData((prev: any) => ({
        ...prev,
        officer_id: findId.id
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        officer_id: null
      }));
    }

    console.log('Filtered officers:', filtered, findId);
  };

  const createMutation = useCreateAccomodation();
  const { refetch } = useGetAccomodations();
  const { isPending } = createMutation;
  const handleSubmit = async () => {
    try {
      await createMutation.mutateAsync({ ...formData });
      showSuccess('New Accomodation Allocated!');
      await refetch();
    } catch (err) {
      console.log(err);
    }
    console.log('Form Data: ', formData);
  };
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      <div className="space-y-8">
        {/* Army Number Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">ARMY NUMBER</label>
          <div className="lg:col-span-3 relative">
            <input
              type="text"
              placeholder="Army Number"
              value={formData.serviceNumber}
              onChange={handleSetOfficerId}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
              }`}
            />
            {openOfficerNames && formData.serviceNumber !== '' && filteredArmy.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {filteredArmy?.map((officer: any) => (
                  <button
                    key={officer.id}
                    type="button"
                    onClick={() => handleSelectOfficer(officer)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                  >
                    <div className="flex justify-between">
                      <p>{officer.name}</p>
                      <p>{officer.serviceNumber}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Rank Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">RANK</label>
          <div className="lg:col-span-3 relative">
            <button
              type="button"
              onClick={toggleRankDropdown}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors text-left flex items-center justify-between ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            >
              <span
                className={
                  formData.rank ? (isEdit ? 'text-gray-900' : 'text-gray-600') : 'text-gray-400'
                }
              >
                {formData.rank || 'Rank'}
              </span>
              {isEdit && (
                <img
                  src="/chevron-down.svg"
                  alt="chevron down"
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    isRankDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              )}
            </button>

            {isRankDropdownOpen && isEdit && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {ranks.map((rank) => (
                  <button
                    key={rank}
                    type="button"
                    onClick={() => handleRankSelect(rank)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                  >
                    {rank}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Name Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">NAME</label>
          <div className="lg:col-span-3">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
              }`}
            />
          </div>
        </div>

        {/* Block No Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">BLOCK NO</label>
          <div className="lg:col-span-3">
            <input
              type="text"
              placeholder="block"
              value={formData.block_no}
              onChange={(e) => handleInputChange('block_no', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
              }`}
            />
          </div>
        </div>

        {/* Room No Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">ROOM NO.</label>
          <div className="lg:col-span-3">
            <input
              type="text"
              placeholder="Room No"
              value={formData.room_no}
              onChange={(e) => handleInputChange('room_no', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
              }`}
            />
          </div>
        </div>

        {/* Unit Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">UNIT</label>
          <div className="lg:col-span-3">
            <input
              type="text"
              placeholder="unit"
              value={formData.unit}
              onChange={(e) => handleInputChange('unit', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
              }`}
            />
          </div>
        </div>

        {/* Allocation Date Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">ALLOCATION DATE</label>
          <div className="lg:col-span-3 relative">
            <input
              type="date"
              value={formData.allocation_date}
              onChange={(e) => handleInputChange('allocation_date', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
            <img
              src="/unitBible/calendar-icon.svg"
              alt=""
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none"
            />
          </div>
        </div>

        {/* Remark Field */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
          <label className="text-gray-700 font-medium text-right pt-3">Remark</label>
          <div className="lg:col-span-3">
            <textarea
              placeholder="Remark"
              value={formData.remark}
              onChange={(e) => handleInputChange('remark', e.target.value)}
              rows={4}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors resize-vertical ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
              }`}
            />
          </div>
        </div> */}

        {/* Save Button */}
        <div className="flex justify-center pt-8">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!isEdit}
            className={`px-12 py-3 font-medium rounded-lg transition-colors ${
              isEdit
                ? 'bg-teal-600 hover:bg-teal-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isPending ? 'Loading...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
