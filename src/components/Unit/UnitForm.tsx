/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from 'react';
import { useCreateOfficer } from '../../hooks/dashboardhooks/useDasboardData';
import useFormChangeHandler from '../../hooks/useFormChangeHandler';

// Mock data for view mode

interface UnitFormProps {
  isEdit?: boolean;
  mockData?: any;
}

export default function UnitForm({ isEdit = true, mockData }: UnitFormProps) {
  const createMutation = useCreateOfficer();


  const [formData, setFormData] = useFormChangeHandler(
    isEdit
      ? {
          ltrOfReq: '',
          auth: '',
          wpnType: '',
          countryOfOrigin: '',
          regNo: '',
          buttNo: '',
          assignedFmnUnit: '',
          armouryLocation: '',
          condition: '',
          dateToc: '',
          status: '',
          purposeOfIssue: '',
          remark: ''
        }
      : { ...mockData }
  );


  const handleSave = () => {
    if (!isEdit) return;
    console.log('Form:', formData);
    createMutation.mutate(formData);
    console.log('Form submitted:', formData);
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
              name="ltrOfReq"
              value={formData.ltrOfReq}
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
              name="wpnType"
              value={formData.wpnType}
              onChange={setFormData}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* COUNTRY OF ORIGIN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <label className="text-gray-700 font-medium">COUNTRY OF ORIGIN</label>
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Country of origin"
              name="countryOfOrigin"
              value={formData.countryOfOrigin}
              onChange={setFormData}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* REG NO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <label className="text-gray-700 font-medium">REG NO</label>
          <div className="md:col-span-2">
            <input
              type="text"
              name="regNo"
              placeholder="Reg no"
              value={formData.regNo}
              onChange={setFormData}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* BUTT NO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <label className="text-gray-700 font-medium">BUTT NO</label>
          <div className="md:col-span-2">
            <input
              type="text"
              name="buttNo"
              placeholder="Butt No"
              value={formData.buttNo}
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
              name="assignedFmnUnit"
              placeholder="Assigned FMN/UNIT"
              value={formData.assignedFmnUnit}
              onChange={setFormData}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* ARMOURY LOCATION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <label className="text-gray-700 font-medium">ARMOURY LOCATION</label>
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Armoury location"
              name="armouryLocation"
              value={formData.armouryLocation}
              onChange={setFormData}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* CONDITION */}
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

        {/* DATE TOC */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <label className="text-gray-700 font-medium">DATE TOC</label>
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="DD/MM/YY"
              name="dateToc"
              value={formData.dateToc}
              onChange={setFormData}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* STATUS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <label className="text-gray-700 font-medium">STATUS</label>
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="status"
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

        {/* PURPOSE OF ISSUE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <label className="text-gray-700 font-medium">PURPOSE OF ISSUE</label>
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Purpose of issue"
              name="purposeOfIssue"
              value={formData.purposeOfIssue}
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
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
