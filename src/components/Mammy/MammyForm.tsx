/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from 'react';

interface MammyFormProps {
  isEdit?: boolean;
  mockData?: any;
}

export default function MammyForm({ isEdit = true, mockData }: MammyFormProps) {
  const [formData, setFormData] = useState(
    isEdit
      ? {
          shopOwner: '',
          rentage: '',
          shopNumber: '',
          natureOfBusiness: '',
          phoneNumber: '',
          allocationDate: '',
          remark: ''
        }
      : {
          ...mockData
        }
  );

  const [uploadedImage, setUploadedImage] = useState<string | null>(
    isEdit ? null : mockData?.uploadedImage
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  interface MammyFormData {
    shopOwner: string;
    rentage: string;
    shopNumber: string;
    natureOfBusiness: string;
    phoneNumber: string;
    allocationDate: string;
    remark: string;
  }

  type MammyFormField = keyof MammyFormData;

  const handleInputChange = (field: MammyFormField, value: string) => {
    if (!isEdit) return; // Only allow changes when in edit mode
    setFormData((prev: MammyFormData) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCameraClick = () => {
    if (!isEdit) return; // Only allow image upload in edit mode
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEdit) return; // Only allow file upload in edit mode
    const file = e.target.files && e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setUploadedImage(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!isEdit) return; // Only allow save in edit mode
    console.log('Form data:', formData);
    console.log('Uploaded image:', uploadedImage);
    // Handle form submission here
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      <div className="space-y-8">
        {/* Camera/Image Upload Section */}
        <div className="flex justify-center mb-8">
          <div className="relative group rounded-full overflow-hidden">
            <div
              onClick={handleCameraClick}
              className={`w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden transition-all duration-300 ${
                isEdit ? 'cursor-pointer hover:bg-gray-300' : 'cursor-not-allowed'
              }`}
            >
              {uploadedImage ? (
                <>
                  <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-cover" />
                  {/* Camera overlay on hover - only show in edit mode */}
                  {isEdit && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <img src="/unitBible/camera-icon.svg" alt="" className="w-8 h-8 text-white" />
                    </div>
                  )}
                  {/* Disabled overlay in view mode */}
                  {/* {!isEdit && (
                    <div className="absolute inset-0 bg-gray-500 bg-opacity-30 flex items-center justify-center">
                      <span className="text-xs text-gray-600 bg-white bg-opacity-80 px-2 py-1 rounded">
                        View Only
                      </span>
                    </div>
                  )} */}
                </>
              ) : (
                <img
                  src="/unitBible/camera-icon.svg"
                  alt=""
                  className={`w-8 h-8 ${isEdit ? 'text-gray-600' : 'text-gray-400'}`}
                />
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={!isEdit}
              className="hidden"
            />
          </div>
        </div>

        {/* Shop Owner Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">SHOP OWNER</label>
          <div className="lg:col-span-3">
            <input
              type="text"
              placeholder="Shop Owner"
              value={formData.shopOwner}
              onChange={(e) => handleInputChange('shopOwner', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
              }`}
            />
          </div>
        </div>

        {/* Rentage Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">RENTAGE (FEE)/MONTH</label>
          <div className="lg:col-span-3">
            <input
              type="text"
              placeholder="₦"
              value={formData.rentage}
              onChange={(e) => handleInputChange('rentage', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
              }`}
            />
          </div>
        </div>

        {/* Shop Number Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">SHOP NUMBER</label>
          <div className="lg:col-span-3">
            <input
              type="text"
              placeholder="Shop Number"
              value={formData.shopNumber}
              onChange={(e) => handleInputChange('shopNumber', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
              }`}
            />
          </div>
        </div>

        {/* Nature of Business Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">NATURE OF BUSINESS</label>
          <div className="lg:col-span-3">
            <input
              type="text"
              placeholder="Nature of Business"
              value={formData.natureOfBusiness}
              onChange={(e) => handleInputChange('natureOfBusiness', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
              }`}
            />
          </div>
        </div>

        {/* Phone Number Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">PHONE NUMBER</label>
          <div className="lg:col-span-3">
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
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
              value={formData.allocationDate}
              onChange={(e) => handleInputChange('allocationDate', e.target.value)}
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
          <label className="text-gray-700 font-medium text-right pt-3">REMARK</label>
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
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
