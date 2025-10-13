/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from 'react';
import { useContext } from 'react';
import {
 
  useCreateUnitHoldingArms,

  useGetUnitHoldingArms,
  useUnitHoldingArms,

} from '../../hooks/dashboardhooks/useDasboardData';
import useFormChangeHandler from '../../hooks/useFormChangeHandler';
import { showError, showSuccess } from '../../utils/toast';
import Loader from '../ui/Loader';
import { AppContext } from '../../context/AppContext';

// Mock data for view mode

interface UnitFormProps {
  isEdit?: boolean;
  mockData?: any;
}

export default function UnitHoldingForm({ isEdit = true, mockData }: UnitFormProps) {
  const createMutation = useCreateUnitHoldingArms();
  const { isPending } = createMutation;
  const { refetch } = useGetUnitHoldingArms();

  const { showUnitModal } = useContext(AppContext);

  const [formData, setFormData] = useFormChangeHandler(
    isEdit
      ? {
          ltr_of_req: '',
          auth: '',
          wpn_type: '',
          country_of_origin: '',
          reg_no: '',
          butt_no: '',
          assigned_fmn_unit: '',
          armoury_location: '',
          condition: '',
          date_toc: '',
          status: '',
          purpose_of_issue: '',
          remark: ''
        }
      : { ...mockData }
  );
  const updateMutation = useUnitHoldingArms();
  const { isPending: update } = updateMutation;
  const { showUnitHoldingModal} = useContext(AppContext);
  const handleSave = async () => {
    if (showUnitHoldingModal) {
      try {
        await updateMutation.mutateAsync({ ...formData });
        showSuccess('Successfully Updated Unit Holding Arms');
        await refetch();
      } catch (error) {
        showError('Failed to  Update Unit Holding Arms');
      }
      return;
    }
    console.log('Form:', formData);
    try {
      await createMutation.mutateAsync({ ...formData });
      showSuccess(
        showUnitModal ? 'Successfully Updated Unit Holding Arms' : 'Successfully Created Unit Holding Arms'
      );
      await refetch();
    } catch (error) {
      showError('Failed to  Update Unit Holding Arms');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">ADD NEW AMMUNITION</h1>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 border border-gray-300 rounded ${
              !isEdit
                ? 'text-gray-400 cursor-not-allowed bg-gray-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            disabled={!isEdit}
          >
            PDF
          </button>
          <button
            className={`px-4 py-2 border border-gray-300 rounded ${
              !isEdit
                ? 'text-gray-400 cursor-not-allowed bg-gray-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            disabled={!isEdit}
          >
            Print
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* LTR OF REQ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <label className="text-gray-700 font-medium">LTR OF REQ</label>
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Ltr of req"
              name="ltr_of_req"
              value={formData.ltr_of_req}
              onChange={setFormData}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* AUTH */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <label className="text-gray-700 font-medium">AUTH</label>
          <div className="md:col-span-2">
            <input
              type="text"
              name="auth"
              placeholder="Auth"
              value={formData.auth}
              onChange={setFormData}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* WPN TYPE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <label className="text-gray-700 font-medium">WPN TYPE</label>
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Wpn Type"
              name="wpn_type"
              value={formData.wpn_type}
              onChange={setFormData}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* DESIGNATION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <label className="text-gray-700 font-medium">COUNTRY OF ORIGIN</label>
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Designation"
              name="country_of_origin"
              value={formData.country_of_origin}
              onChange={setFormData}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* AMMO CON NO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <label className="text-gray-700 font-medium">REG_NO</label>
          <div className="md:col-span-2">
            <input
              type="text"
              name="reg_no"
              placeholder="Reg No"
              value={formData.reg_no}
              onChange={setFormData}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* MAGAZINE LOCATION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <label className="text-gray-700 font-medium">BUTT NO</label>
          <div className="md:col-span-2">
            <input
              type="text"
              name="butt_no"
              placeholder="Butt No"
              value={formData.butt_no}
              onChange={setFormData}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* ASSIGNED FMN/UNIT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <label className="text-gray-700 font-medium">ASSIGNED FMN/UNIT</label>
          <div className="md:col-span-2">
            <input
              type="text"
              name="assigned_fmn_unit"
              placeholder="Assigned FMN/UNIT"
              value={formData.assigned_fmn_unit}
              onChange={setFormData}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* QTY SVC */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <label className="text-gray-700 font-medium">ARMOURY LOCATION</label>
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Armoury Location"
              name="armoury_location"
              value={formData.armoury_location}
              onChange={setFormData}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
              min="0"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <label className="text-gray-700 font-medium">CONDITION</label>
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Condition"
              name="condition"
              value={formData.condition}
              onChange={setFormData}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* DATE*/}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <label className="text-gray-700 font-medium">DATE OF TOC</label>
          <div className="md:col-span-2">
            <input
              type="date"
              placeholder="DD/MM/YY"
              name="date_toc"
              value={formData.date_toc}
              onChange={setFormData}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>
        {/* DATE OF TOC*/}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <label className="text-gray-700 font-medium">STATUS</label>
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Status"
              name="status"
              value={formData.status}
              onChange={setFormData}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* QTY EXPENDED*/}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <label className="text-gray-700 font-medium">PURPOSE OF ISSUE</label>
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Purpose of Issue"
              name="purpose_of_issue"
              value={formData.purpose_of_issue}
              onChange={setFormData}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>


      

        {/* REMARK */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <label className="text-gray-700 font-medium pt-3">REMARK</label>
          <div className="md:col-span-2">
            <textarea
              placeholder="Remark"
              name="remark"
              value={formData.remark}
              onChange={setFormData}
              rows={6}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-vertical ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={handleSave}
            disabled={!isEdit}
            className={`px-8 py-3 font-medium rounded-md transition-colors ${
              isEdit
                ? 'bg-teal-500 text-white hover:bg-teal-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {(isPending || update) ? <Loader /> : ' Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
