import { useContext, useState } from 'react';
import Modal from '../Modal';
import { AppContext } from '../../context/AppContext';
import type { AttachedFileData } from '../../utils/types/department';
import {
  useDeptFilesData,
  useUpdateDepartmentFile
} from '../../hooks/dashboardhooks/useDasboardData';
import { showError, showSuccess } from '../../utils/toast';
import type { AxiosError } from 'axios';

const AddRecordModal = () => {
  const { selectedDepartmentRecord, setShowAddRecordModal } = useContext(AppContext);
  console.log('Modal Record', selectedDepartmentRecord);
  const [fileData, setFileData] = useState<AttachedFileData>({
    id: selectedDepartmentRecord?.id,
    file_number: selectedDepartmentRecord?.file_number,
    file_title: selectedDepartmentRecord?.file_title,
    dateCreated: '22/05/2025',
    timeCreated: '1300 : 20sec',
    uploads: selectedDepartmentRecord?.uploads,
    attachments: [
      {
        id: '1',
        name: 'Troops Deployment let...',
        size: '15 MB',
        date: '23/03/2025',
        type: 'pdf'
      },
      {
        id: '2',
        name: 'Troops Deployment let...',
        size: '15 MB',
        date: '23/03/2025',
        type: 'pdf'
      },
      {
        id: '3',
        name: 'Troops Deployment let...',
        size: '15 MB',
        date: '23/03/2025',
        type: 'pdf'
      }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field: keyof AttachedFileData, value: string) => {
    setFileData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };
  const updateMutation = useUpdateDepartmentFile();
  const { refetch } = useDeptFilesData();
  const { isPending } = updateMutation;

  const handleUpdate = async () => {
    setIsEditing(false);
    console.log('Updated file data:', fileData);
    const { timeCreated, dateCreated, attachments, ...cleanedFileData } = fileData;

    try {
      await updateMutation.mutateAsync(cleanedFileData);
      refetch();
      showSuccess('Successfully Updated Department File');
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      const message = error.response?.data?.message || 'An unexpected error occurred';
      showError(message);
    }
  };

  const handleFileDownload = (url: string) => {
    if (!url) return;

    // Create a hidden link element
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop() || 'file'; // default filename
    link.target = '_blank'; // optional — opens in new tab if needed
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const getFileExtension = (url: string): string => {
    if (!url) return '';
    const match = url.match(/\.(pdf|jpg|jpeg|png|svg|webp|gif|docx|xlsx|mp4|mp3)$/i);
    return match ? match[1].toLowerCase() : '';
  };

  const getPDFIcon = () => (
    <div className="w-[40%] h-20 flex flex-col items-center justify-center">
      <img src="/department/pdf-icon.svg" alt="pdf image" className="w-8 h-8 mb-1" />
      <span className="text-xs font-semibold text-white bg-red-500 px-2 py-0.5 rounded">PDF</span>
    </div>
  );

  return (
    <Modal>
      <div className="bg-white w-[85%] h-[90vh] rounded-md shadow-md">
        {/* header */}
        <div className="flex items-center justify-between border-b p-6 border-[#D9D9D9]">
          <div className="flex items-center gap-7">
            <button
              className="hover:scale-95 duration-300 transition-all cursor-pointer"
              type="button"
              onClick={() => setShowAddRecordModal(false)}
            >
              <img src="/department/chevron-left.svg" alt="chevron-left" />
            </button>

            <h1>{selectedDepartmentRecord?.file_number}</h1>
          </div>

          <button
            className="hover:scale-95 duration-300 transition-all cursor-pointer"
            type="button"
            onClick={() => setShowAddRecordModal(false)}
          >
            <img src="/department/x-close-icon.svg" alt="x-close-icon" />
          </button>
        </div>

        {/* body */}
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-sm text-gray-600">
              <span>Date created: {fileData.dateCreated}</span>
              <span className="ml-4">{fileData.timeCreated}</span>
            </div>
            <button
              onClick={handleEdit}
              className={`${
                isEditing
                  ? 'bg-[#22A08E] border-[#22A08E] hover:border-black hover:text-black hover:bg-white transition-colors border text-white'
                  : 'bg-white text-black border hover:text-white hover:bg-[#22A08E] hover:border-[#22A08E] transition-colors'
              } px-4 cursor-pointer text-sm py-2`}
            >
              Edit
            </button>
          </div>

          {/* Form Fields */}
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Cell/File Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                CELL/ FILE NUMBER
              </label>
              <input
                type="text"
                value={fileData.file_number}
                onChange={(e) => handleInputChange('file_number', e.target.value)}
                readOnly={!isEditing}
                className={`w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent ${
                  !isEditing ? 'bg-gray-50' : 'bg-white'
                }`}
              />
            </div>

            {/* File Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">FILE TITLE</label>
              <input
                type="text"
                value={fileData.file_title}
                onChange={(e) => handleInputChange('file_title', e.target.value)}
                readOnly={!isEditing}
                className={`w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent ${
                  !isEditing ? 'bg-gray-50' : 'bg-white'
                }`}
              />
            </div>

            {/* File Attachments */}
            <div className="mt-12">
              <div className="flex justify-center space-x-6">
                {fileData.uploads?.map((attachment, index) => (
                  <div
                    key={index}
                    className="bg-white cursor-pointer border-2 border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors "
                    onClick={() => handleFileDownload(attachment)}
                  >
                    <div className="flex flex-col items-center space-y-3">
                      {/* PDF Icon */}
                      {getPDFIcon()}

                      {/* File Info */}
                      <div className="text-center">
                        {/* <p className="text-sm text-gray-700 font-medium mb-1">{attachment.name}</p> */}
                        <div className="flex justify-between items-center text-xs text-gray-500 space-x-4">
                          {/* <span>{attachment.size}</span> */}
                          <span>
                            {fileData.file_title}
                            {attachment &&
                              getFileExtension(attachment) &&
                              `.${getFileExtension(attachment)}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Update Button */}
            {isEditing && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={handleUpdate}
                  className="px-8 py-3 text-sm bg-[#22A08E] cursor-pointer text-white font-medium rounded-md hover:bg-teal-700 transition-colors focus:outline-none focus:ring-1 focus:ring-teal-500 focus:ring-offset-2"
                >
                  {isPending ? 'Updating...' : 'Update'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddRecordModal;
