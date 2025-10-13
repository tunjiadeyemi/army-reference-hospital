/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from 'react';
import useFormChangeHandler from '../../hooks/dashboardhooks/useLargeFormHandler';
import {
  useCreateEquipmentInventory,
  useGetEquipmentInventorys,
  useUpdateEquipmentInventory
  // useUpdateEquipmentInventory
} from '../../hooks/dashboardhooks/useDasboardData';
import { showError, showSuccess } from '../../utils/toast';
import { AppContext } from '../../context/AppContext';

// Mock data for view mode

interface EquipmentFormProps {
  isEdit?: boolean;
  mockData?: any;
}

export default function AddEquipmentForm({ isEdit = true, mockData }: EquipmentFormProps) {
  const { formData, handleInputChange } = useFormChangeHandler(
    isEdit
      ? {
          eq_name: '',
          function_status: '',
          maintenance_details: '',
          year_of_purchase: '',
          last_service_date: '',
          remark: ''
        }
      : { ...mockData }
  );

  const [isFunctionStatusDropdownOpen, setIsFunctionStatusDropdownOpen] = useState(false);

  const functionStatuses = ['Serviceable', 'Unserviceable'];

  const createMutation = useCreateEquipmentInventory();

  const { showEquipmentModal } = useContext(AppContext);

  const updateMutation = useUpdateEquipmentInventory();
  const { refetch } = useGetEquipmentInventorys();
  const { isPending } = createMutation;
  const { isPending: updatingEq } = updateMutation;


  const handleSave = async () => {
    if (!isEdit) return;

    if (showEquipmentModal) {
      try {
        await updateMutation.mutateAsync({ ...formData });
        showSuccess('Successfully Updated Equipment Inventory');
        await refetch();
      } catch (error) {
        showError('Failed to Updated Equipment Inventory');
      }
      return;
    }
    console.log('Form:', formData);
    try {
      await createMutation.mutateAsync({ ...formData });
      showSuccess('Successfully Added New Equipment Inventory');
      await refetch();
    } catch (error) {
      showError('Failed to update Equipment Inventory');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">ADD NEW EQUIPMENT/MACHINE</h1>
        </div>

        {/* Name of Equipment Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">NAME OF EQUIPMENT</label>
          <div className="lg:col-span-3">
            <input
              type="text"
              placeholder="Equipment name"
              value={formData.eq_name}
              onChange={(e) => handleInputChange('eq_name', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors placeholder-gray-400 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* Function Status Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">FUNCTION STATUS</label>
          <div className="lg:col-span-3 relative">
            <button
              type="button"
              onClick={() =>
                isEdit && setIsFunctionStatusDropdownOpen(!isFunctionStatusDropdownOpen)
              }
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors text-left flex items-center justify-between ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            >
              <span
                className={
                  formData.function_status
                    ? isEdit
                      ? 'text-gray-900'
                      : 'text-gray-600'
                    : 'text-gray-400'
                }
              >
                {formData.function_status}
              </span>
              <img
                src="/chevron-down.svg"
                alt=""
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  isFunctionStatusDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isFunctionStatusDropdownOpen && isEdit && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                {functionStatuses.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => handleInputChange('function_status', status)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none first:rounded-t-lg last:rounded-b-lg ${
                      formData.function_status === status
                        ? 'bg-teal-600 text-white hover:bg-teal-700'
                        : ''
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Year of Purchased or Supplied Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">
            YEAR OF PURCHASED OR
            <br />
            SUPPLIED
          </label>
          <div className="lg:col-span-3">
            <input
              type="date"
              placeholder="YYYY"
              value={formData.year_of_purchase}
              onChange={(e) => handleInputChange('year_of_purchase', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors placeholder-gray-400 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* Date of Last Service/Maintenance Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">
            DATE OF LAST SERVICE/
            <br />
            MAINTENANCE
          </label>
          <div className="lg:col-span-3">
            <input
              type="date"
              placeholder="YYYY-MM-DD"
              value={formData.last_service_date}
              onChange={(e) => handleInputChange('last_service_date', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors placeholder-gray-400 ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* Service/Maintenance Details Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
          <label className="text-gray-700 font-medium text-right pt-3">
            SERVICE/MAINTENANCE
            <br />
            DETAILS
          </label>
          <div className="lg:col-span-3">
            <textarea
              placeholder="Service details"
              value={formData.maintenance_details}
              onChange={(e) => handleInputChange('maintenance_details', e.target.value)}
              rows={4}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors placeholder-gray-400 resize-vertical ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* Remark Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
          <label className="text-gray-700 font-medium text-right pt-3">REMARK</label>
          <div className="lg:col-span-3">
            <textarea
              placeholder="Remark"
              value={formData.remark}
              onChange={(e) => handleInputChange('remark', e.target.value)}
              rows={4}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors placeholder-gray-400 resize-vertical ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center pt-8">
          <button
            onClick={handleSave}
            disabled={!isEdit}
            className={`px-12 py-3 font-medium rounded-lg transition-colors ${
              isEdit
                ? 'bg-teal-600 hover:bg-teal-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {(isPending || updatingEq) ? 'Loading...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
