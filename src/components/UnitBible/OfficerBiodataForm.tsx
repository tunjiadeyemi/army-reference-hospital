/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import type { FormData } from '../../utils/types/unitBible';
import { mockOfficerBioData } from '../../utils/constants';
import StatusHeader from './StatusHeader';

// Mock data for view mode

const OfficerBioDataForm = ({ viewMode }: { viewMode: boolean }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<FormData>(
    viewMode
      ? mockOfficerBioData
      : {
          status: 'active',
          image: '',
          name: '',
          pno: '',
          rank: 'Major',
          corps: '',
          qualification: '',
          dateOfBirth: '',
          directorate: 'FCM',
          dateOfCommission: '',
          sex: 'Male',
          bloodGroup: 'A+',
          genotype: 'AA',
          dateOfCommission2: '',
          dateOfLastPromotion: '',
          dateOfTakingStrength: '',
          religion: 'Christian',
          dateOfPostedIn: '',
          maritalStatus: 'Single',
          phoneNumber: '',
          placeOfBirth: '',
          stateOfOrigin: '',
          lga: '',
          permanentAddress: '',
          emailAddress: '',
          numberOfChildren: '',
          numberOfWives: '',
          nameOfChildren: ['', ''],
          nameOfWives: ['', ''],
          nameOfNextOfKin: '',
          relationshipWithNextOfKin: 'Brother',
          addressOfNextOfKin: '',
          phoneNumberOfNextOfKin: '',
          honourAndAward: '',
          operations: [{ operation: '', date: '', location: '' }],
          lastThreeUnits: { a: '', b: '', c: '' },
          remarks: ''
        }
  );

  useEffect(() => {
    if (viewMode && !editMode) setFormData(mockOfficerBioData);
  }, [viewMode, editMode]);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addChild = () => {
    setFormData((prev) => ({
      ...prev,
      nameOfChildren: [...prev.nameOfChildren, '']
    }));
  };

  const addWife = () => {
    setFormData((prev) => ({
      ...prev,
      nameOfWives: [...prev.nameOfWives, '']
    }));
  };

  const addOperation = () => {
    setFormData((prev) => ({
      ...prev,
      operations: [...prev.operations, { operation: '', date: '', location: '' }]
    }));
  };

  const updateChildName = (index: number, value: string) => {
    const newChildren = [...formData.nameOfChildren];
    newChildren[index] = value;
    setFormData((prev) => ({ ...prev, nameOfChildren: newChildren }));
  };

  const updateWifeName = (index: number, value: string) => {
    const newWives = [...formData.nameOfWives];
    newWives[index] = value;
    setFormData((prev) => ({ ...prev, nameOfWives: newWives }));
  };

  const updateOperation = (index: number, field: string, value: string) => {
    const newOperations = [...formData.operations];
    newOperations[index] = { ...newOperations[index], [field]: value };
    setFormData((prev) => ({ ...prev, operations: newOperations }));
  };

  const handlePDF = () => {
    console.log('PDF clicked');
  };

  const handlePrint = () => {
    console.log('Print clicked');
  };

  const handleEdit = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <section className={`${viewMode ? 'mb-20' : ''}`}>
      {/* Show normal header if not in viewMode, or if in viewMode but editing */}
      {(!viewMode || editMode) && (
        <div className="mb-8 relative p-4">
          <h1 className="text-2xl text-center w-full font-bold uppercase text-gray-800">
            Officer Bio-Data Form
          </h1>
          <div className="flex items-center absolute top-4 right-4">
            <button className="px-2 py-1 text-xs text-gray-600 border  border-[#B1B8B7] rounded-l-sm">
              PDF
            </button>
            <button className="px-2 py-1 text-xs text-gray-600 border border-l-0  border-[#B1B8B7] rounded-r-sm">
              Print
            </button>
          </div>
        </div>
      )}

      {viewMode && !editMode && (
        <StatusHeader
          user={mockOfficerBioData}
          onPDF={handlePDF}
          onPrint={handlePrint}
          onEdit={handleEdit}
        />
      )}

      <div className="max-w-6xl mx-auto p-6 bg-white">
        {/* Header */}

        {/* Photo Upload */}
        <div className="flex justify-center mb-8">
          <div className="w-44 h-44 bg-[#D9D9D9] rounded-full flex items-center justify-center">
            {viewMode ? (
              <img src={formData.image} alt="" className="w-full h-full" />
            ) : (
              <img
                src="/unitBible/camera-icon.svg"
                alt="camera-icon"
                className="w-16 h-16 text-gray-400"
              />
            )}
          </div>
        </div>

        <form className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm   text-gray-700 mb-1">NAME</label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-3 py-2 border  border-[#B1B8B7] rounded-md placeholder:text-sm outline-none"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={viewMode && !editMode}
              />
            </div>
            <div>
              <label className="block text-sm   text-gray-700 mb-1">P/NO / SERVICE NO.</label>
              <input
                type="text"
                placeholder="Service number"
                className="w-full px-3 py-2 border  border-[#B1B8B7] rounded-md placeholder:text-sm outline-none"
                value={formData.pno}
                onChange={(e) => handleInputChange('pno', e.target.value)}
                disabled={viewMode && !editMode}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm   text-gray-700 mb-1">RANK</label>
              <select
                className="w-full px-3 py-2 border  border-[#B1B8B7] rounded-md placeholder:text-sm outline-none"
                value={formData.rank}
                onChange={(e) => handleInputChange('rank', e.target.value)}
                disabled={viewMode && !editMode}
              >
                <option value="Major">Major</option>
                <option value="Captain">Captain</option>
                <option value="Lieutenant">Lieutenant</option>
                <option value="Colonel">Colonel</option>
              </select>
            </div>
            <div>
              <label className="block text-sm   text-gray-700 mb-1">CORPS</label>
              <input
                type="text"
                placeholder="Corps"
                className="w-full px-3 py-2 border  border-[#B1B8B7] placeholder:text-sm rounded-md outline-none"
                value={formData.corps}
                onChange={(e) => handleInputChange('corps', e.target.value)}
                disabled={viewMode && !editMode}
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm   text-gray-700 mb-1">QUALIFICATION/TRADE</label>
              <input
                type="text"
                placeholder="Qualification/trade"
                className="w-full px-3 py-2 border  border-[#B1B8B7] placeholder:text-sm rounded-md outline-none"
                value={formData.qualification}
                onChange={(e) => handleInputChange('qualification', e.target.value)}
                disabled={viewMode && !editMode}
              />
            </div>
            <div>
              <label className="block text-sm   text-gray-700 mb-1">DATE OF BIRTH</label>
              <input
                type="text"
                placeholder="DD/MM/YY"
                className="w-full px-3 py-2 border  border-[#B1B8B7] placeholder:text-sm rounded-md outline-none"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                disabled={viewMode && !editMode}
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm   text-gray-700 mb-1">DIRECTORATE</label>
              <select
                className="w-full px-3 py-2 border  border-[#B1B8B7] rounded-md outline-none"
                value={formData.directorate}
                onChange={(e) => handleInputChange('directorate', e.target.value)}
                disabled={viewMode && !editMode}
              >
                <option value="FCM">FCM</option>
                <option value="FCT">FCT</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm   text-gray-700 mb-1">DATE OF COMMISSION</label>
              <input
                type="text"
                placeholder="DD/MM/YY"
                className="w-full px-3 py-2 border  border-[#B1B8B7] placeholder:text-sm rounded-md outline-none"
                value={formData.dateOfCommission}
                onChange={(e) => handleInputChange('dateOfCommission', e.target.value)}
                disabled={viewMode && !editMode}
              />
            </div>
          </div>

          {/* Row 5 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm   text-gray-700 mb-1">SEX</label>
              <select
                className="w-full px-3 py-2 border  border-[#B1B8B7] rounded-md outline-none"
                value={formData.sex}
                onChange={(e) => handleInputChange('sex', e.target.value)}
                disabled={viewMode && !editMode}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm   text-gray-700 mb-1">BLOOD GROUP</label>
              <select
                className="w-full px-3 py-2 border  border-[#B1B8B7] rounded-md outline-none"
                value={formData.bloodGroup}
                onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                disabled={viewMode && !editMode}
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          {/* Row 6 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm   text-gray-700 mb-1">GENOTYPE</label>
              <select
                className="w-full px-3 py-2 border  border-[#B1B8B7] placeholder:text-sm rounded-md outline-none"
                value={formData.genotype}
                onChange={(e) => handleInputChange('genotype', e.target.value)}
                disabled={viewMode && !editMode}
              >
                <option value="AA">AA</option>
                <option value="AS">AS</option>
                <option value="SS">SS</option>
                <option value="AC">AC</option>
                <option value="SC">SC</option>
              </select>
            </div>
            <div>
              <label className="block text-sm   text-gray-700 mb-1">DATE OF COMMISSION</label>
              <input
                type="text"
                placeholder="DD/MM/YY"
                className="w-full px-3 py-2 border  border-[#B1B8B7] placeholder:text-sm rounded-md outline-none"
                value={formData.dateOfCommission2}
                onChange={(e) => handleInputChange('dateOfCommission2', e.target.value)}
                disabled={viewMode && !editMode}
              />
            </div>
          </div>

          {/* Row 7 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm   text-gray-700 mb-1">DATE OF LAST PROMOTION</label>
              <input
                type="text"
                placeholder="DD/MM/YY"
                className="w-full px-3 py-2 border  border-[#B1B8B7] placeholder:text-sm rounded-md outline-none"
                value={formData.dateOfLastPromotion}
                onChange={(e) => handleInputChange('dateOfLastPromotion', e.target.value)}
                disabled={viewMode && !editMode}
              />
            </div>
            <div>
              <label className="block text-sm   text-gray-700 mb-1">
                DATE OF TAKING ON STRENGTH
              </label>
              <input
                type="text"
                placeholder="DD/MM/YY"
                className="w-full px-3 py-2 border  border-[#B1B8B7] placeholder:text-sm rounded-md outline-none"
                value={formData.dateOfTakingStrength}
                onChange={(e) => handleInputChange('dateOfTakingStrength', e.target.value)}
                disabled={viewMode && !editMode}
              />
            </div>
          </div>

          {/* Row 8 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm   text-gray-700 mb-1">RELIGION</label>
              <select
                className="w-full px-3 py-2 border  border-[#B1B8B7] placeholder:text-sm rounded-md outline-none"
                value={formData.religion}
                onChange={(e) => handleInputChange('religion', e.target.value)}
                disabled={viewMode && !editMode}
              >
                <option value="Christian">Christian</option>
                <option value="Islam">Islam</option>
                <option value="Traditional">Traditional</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm   text-gray-700 mb-1">DATE OF POSTED IN</label>
              <input
                type="text"
                placeholder="DD/MM/YY"
                className="w-full px-3 py-2 border  border-[#B1B8B7] placeholder:text-sm rounded-md outline-none"
                value={formData.dateOfPostedIn}
                onChange={(e) => handleInputChange('dateOfPostedIn', e.target.value)}
                disabled={viewMode && !editMode}
              />
            </div>
          </div>

          {/* Row 9 */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm   text-gray-700 mb-1">MARITAL STATUS</label>
              <select
                className="w-full px-3 py-2 border  border-[#B1B8B7] placeholder:text-sm rounded-md outline-none"
                value={formData.maritalStatus}
                onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                disabled={viewMode && !editMode}
              >
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
          </div>

          {/* Row 10 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm   text-gray-700 mb-1">PHONE NUMBER</label>
              <input
                type="text"
                placeholder="+23480567880"
                className="w-full px-3 py-2 border  border-[#B1B8B7] placeholder:text-sm rounded-md outline-none"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                disabled={viewMode && !editMode}
              />
            </div>
            <div>
              <label className="block text-sm   text-gray-700 mb-1">PLACE OF BIRTH</label>
              <input
                type="text"
                placeholder="Place of birth"
                className="w-full px-3 py-2 border  border-[#B1B8B7] placeholder:text-sm rounded-md outline-none"
                value={formData.placeOfBirth}
                onChange={(e) => handleInputChange('placeOfBirth', e.target.value)}
                disabled={viewMode && !editMode}
              />
            </div>
          </div>

          {/* Row 11 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm   text-gray-700 mb-1">STATE OF ORIGIN</label>
              <input
                type="text"
                placeholder="State of origin"
                className="w-full px-3 py-2 border  border-[#B1B8B7] placeholder:text-sm rounded-md outline-none"
                value={formData.stateOfOrigin}
                onChange={(e) => handleInputChange('stateOfOrigin', e.target.value)}
                disabled={viewMode && !editMode}
              />
            </div>
            <div>
              <label className="block text-sm   text-gray-700 mb-1">LGA</label>
              <input
                type="text"
                placeholder="LGA"
                className="w-full px-3 py-2 border  border-[#B1B8B7] placeholder:text-sm rounded-md outline-none"
                value={formData.lga}
                onChange={(e) => handleInputChange('lga', e.target.value)}
                disabled={viewMode && !editMode}
              />
            </div>
          </div>

          {/* Row 12 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm   text-gray-700 mb-1">PERMANENT HOME ADDRESS</label>
              <input
                type="text"
                placeholder="Permanent home address"
                className="w-full px-3 py-2 border  border-[#B1B8B7] placeholder:text-sm rounded-md outline-none"
                value={formData.permanentAddress}
                onChange={(e) => handleInputChange('permanentAddress', e.target.value)}
                disabled={viewMode && !editMode}
              />
            </div>
            <div>
              <label className="block text-sm   text-gray-700 mb-1">EMAIL ADDRESS</label>
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-3 py-2 border  border-[#B1B8B7] placeholder:text-sm rounded-md outline-none"
                value={formData.emailAddress}
                onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                disabled={viewMode && !editMode}
              />
            </div>
          </div>

          {/* Row 13 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm   text-gray-700 mb-1">NUMBER OF CHILDREN</label>
              <input
                type="text"
                placeholder="0"
                className="w-full px-3 py-2 border  border-[#B1B8B7] placeholder:text-sm rounded-md outline-none"
                value={formData.numberOfChildren}
                onChange={(e) => handleInputChange('numberOfChildren', e.target.value)}
                disabled={viewMode && !editMode}
              />
            </div>
            <div>
              <label className="block text-sm   text-gray-700 mb-1">NUMBER OF WIVES</label>
              <input
                type="text"
                placeholder="0"
                className="w-full px-3 py-2 border  border-[#B1B8B7] placeholder:text-sm rounded-md outline-none"
                value={formData.numberOfWives}
                onChange={(e) => handleInputChange('numberOfWives', e.target.value)}
                disabled={viewMode && !editMode}
              />
            </div>
          </div>

          {/* Children Names */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm   text-gray-700 mb-1">NAME OF CHILDREN</label>
              <div className="space-y-2 border rounded-md border-[#B1B8B7]">
                {formData.nameOfChildren.map((child, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`${index + 1}.`}
                    className="w-full px-3 py-2 rounded-md outline-none"
                    value={child}
                    onChange={(e) => updateChildName(index, e.target.value)}
                    disabled={viewMode && !editMode}
                  />
                ))}
                {(!viewMode || editMode) && (
                  <button
                    type="button"
                    onClick={addChild}
                    className="flex items-center justify-center w-8 h-8 m-2 cursor-pointer rounded-md hover:bg-gray-50"
                  >
                    <img src="/department/add-black-icon.svg" alt="add icon" className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm   text-gray-700 mb-1">NAME OF WIVES</label>
              <div className="space-y-2 border rounded-md border-[#B1B8B7]">
                {formData.nameOfWives.map((wife, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`${index + 1}.`}
                    className="w-full px-3 py-2 outline-none"
                    value={wife}
                    onChange={(e) => updateWifeName(index, e.target.value)}
                    disabled={viewMode && !editMode}
                  />
                ))}
                {(!viewMode || editMode) && (
                  <button
                    type="button"
                    onClick={addWife}
                    className="flex items-center justify-center w-8 h-8 m-2 cursor-pointer rounded-md hover:bg-gray-50"
                  >
                    <img src="/department/add-black-icon.svg" alt="add icon" className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Next of Kin */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm   text-gray-700 mb-1">NAME OF NEXT OF KIN</label>
              <input
                type="text"
                placeholder="Name of next of kin"
                className="w-full px-3 py-2 border  border-[#B1B8B7] placeholder:text-sm rounded-md outline-none"
                value={formData.nameOfNextOfKin}
                onChange={(e) => handleInputChange('nameOfNextOfKin', e.target.value)}
                disabled={viewMode && !editMode}
              />
            </div>
            <div>
              <label className="block text-sm   text-gray-700 mb-1">
                RELATIONSHIP WITH NEXT OF KIN
              </label>
              <select
                className="w-full px-3 py-2 border  border-[#B1B8B7] placeholder:text-sm rounded-md outline-none"
                value={formData.relationshipWithNextOfKin}
                onChange={(e) => handleInputChange('relationshipWithNextOfKin', e.target.value)}
                disabled={viewMode && !editMode}
              >
                <option value="Brother">Brother</option>
                <option value="Sister">Sister</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Spouse">Spouse</option>
                <option value="Son">Son</option>
                <option value="Daughter">Daughter</option>
              </select>
            </div>
          </div>

          {/* Next of Kin Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm   text-gray-700 mb-1">ADDRESS OF NEXT OF KIN</label>
              <textarea
                placeholder="Address of next of kin"
                className="w-full px-3 py-2 border  border-[#B1B8B7] placeholder:text-sm rounded-md outline-none h-20 resize-none"
                value={formData.addressOfNextOfKin}
                onChange={(e) => handleInputChange('addressOfNextOfKin', e.target.value)}
                disabled={viewMode && !editMode}
              />
            </div>
            <div>
              <label className="block text-sm   text-gray-700 mb-1">
                PHONE NUMBER OF NEXT OF KIN
              </label>
              <input
                type="text"
                placeholder="+23480624532"
                className="w-full px-3 py-2 border  border-[#B1B8B7] placeholder:text-sm rounded-md outline-none"
                value={formData.phoneNumberOfNextOfKin}
                onChange={(e) => handleInputChange('phoneNumberOfNextOfKin', e.target.value)}
                disabled={viewMode && !editMode}
              />
            </div>
          </div>

          {/* Honours and Awards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm   text-gray-700 mb-1">HONOUR AND AWARD</label>
              <textarea
                placeholder="Honour and Award"
                className="w-full px-3 py-2 border  border-[#B1B8B7] placeholder:text-sm rounded-md outline-none h-20 resize-none"
                value={formData.honourAndAward}
                onChange={(e) => handleInputChange('honourAndAward', e.target.value)}
                disabled={viewMode && !editMode}
              />
            </div>
            <div>
              <label className="block text-sm   text-gray-700 mb-1">SIGNATURE</label>
              <div className="w-full h-20 border  border-[#B1B8B7] rounded-md flex items-center justify-center text-[#B1B8B7] text-sm">
                Upload signature here
              </div>
            </div>
          </div>

          {/* Operations and Last Three Units */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm   text-gray-700 mb-1">
                OPERATION ATTENDED WITH DATES AND LOCATION
              </label>
              <div className="space-y-3">
                {formData.operations.map((op, index) => (
                  <div key={index} className="border  border-[#B1B8B7] rounded-md p-3 space-y-2">
                    <div className="flex items-center gap-2 text-sm   text-gray-600">
                      {index + 1}.
                    </div>
                    <input
                      type="text"
                      placeholder="Operation"
                      className="w-full px-2 py-1 border border-gray-200 placeholder:text-sm rounded text-sm"
                      value={op.operation}
                      onChange={(e) => updateOperation(index, 'operation', e.target.value)}
                      disabled={viewMode && !editMode}
                    />
                    <div className="flex items-center gap-2">
                      <img
                        src="/unitBible/calendar-icon.svg"
                        alt="calendar icon"
                        className="w-4 h-4 text-gray-400"
                      />
                      <input
                        type="text"
                        placeholder="Date"
                        className="flex-1 px-2 py-1 border border-gray-200 placeholder:text-sm rounded text-sm"
                        value={op.date}
                        onChange={(e) => updateOperation(index, 'date', e.target.value)}
                        disabled={viewMode && !editMode}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src="/unitBible/map-pin.svg"
                        alt="map"
                        className="w-4 h-4 text-gray-400"
                      />
                      <input
                        type="text"
                        placeholder="Location"
                        className="flex-1 px-2 py-1 border border-gray-200 placeholder:text-sm rounded text-sm"
                        value={op.location}
                        onChange={(e) => updateOperation(index, 'location', e.target.value)}
                        disabled={viewMode && !editMode}
                      />
                    </div>
                  </div>
                ))}
                {(!viewMode || editMode) && (
                  <button
                    type="button"
                    onClick={addOperation}
                    className="flex items-center justify-center w-8 h-8 border  border-[#B1B8B7] rounded-md hover:bg-gray-50"
                  >
                    <img src="/department/add-black-icon.svg" alt="add icon" className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm   text-gray-700 mb-1">
                Last Three (3) Unit Served
              </label>
              <div className="border  border-[#B1B8B7] rounded-md p-3 space-y-2">
                <input
                  type="text"
                  placeholder="a."
                  className="w-full px-2 py-1 border border-gray-200 placeholder:text-sm rounded text-sm"
                  value={formData.lastThreeUnits.a}
                  onChange={(e) =>
                    handleInputChange('lastThreeUnits', {
                      ...formData.lastThreeUnits,
                      a: e.target.value
                    })
                  }
                  disabled={viewMode && !editMode}
                />
                <input
                  type="text"
                  placeholder="b."
                  className="w-full px-2 py-1 border border-gray-200 placeholder:text-sm rounded text-sm"
                  value={formData.lastThreeUnits.b}
                  onChange={(e) =>
                    handleInputChange('lastThreeUnits', {
                      ...formData.lastThreeUnits,
                      b: e.target.value
                    })
                  }
                  disabled={viewMode && !editMode}
                />
                <input
                  type="text"
                  placeholder="c."
                  className="w-full px-2 py-1 border border-gray-200 placeholder:text-sm rounded text-sm"
                  value={formData.lastThreeUnits.c}
                  onChange={(e) =>
                    handleInputChange('lastThreeUnits', {
                      ...formData.lastThreeUnits,
                      c: e.target.value
                    })
                  }
                  disabled={viewMode && !editMode}
                />
              </div>
            </div>
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-sm   text-gray-700 mb-1">REMARKS</label>
            <textarea
              placeholder="Remarks"
              className="w-full px-3 py-2 border  border-[#B1B8B7] rounded-md outline-none placeholder:text-sm h-24 resize-none"
              value={formData.remarks}
              onChange={(e) => handleInputChange('remarks', e.target.value)}
              disabled={viewMode && !editMode}
            />
          </div>

          {/* Save Button */}
          {(!viewMode || editMode) && (
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                className="px-8 py-2 text-white rounded-md   hover:opacity-90"
                style={{ backgroundColor: '#67DFCE' }}
              >
                Save
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default OfficerBioDataForm;
