/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

// Mock data for view mode

interface TrialFormProps {
  isEdit?: boolean;
  mockData?: any;
}

export default function TrialForm({ isEdit = true, mockData }: TrialFormProps) {
  const [formData, setFormData] = useState(
    isEdit
      ? {
          accusedNumber: '',
          rank: '',
          name: '',
          unit: '',
          q1: '',
          q2: '',
          q3: '',
          q4: '',
          q5: '',
          q6: '',
          q7: '',
          finding: '',
          award: '',
          date: '',
          rankOfficer: '',
          appointment: '',
          signature: ''
        }
      : mockData
  );

  const handleInputChange = (field: string, value: string) => {
    if (!isEdit) return;
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div>
      {/* Header */}
      <div className="border-b border-gray-200 p-6 flex justify-between items-center">
        <h1 className="text-lg font-medium text-gray-900">ARMY FORM A19</h1>
        <div className="flex space-x-2">
          <button
            disabled={!isEdit}
            className={`px-3 py-1 border border-gray-300 rounded text-sm ${
              isEdit ? 'text-gray-600 hover:bg-gray-50' : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            PDF
          </button>
          <button
            disabled={!isEdit}
            className={`px-3 py-1 border border-gray-300 rounded text-sm ${
              isEdit ? 'text-gray-600 hover:bg-gray-50' : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            Print
          </button>
        </div>
      </div>

      <div className="p-8">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">TRIAL FORM</h2>
          <h3 className="text-lg font-medium text-gray-700 mb-2 underline">
            FORM FOR TRIAL OFFICERS (SECTIONS 121 - 124, 181 AFA,SCH 1 RPA, 1972
          </h3>
          <p className="text-sm text-gray-600 font-medium">
            RECORD OF PROCEEDINGS BEFORE AN APPROPRIATE SUPERIOR AUTHORITY (S.128 AFA)
          </p>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-12 gap-4 items-center">
            <label className="col-span-3 text-sm font-medium text-gray-700 uppercase">
              ACCUSED'S NUMBER
            </label>
            <div className="col-span-9">
              <input
                type="text"
                placeholder="Accused's number"
                value={formData.accusedNumber}
                onChange={(e) => handleInputChange('accusedNumber', e.target.value)}
                disabled={!isEdit}
                className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 items-center">
            <label className="col-span-3 text-sm font-medium text-gray-700 uppercase">RANK</label>
            <div className="col-span-9">
              <input
                type="text"
                placeholder="Rank"
                value={formData.rank}
                onChange={(e) => handleInputChange('rank', e.target.value)}
                disabled={!isEdit}
                className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 items-center">
            <label className="col-span-3 text-sm font-medium text-gray-700 uppercase">NAME</label>
            <div className="col-span-9">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={!isEdit}
                className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 items-center">
            <label className="col-span-3 text-sm font-medium text-gray-700 uppercase">UNIT</label>
            <div className="col-span-9">
              <input
                type="text"
                placeholder="Unit"
                value={formData.unit}
                onChange={(e) => handleInputChange('unit', e.target.value)}
                disabled={!isEdit}
                className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
                }`}
              />
            </div>
          </div>

          {/* Questions Section */}
          <div className="space-y-6 mt-8">
            {/* Q1 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Q1. HAVE YOU RECEIVED A COPY OF THE CHARGE SHEET AND SUMMARY/ABSTRACT OF EVIDENCE
                NOT LESS THAN 24 HOURS AGO?
              </label>
              <textarea
                rows={3}
                placeholder="answer"
                value={formData.q1}
                onChange={(e) => handleInputChange('q1', e.target.value)}
                disabled={!isEdit}
                className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-none ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
                }`}
              />
              <p className="text-xs text-gray-500 mt-1">(Read the charge (s) here)</p>
            </div>

            {/* Q2 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Q2. HAVE YOU HEARD THE CHARGE AGAINST YOU?
              </label>
              <textarea
                rows={3}
                placeholder="answer"
                value={formData.q2}
                onChange={(e) => handleInputChange('q2', e.target.value)}
                disabled={!isEdit}
                className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-none ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
                }`}
              />
            </div>

            {/* Q3 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Q3. DID YOU UNDERSTAND THE CHARGE?
              </label>
              <textarea
                rows={3}
                placeholder="answer"
                value={formData.q3}
                onChange={(e) => handleInputChange('q3', e.target.value)}
                disabled={!isEdit}
                className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-none ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
                }`}
              />
            </div>

            {/* Q4 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Q4. HAVE YOU AGREED IN WRITING THAT THE WITNESS AGAINST YOU NEED GIVE THEIR EVIDENCE
                IN PERSON?
              </label>
              <textarea
                rows={3}
                placeholder="answer"
                value={formData.q4}
                onChange={(e) => handleInputChange('q4', e.target.value)}
                disabled={!isEdit}
                className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-none ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
                }`}
              />
            </div>

            {/* Q5 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Q5. DO YOU WISH TO GIVE EVIDENCE ON OATH OR TO MAKE OR HAND IN A STATEMENT WITHOUT
                BEING SWORN? YOUR EVIDENCE OR STATEMENT MAY DEAL WITH THE FACT OF THE CASE, WITH
                YOUR STATEMENT AND WITH MATTERS IN MITIGATION OF PUNISHMENT.
              </label>
              <textarea
                rows={3}
                placeholder="answer"
                value={formData.q5}
                onChange={(e) => handleInputChange('q5', e.target.value)}
                disabled={!isEdit}
                className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-none ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
                }`}
              />
            </div>

            {/* Q6 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Q6. DO YOU WISH TO ADDUCE ANY EVIDENCE IN YOUR DEFENCE?
              </label>
              <textarea
                rows={3}
                placeholder="answer"
                value={formData.q6}
                onChange={(e) => handleInputChange('q6', e.target.value)}
                disabled={!isEdit}
                className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-none ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
                }`}
              />
            </div>

            {/* Q7 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Q7. WILL YOU ACCEPT MY AWARD OR DO YOU ELECT TO BE TRIED BY COURT MARTIAL? (
                applicable to WOs and officers S.117 AFA)
              </label>
              <textarea
                rows={3}
                placeholder="answer"
                value={formData.q7}
                onChange={(e) => handleInputChange('q7', e.target.value)}
                disabled={!isEdit}
                className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-none ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
                }`}
              />
            </div>
          </div>

          {/* Final Section */}
          <div className="space-y-6 mt-8">
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-sm font-medium text-gray-700 uppercase">
                FINDING
              </label>
              <div className="col-span-9">
                <input
                  type="text"
                  placeholder="finding"
                  value={formData.finding}
                  onChange={(e) => handleInputChange('finding', e.target.value)}
                  disabled={!isEdit}
                  className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                    !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-sm font-medium text-gray-700 uppercase">
                AWARD
              </label>
              <div className="col-span-9">
                <input
                  type="text"
                  placeholder="award"
                  value={formData.award}
                  onChange={(e) => handleInputChange('award', e.target.value)}
                  disabled={!isEdit}
                  className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                    !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-sm font-medium text-gray-700 uppercase">DATE</label>
              <div className="col-span-9">
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  disabled={!isEdit}
                  className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                    !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-sm font-medium text-gray-700 uppercase">RANK</label>
              <div className="col-span-9">
                <input
                  type="text"
                  placeholder="Enter rank"
                  value={formData.rankOfficer}
                  onChange={(e) => handleInputChange('rankOfficer', e.target.value)}
                  disabled={!isEdit}
                  className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                    !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-sm font-medium text-gray-700 uppercase">
                APPOINTMENT
              </label>
              <div className="col-span-9">
                <input
                  type="text"
                  placeholder="Appointment"
                  value={formData.appointment}
                  onChange={(e) => handleInputChange('appointment', e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                />
              </div>
            </div>

            {/* Signature */}
            <div className="grid grid-cols-12 gap-4 items-start">
              <label className="col-span-3 text-sm font-medium text-gray-700 uppercase">
                SIGNATURE
              </label>
              <div className="col-span-9">
                <div
                  className={`w-full h-32 border border-gray-300 rounded-md relative ${
                    !isEdit ? 'bg-gray-50' : ''
                  }`}
                >
                  <span
                    className={`absolute bottom-2 right-2 text-xs ${
                      !isEdit ? 'text-gray-400' : 'text-gray-400'
                    }`}
                  >
                    {!isEdit ? 'Signature on file' : 'Upload Signature'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center pt-8">
            <button
              disabled={!isEdit}
              className={`font-medium py-3 px-8 rounded-md transition-colors duration-200 ${
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
    </div>
  );
}
