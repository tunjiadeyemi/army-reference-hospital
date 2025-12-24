/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useContext } from 'react';
import {
  useCreateMammyMarkets,
  useGetMammyMarkets,
  useUpdateMammyMarkets
} from '../../hooks/dashboardhooks/useDasboardData';
import { showError, showSuccess } from '../../utils/toast';
import { AppContext } from '../../context/AppContext';

interface MammyFormProps {
  isEdit?: boolean;
  mockData?: any;
}

export default function MammyForm({ isEdit = true, mockData }: MammyFormProps) {
  const { showMammyModal } = useContext(AppContext);
  const [formData, setFormData] = useState(
    isEdit
      ? {
          id: '',
          shop_owner: '',
          rentage_fee: '',
          shop_no: '',
          business_nature: '',
          phone_number: '',
          allocation_date: '',
          upload: '',
          profile_pic: ''
        }
      : {
          ...mockData
        }
  );

  const [uploadedImage, setUploadedImage] = useState<string | null>(
    isEdit ? '/unitBible/camera-icon.svg' : '/unitBible/camera-icon.svg'
  );

  const createMutation = useCreateMammyMarkets();
  const { isPending } = createMutation;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  interface MammyFormData {
    shop_owner: string;
    rentage_fee: string;
    shop_no: string;
    business_nature: string;
    phone_number: string;
    allocation_date: string;
    upload: string;
    profile_pic?: string;
    // remark: string;
  }

  type MammyFormField = keyof MammyFormData;

  const handleInputChange = (field: MammyFormField, value: string) => {
    if (!isEdit) return; // Only allow changes when in edit mode
    setFormData((prev: MammyFormData) => ({
      ...prev,
      [field]: value
    }));
  };
  const [, setShowImage] = useState(false);
  const handleCameraClick = () => {
    setShowImage(true);
    if (!isEdit) return; // Only allow image upload in edit mode
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEdit) return;
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const result = event.target?.result;
        if (result instanceof ArrayBuffer) {
          setFormData((prev: MammyFormData) => ({
            ...prev,
            upload: file
          }));
          const imageUrl = URL.createObjectURL(file);
          setUploadedImage(imageUrl);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const { refetch } = useGetMammyMarkets();
  const updateMutation = useUpdateMammyMarkets();

  const {isPending: updating} = updateMutation
  const handleSave = async () => {
    if (!isEdit) return;
    console.log('Image Created:', formData);
    if (showMammyModal) {
      try {
        await updateMutation.mutateAsync(formData);
        showSuccess('Successfully Added Updated Markets');
        await refetch();
      } catch (err) {
        showError('Error Occured adding market');
      }
      return;
    }

    try {
      await createMutation.mutateAsync(formData);
      await refetch();
      showSuccess('Successfully Added Market');
    } catch (err) {
      showError('Failed to Add Market');
      console.log('Ther');
    }

    console.log('Uploaded image:', uploadedImage);
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
              {showMammyModal ? (
                <>
                  {uploadedImage !== null && uploadedImage !== '/unitBible/camera-icon.svg' ? (
                    <img src={uploadedImage.trim()} />
                  ) : formData.profile_pic === null ? (
                    <img src="/unitBible/camera-icon.svg" />
                  ) : (
                    <img src={formData.profile_pic} />
                  )}
                </>
              ) : (
                <>
                  {uploadedImage === '' ? (
                    <img src="/unitBible/camera-icon.svg" />
                  ) : (
                    <img src={uploadedImage ?? ''} />
                  )}
                </>
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
              value={formData.shop_owner}
              onChange={(e) => handleInputChange('shop_owner', e.target.value)}
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
              value={formData.rentage_fee}
              onChange={(e) => handleInputChange('rentage_fee', e.target.value)}
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
              value={formData.shop_no}
              onChange={(e) => handleInputChange('shop_no', e.target.value)}
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
              value={formData.business_nature}
              onChange={(e) => handleInputChange('business_nature', e.target.value)}
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
              value={formData.phone_number}
              onChange={(e) => handleInputChange('phone_number', e.target.value)}
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
        </div> */}

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
            {
              isPending || updating ? "Loading..." : "Save"
            }
            
          </button>
        </div>
      </div>
    </div>
  );
}
