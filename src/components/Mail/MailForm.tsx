/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useContext } from 'react';
import {
  useCreateMailArchive,
  useGetMailArchives,

  useUpdateMailArchive
} from '../../hooks/dashboardhooks/useDasboardData';
import { showError, showSuccess } from '../../utils/toast';
import { AppContext } from '../../context/AppContext';

interface MailFormProps {
  isEdit?: boolean;
  mockData?: any;
}

export default function MailForm({ isEdit = true, mockData }: MailFormProps) {
  const [uploadedFile, setUploadedFile] = useState<any>(isEdit ? null : mockData?.uploadedFile);
  const [formData, setFormData] = useState<any>(
    isEdit
      ? { 
          id: "",
          to_from: '',
          file_title: '',
          upload: uploadedFile ?? null,
          subject: '',
          ref_no: ' ',
          date_sent: ''
        }
      : { 
          id: mockData?.id,
          to_from: mockData?.to_from,
          subject: mockData?.subject,
          date_sent: mockData?.date_sent,
          ref_no: mockData?.ref_no
        }
  );

  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (field: string, value: string) => {
    if (!isEdit) return;
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (file: File) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const base64Binary = result.split(',')[1] || '';
      const shortBase = base64Binary.slice(0, 100);
      setFormData((prev: any) => ({
        ...prev,
        upload: shortBase // Binary string only
      }));

      setUploadedFile({
        name: file.name,
        size: file.size,
        type: file.type,
        preview: base64Binary.slice(0, 100) // optional short preview
      });
    };

    reader.readAsDataURL(file); // Convert to base64
  };

  const handleDragOver = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: { preventDefault: () => void; dataTransfer: { files: any } }) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const createMutation = useCreateMailArchive();
  const {refetch } = useGetMailArchives()
  const {isPending} = createMutation
  const updateMutation = useUpdateMailArchive();
  const {isPending: updating} = updateMutation

  const { showMailModal } = useContext(AppContext);

  const handleSave = async () => {
    console.log('Form Data:', formData);
 if (showMailModal) {
    try {
    
      const payload = {
        ...formData,
        id: mockData?.id, // inject ID
      };

      console.log('Final Payload:', payload);

      await updateMutation.mutateAsync(payload);
      showSuccess('Successfully Updated Mail Archive');
      await refetch();
    } catch (error) {
      showError('Failed to Update Mail Archive');
    }
    return;
  }

    
    try {
      await createMutation.mutateAsync({ ...formData });
      showSuccess(
        'Successfully Created Mail Archive'
      );
      await refetch();
    } catch (error) {
      showError('Failed to  Create Mail Archive');
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      <div className="space-y-8">
        {/* TO/FROM Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">TO/FROM</label>
          <div className="lg:col-span-3">
            <textarea
              value={formData.to_from}
              onChange={(e) => handleInputChange('to_from', e.target.value)}
              disabled={!isEdit}
              rows={2}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors resize-none ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* title Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">FILE TITLE</label>
          <div className="lg:col-span-3">
            <input
              type="text"
              value={formData.file_title}
              onChange={(e) => handleInputChange('file_title', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>
        {/* SUBJECT Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">SUBJECT</label>
          <div className="lg:col-span-3">
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* DATE SENT/RECEIVED Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">DATE SENT/RECEIVED</label>
          <div className="lg:col-span-3 relative">
            <input
              type="date"
              value={formData.date_sent}
              onChange={(e) => handleInputChange('date_sent', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
            <img
              src="/unitBible/calendar-icon.svg"
              alt="calendar"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            />
          </div>
        </div>

        {/* FILE REF NO. Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">FILE REF NO.</label>
          <div className="lg:col-span-3">
            <input
              type="text"
              value={formData.ref_no}
              onChange={(e) => handleInputChange('ref_no', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* ATTACH FILE Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
          <label className="text-gray-700 font-medium text-right pt-2">
            ATTACH FILE<span className="text-red-500">*</span>
          </label>
          <div className="lg:col-span-3 space-y-4">
            {/* Drag and Drop Area */}
            <div
              onDragOver={isEdit ? handleDragOver : undefined}
              onDragLeave={isEdit ? handleDragLeave : undefined}
              onDrop={isEdit ? handleDrop : undefined}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                !isEdit
                  ? 'border-gray-200 bg-gray-50'
                  : isDragOver
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-300 bg-gray-50'
              }`}
            >
              <div className="space-y-4">
                <p className={`font-medium ${!isEdit ? 'text-gray-400' : 'text-gray-600'}`}>
                  {!isEdit ? 'File upload disabled in view mode' : 'Drag and Drop file here'}
                </p>
                <p className="text-gray-400 text-sm">File supported: PDF, Image, scanner</p>
                <button
                  onClick={isEdit ? handleChooseFile : undefined}
                  disabled={!isEdit}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    !isEdit
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  Choose file
                </button>
              </div>
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png,.gif,.bmp,.tiff,.svg"
            />

            {/* Uploaded File Display */}
            {uploadedFile && (
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src="/department/pdf-icon.svg"
                      alt="pdf"
                      className="w-8 h-8 text-red-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {uploadedFile.name}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-teal-500 h-2 rounded-full w-full"></div>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">Completed</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={isEdit ? handleDeleteFile : undefined}
                      disabled={!isEdit}
                      className={`text-sm font-medium ${
                        !isEdit
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-red-500 hover:text-red-700'
                      }`}
                    >
                      Delete
                    </button>
                    <span className="text-gray-300">|</span>
                    <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                      View
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center pt-8">
          <button
            disabled={!isEdit}
            onClick={handleSave}
            className={`px-12 py-3 font-medium rounded-lg transition-colors ${
              !isEdit
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-teal-600 hover:bg-teal-700 text-white'
            }`}
          >
            {isPending || updating ? "Loading..." : "Save"}
        
          </button>
        </div>
      </div>
    </div>
  );
}
