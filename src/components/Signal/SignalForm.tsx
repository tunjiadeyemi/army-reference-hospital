/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

// Mock data for view mode

interface SignalFormProps {
  isEdit?: boolean;
  mockData?: any;
}

export default function SignalForm({ isEdit = true, mockData }: SignalFormProps) {
  const [formData, setFormData] = useState({
    drafterName: isEdit ? '' : mockData?.drafterName,
    from: isEdit ? '' : mockData?.from,
    to: isEdit ? '' : mockData?.to,
    info: isEdit ? '' : mockData?.info,
    precedenceAction: isEdit ? '' : mockData?.precedenceAction,
    branch: isEdit ? '' : mockData?.branch,
    precedenceInfo: isEdit ? '' : mockData?.precedenceInfo,
    telephoneNumber: isEdit ? '' : mockData?.telephoneNumber,
    dateTimeGroupMonth: isEdit ? '' : mockData?.dateTimeGroupMonth,
    digSerialNo: isEdit ? '' : mockData?.digSerialNo,
    nameInBlockLetters: isEdit ? '' : mockData?.nameInBlockLetters,
    messageInstructions: isEdit ? '' : mockData?.messageInstructions,
    releasingOfficerRank: isEdit ? '' : mockData?.releasingOfficerRank,
    securityClassification: isEdit ? '' : mockData?.securityClassification,
    originatorNumber: isEdit ? '' : mockData?.originatorNumber,
    text: isEdit ? '' : mockData?.text,
    internalDistribution: isEdit ? '' : mockData?.internalDistribution,
    fileNumberReference: isEdit ? '' : mockData?.fileNumberReference,
    pageNumber: isEdit ? '1' : mockData?.pageNumber,
    totalPages: isEdit ? '1' : mockData?.totalPages,
    additionalInfo: isEdit ? '' : mockData?.additionalInfo,
    thisMessageAppropriate: isEdit ? false : mockData?.thisMessageAppropriate !== undefined,
    refersToClassified: isEdit ? false : mockData?.refersToClassified !== undefined,
    doesNotReferClassified: isEdit ? false : mockData?.doesNotReferClassified !== undefined,
    commGenSerial: isEdit ? '' : mockData?.commGenSerial,
    seniorReceived: isEdit ? '' : mockData?.seniorReceived,
    system: isEdit ? '' : mockData?.system,
    timeInOut: isEdit ? '' : mockData?.timeInOut
  });

  const handleInputChange = (e: any) => {
    if (!isEdit) return; // Only allow changes when in edit mode

    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('Form saved successfully!');
  };

  const rankOptions = [
    'Rank',
    'General',
    'Lieutenant General',
    'Major General',
    'Brigadier',
    'Colonel',
    'Lieutenant Colonel',
    'Major',
    'Captain',
    'Lieutenant',
    '2nd Lieutenant',
    'Warrant Officer',
    'Staff Sergeant',
    'Sergeant',
    'Corporal',
    'Lance Corporal',
    'Private'
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div></div>
          <div className="flex gap-2">
            <button
              disabled={!isEdit}
              className={`px-4 py-1 text-sm border border-gray-300 rounded ${
                !isEdit ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'
              }`}
            >
              PDF
            </button>
            <button
              disabled={!isEdit}
              className={`px-4 py-1 text-sm border border-gray-300 rounded ${
                !isEdit ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'
              }`}
            >
              Print
            </button>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-6">NA MESSAGE FORM</h1>

        <div className="flex justify-end mb-6">
          <div className="text-right">
            <label className="block text-sm font-medium mb-2">DRAFTER'S NAME IN</label>
            <input
              type="text"
              name="drafterName"
              value={formData.drafterName}
              onChange={handleInputChange}
              placeholder="Drafter's Name in block letters"
              disabled={!isEdit}
              className={`w-64 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* From and To */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">FROM</label>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleInputChange}
              placeholder="from"
              disabled={!isEdit}
              className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">TO</label>
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleInputChange}
              placeholder="to"
              disabled={!isEdit}
              className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">INFO</label>
            <textarea
              name="info"
              value={formData.info}
              onChange={handleInputChange}
              placeholder="info"
              rows={4}
              disabled={!isEdit}
              className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* Precedence and Branch */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">PRECEDENCE - A - ACTION</label>
            <input
              type="text"
              name="precedenceAction"
              value={formData.precedenceAction}
              onChange={handleInputChange}
              placeholder="precedence"
              disabled={!isEdit}
              className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">BRANCH</label>
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              placeholder="branch"
              disabled={!isEdit}
              className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">PRECEDENCE - INFO</label>
            <input
              type="text"
              name="precedenceInfo"
              value={formData.precedenceInfo}
              onChange={handleInputChange}
              placeholder="precedence"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Contact and Timing Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">TELEPHONE NUMBER</label>
            <input
              type="text"
              name="telephoneNumber"
              value={formData.telephoneNumber}
              onChange={handleInputChange}
              placeholder="telephone number"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">DATE TIME GROUP MONTH</label>
            <input
              type="text"
              name="dateTimeGroupMonth"
              value={formData.dateTimeGroupMonth}
              onChange={handleInputChange}
              placeholder="70"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">DIG SERIAL NO (if used)</label>
            <input
              type="text"
              name="digSerialNo"
              value={formData.digSerialNo}
              onChange={handleInputChange}
              placeholder="Dig"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Name and Instructions */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">NAME IN BLOCK LETTERS</label>
            <input
              type="text"
              name="nameInBlockLetters"
              value={formData.nameInBlockLetters}
              onChange={handleInputChange}
              placeholder="name in block letters"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">MESSAGE INSTRUCTIONS</label>
            <textarea
              name="messageInstructions"
              value={formData.messageInstructions}
              onChange={handleInputChange}
              placeholder="message instructions"
              rows={4}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Releasing Officer */}
        <div>
          <label className="block text-sm font-medium mb-2">
            RELEASING OFFICER'S SIGNATURE AND RANK
          </label>
          <div className="space-y-4">
            <div className="flex justify-center">
              <button
                type="button"
                disabled={!isEdit}
                className={`px-4 py-2 rounded transition-colors ${
                  !isEdit
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Insert signature
              </button>
            </div>

            <select
              name="releasingOfficerRank"
              value={formData.releasingOfficerRank}
              onChange={handleInputChange}
              disabled={!isEdit}
              className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            >
              {rankOptions.map((rank) => (
                <option key={rank} value={rank === 'Rank' ? '' : rank}>
                  {rank}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Security Classification */}
        <div>
          <label className="block text-sm font-medium mb-2">
            SECURITY CLASSIFICATION ( Message referring to classified message must be classified
            RESTRICTED of above) RESTRICTED
          </label>
          <input
            type="text"
            name="securityClassification"
            value={formData.securityClassification}
            onChange={handleInputChange}
            placeholder="70"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Originator's Number */}
        <div>
          <label className="block text-sm font-medium mb-2">ORIGINATOR'S NUMBER</label>
          <input
            type="text"
            name="originatorNumber"
            value={formData.originatorNumber}
            onChange={handleInputChange}
            placeholder="01"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Text */}
        <div>
          <label className="block text-sm font-medium mb-2">TEXT</label>
          <textarea
            name="text"
            value={formData.text}
            onChange={handleInputChange}
            placeholder="Write here"
            rows={8}
            disabled={!isEdit}
            className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
            }`}
          />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                INTERNAL DISTRIBUTION AG CMD'S FILE
              </label>
              <textarea
                name="internalDistribution"
                value={formData.internalDistribution}
                onChange={handleInputChange}
                placeholder="Write here"
                rows={3}
                disabled={!isEdit}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="thisMessageAppropriate"
                  checked={formData.thisMessageAppropriate}
                  onChange={handleInputChange}
                  disabled={!isEdit}
                  className={`w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${
                    !isEdit ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                />
                <div>
                  <div className="font-medium">This message (tick as appropriate)</div>
                  <div className="text-sm text-gray-600">Refers to classified message</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="doesNotReferClassified"
                  checked={formData.doesNotReferClassified}
                  onChange={handleInputChange}
                  disabled={!isEdit}
                  className={`w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${
                    !isEdit ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                />
                <div className="text-sm text-gray-600">Does not refer to a classified message</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">COMM./GEN SERIAL</label>
                <input
                  type="text"
                  name="commGenSerial"
                  value={formData.commGenSerial}
                  onChange={handleInputChange}
                  placeholder="Write here"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">SENIOR RECEIVED</label>
                <input
                  type="text"
                  name="seniorReceived"
                  value={formData.seniorReceived}
                  onChange={handleInputChange}
                  placeholder="Write here"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">SYSTEM</label>
                <input
                  type="text"
                  name="system"
                  value={formData.system}
                  onChange={handleInputChange}
                  placeholder="Write here"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">TIME IN/OUT</label>
                <input
                  type="text"
                  name="timeInOut"
                  value={formData.timeInOut}
                  onChange={handleInputChange}
                  placeholder="Write here"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">FILE NUMBER OR REFERENCE</label>
              <textarea
                name="fileNumberReference"
                value={formData.fileNumberReference}
                onChange={handleInputChange}
                placeholder="Write here"
                rows={3}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="border border-gray-300 rounded p-3">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Page................</span>
                <input
                  type="text"
                  name="pageNumber"
                  value={formData.pageNumber}
                  onChange={handleInputChange}
                  className="w-8 text-center border-b border-gray-400 focus:border-blue-500 focus:outline-none"
                />
                <span>...........of................</span>
                <input
                  type="text"
                  name="totalPages"
                  value={formData.totalPages}
                  onChange={handleInputChange}
                  className="w-8 text-center border-b border-gray-400 focus:border-blue-500 focus:outline-none"
                />
                <span>................................page</span>
              </div>

              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                placeholder="Write here"
                rows={3}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <button
            onClick={handleSubmit}
            disabled={!isEdit}
            className={`font-medium py-3 px-8 rounded transition-colors duration-200 ${
              !isEdit
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-teal-600 hover:bg-teal-700 text-white'
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
