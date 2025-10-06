import { useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';

import type { FileData } from '../../utils/types/department';

import Layout from '../../components/Layout';

import RecordList from '../../components/DepartmentFile/RecordList';
import DepartmentIcon from '../../assets/navIcons/DepartmentIcon';
// import { useGetDeptFiles } from './hooks/useDeptFile';

const DepartmentFile = () => {
  const [formData, setFormData] = useState<FileData>({
    cellNumber: '',
    fileTitle: '',
    uploadedFile: null
  });
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { active } = useParams<{ active?: string }>();
  const [activeTab, setActiveTab] = useState(active || 'add');
  
  // const {data: deptFiles} = useGetDeptFiles()
  const tabs = [
    {
      title: 'Add New',
      slug: 'add',
      icon:
        activeTab === 'add' ? (
          <img src="/department/add-icon.svg" alt="Add" className="w-5 h-5" />
        ) : (
          <img src="/department/add-black-icon.svg" alt="Add" className="w-5 h-5" />
        )
    },
    {
      title: 'Record File List',
      slug: 'list',
      icon:
        activeTab === 'list' ? <DepartmentIcon color="white" /> : <DepartmentIcon color="gray" />
    }
  ];

  useEffect(() => {
    if (active === 'list') setActiveTab('list');
    else setActiveTab('add');
  }, [active]);

  const handleTabClick = (slug: string) => {
    setActiveTab(slug);
  };

  const handleInputChange = (field: keyof FileData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileSelect = (file: File) => {
    setFormData((prev) => ({
      ...prev,
      uploadedFile: file
    }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (isValidFileType(file)) {
        handleFileSelect(file);
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const isValidFileType = (file: File): boolean => {
    const validTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/bmp',
      'image/tiff'
    ];
    return validTypes.includes(file.type) || file.type.startsWith('image/');
  };

  const handleSave = () => {
    console.log('Form Data:', formData);
    alert('Form saved successfully!');
  };

  return (
    <Layout className="space-y-6 h-full">
      <section className="bg-white border border-[#D9D9D9] rounded-md p-6">
        <h1 className="text-base font-semibold uppercase">Department File</h1>

        <section className="bg-[#F5F5F5] p-2 rounded-md mt-4 flex items-center gap-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              type="button"
              className={`flex items-center gap-2 p-4 text-sm cursor-pointer transition-colors rounded-md ${
                activeTab === tab.slug
                  ? 'bg-[#22A08E] text-white'
                  : 'bg-white text-black hover:text-white hover:bg-[#1A7B6C]'
              }`}
              onClick={() => handleTabClick(tab.slug)}
            >
              {tab.icon}
              {tab.title}
            </button>
          ))}
        </section>

        {activeTab === 'add' ? (
          <div className="max-w-2xl mx-auto p-8 bg-white">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-12">
              44 NARHK- FILE LIST
            </h1>

            <div className="space-y-8">
              {/* Cell/File Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  CELL/ FILE NUMBER
                </label>
                <input
                  type="text"
                  placeholder="E.g G Cell"
                  value={formData.cellNumber}
                  onChange={(e) => handleInputChange('cellNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* File Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">FILE TITLE</label>
                <input
                  type="text"
                  placeholder="Enter file name"
                  value={formData.fileTitle}
                  onChange={(e) => handleInputChange('fileTitle', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* Upload File */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">UPLOAD FILE</label>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    isDragOver ? 'border-teal-400 bg-teal-50' : 'border-gray-300 bg-gray-50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />

                  <div className="space-y-4">
                    <p className="text-lg text-gray-600">
                      {formData.uploadedFile
                        ? formData.uploadedFile.name
                        : 'Drag and Drop file here'}
                    </p>
                    <p className="text-sm text-gray-400">File supported: PDF, Image, Scanner</p>
                    <button
                      type="button"
                      onClick={handleChooseFile}
                      className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors"
                    >
                      Choose file
                    </button>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className="w-full py-4 bg-teal-600 text-white text-lg font-medium rounded-md hover:bg-teal-700 transition-colors focus:outline-none focus:ring-1 focus:ring-teal-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <RecordList />
        )}
      </section>
    </Layout>
  );
};

export default DepartmentFile;
