/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

// Mock data for view mode

interface VehicleFormProps {
  isEdit?: boolean;
  mockData?: any;
}

export default function VehicleForm({ isEdit = true, mockData }: VehicleFormProps) {
  const [formData, setFormData] = useState(
    isEdit
      ? {
          typeModel: '',
          chassisNumber: '',
          engineNumber: '',
          yearOfMake: '',
          yearIssued: '',
          serviceabilityState: 'Yes',
          howDeployed: 'Ambulance',
          dateOfLastService: '',
          serviceDetails: '',
          remark: ''
        }
      : { ...mockData }
  );

  const [dropdowns, setDropdowns] = useState({
    serviceability: false,
    deployment: false
  });

  const serviceabilityOptions = ['Yes', 'No'];
  const deploymentOptions = [
    'Ambulance',
    'Utility vehicle',
    'Staff Car',
    'Security vehicle',
    'Logistics'
  ];

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    if (!isEdit) return;
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleDropdown = (dropdown: 'serviceability' | 'deployment') => {
    if (!isEdit) return;
    setDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const selectOption = (
    field: keyof typeof formData,
    value: string,
    dropdown: 'serviceability' | 'deployment'
  ) => {
    if (!isEdit) return;
    handleInputChange(field, value);
    setDropdowns((prev) => ({
      ...prev,
      [dropdown]: false
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEdit) return;
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">ADD NEW VEHICLE</h1>
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

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Type/Model */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="text-gray-700 font-medium">TYPE/MODEL</label>
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Type/model"
                value={formData.typeModel}
                onChange={(e) => handleInputChange('typeModel', e.target.value)}
                disabled={!isEdit}
                className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>

          {/* Chassis Number */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="text-gray-700 font-medium">CHASSIS NUMBER</label>
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Chassis number"
                value={formData.chassisNumber}
                onChange={(e) => handleInputChange('chassisNumber', e.target.value)}
                disabled={!isEdit}
                className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>

          {/* Engine Number */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="text-gray-700 font-medium">ENGINE NUMBER</label>
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Engine number"
                value={formData.engineNumber}
                onChange={(e) => handleInputChange('engineNumber', e.target.value)}
                disabled={!isEdit}
                className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>

          {/* Year of Make */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="text-gray-700 font-medium">YEAR OF MAKE</label>
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Year of make"
                value={formData.yearOfMake}
                onChange={(e) => handleInputChange('yearOfMake', e.target.value)}
                disabled={!isEdit}
                className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>

          {/* Year Issued */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="text-gray-700 font-medium">YEAR ISSUED</label>
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Year issued"
                value={formData.yearIssued}
                onChange={(e) => handleInputChange('yearIssued', e.target.value)}
                disabled={!isEdit}
                className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>

          {/* Serviceability State */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="text-gray-700 font-medium">SERVICEABILITY STATE</label>
            <div className="md:col-span-2 relative">
              <button
                type="button"
                onClick={() => toggleDropdown('serviceability')}
                disabled={!isEdit}
                className={`w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              >
                <span className="text-gray-700">{formData.serviceabilityState}</span>
                <img src="/chevron-down.svg" alt="" className="w-5 h-5 text-gray-400" />
              </button>
              {dropdowns.serviceability && isEdit && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  {serviceabilityOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => selectOption('serviceabilityState', option, 'serviceability')}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 ${
                        formData.serviceabilityState === option
                          ? 'bg-teal-500 text-white'
                          : 'text-gray-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* How Deployed */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="text-gray-700 font-medium">HOW DEPLOYED</label>
            <div className="md:col-span-2 relative">
              <button
                type="button"
                onClick={() => toggleDropdown('deployment')}
                disabled={!isEdit}
                className={`w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              >
                <span className="text-gray-700">{formData.howDeployed}</span>
                <img src="/chevron-down.svg" alt="" className="w-5 h-5 text-gray-400" />
              </button>
              {dropdowns.deployment && isEdit && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  {deploymentOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => selectOption('howDeployed', option, 'deployment')}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 ${
                        formData.howDeployed === option ? 'bg-teal-500 text-white' : 'text-gray-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Date of Last Service/Maintenance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="text-gray-700 font-medium">
              DATE OF LAST SERVICE/
              <br />
              MAINTENANCE
            </label>
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="DD/MM/YY"
                value={formData.dateOfLastService}
                onChange={(e) => handleInputChange('dateOfLastService', e.target.value)}
                disabled={!isEdit}
                className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>

          {/* Service/Maintenance Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <label className="text-gray-700 font-medium pt-3">
              SERVICE/
              <br />
              MAINTENANCE
              <br />
              DETAILS
            </label>
            <div className="md:col-span-2">
              <textarea
                placeholder="Service details"
                value={formData.serviceDetails}
                onChange={(e) => handleInputChange('serviceDetails', e.target.value)}
                rows={4}
                disabled={!isEdit}
                className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-vertical ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>

          {/* Remark */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <label className="text-gray-700 font-medium pt-3">REMARK</label>
            <div className="md:col-span-2">
              <textarea
                placeholder="Remark"
                value={formData.remark}
                onChange={(e) => handleInputChange('remark', e.target.value)}
                rows={4}
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
              type="submit"
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
      </form>
    </div>
  );
}
