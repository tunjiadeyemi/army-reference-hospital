/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useGetOfficers } from '../UnitBible/hooks/useUnitBible';
import { showError } from '../../utils/toast';

interface TrialFormProps {
  isEdit?: boolean;
  mockData?: any;
  onSave?: (data: any) => void;
  isLoading?: boolean;
}

export default function TrialForm({
  isEdit = true,
  mockData,
  onSave,
  isLoading = false
}: TrialFormProps) {
  const { data: officers } = useGetOfficers();
  const [openOfficerNames, setOpenOfficerNames] = useState(false);
  const [filteredArmy, setFilteredArmy] = useState([]);
  const emptyFormData = {
    officer_id: '',
    serviceNumber: '',
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
    rank_officer: '',
    appointment: '',
    upload: null as File | Blob | null
  };

  const [formData, setFormData] = useState(mockData || emptyFormData);

  // Update formData when mockData changes - ensure officer_id is always preserved
  useEffect(() => {
    if (mockData) {
      console.log('[Trial Form] Syncing formData from mockData:', mockData);
      setFormData(mockData);
    }
  }, [mockData]);

  const handleInputChange = (field: string, value: string) => {
    if (!isEdit) return;
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (field: string, file: File | Blob | null) => {
    if (!isEdit) return;
    setFormData((prev: any) => ({
      ...prev,
      [field]: file
    }));
  };

  const handleSelectOfficer = (officer: any) => {
    handleInputChange('name', officer.name);
    handleInputChange('serviceNumber', officer.serviceNumber);
    handleInputChange('rank', officer.rank);
    setOpenOfficerNames(false);
    setFormData((prev: any) => ({
      ...prev,
      officer_id: officer.id
    }));
  };

  const handleSetOfficerId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newArmyNumber = e.target.value;
    setOpenOfficerNames(true);
    handleInputChange('serviceNumber', newArmyNumber);

    const filtered = officers?.filter((officer: any) =>
      officer.serviceNumber.toLowerCase().includes(newArmyNumber.toLowerCase())
    );
    setFilteredArmy(filtered || []);

    // Only update officer_id if we find an exact match
    const findId = officers?.find(
      (officer: any) =>
        String(officer.serviceNumber).trim().toLowerCase() ===
        String(newArmyNumber).trim().toLowerCase()
    );

    if (findId) {
      setFormData((prev: any) => ({
        ...prev,
        officer_id: findId.id
      }));
    } else if (newArmyNumber.trim() === '') {
      // Only clear if field is emptied, not on every non-match
      setFormData((prev: any) => ({
        ...prev,
        officer_id: ''
      }));
    }
    // If user types something that doesn't match, keep the existing officer_id
    // They can either select from dropdown or correct their input
  };

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!formData.officer_id && formData.officer_id !== 0) {
        showError('Officer ID is required');
        console.log('[Trial Form] Officer ID validation failed:', formData.officer_id);
        return;
      }
      if (!formData.unit?.trim()) {
        showError('Unit is required');
        return;
      }
      if (!formData.finding?.trim()) {
        showError('Finding is required');
        return;
      }
      if (!formData.award?.trim()) {
        showError('Award is required');
        return;
      }

      console.log('[Trial Form] Submitting form data:', formData);

      if (onSave) {
        await onSave(formData);
      }
    } catch (error) {
      console.error('[Trial Form] Save failed:', error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="border-b border-gray-200 p-6 flex justify-between items-center">
        <h1 className="text-lg font-medium text-gray-900">ARMY FORM A19</h1>
        <div className="flex space-x-2">
          <button
            disabled={!isEdit || isLoading}
            className={`px-3 py-1 border border-gray-300 rounded text-sm ${
              isEdit && !isLoading
                ? 'text-gray-600 hover:bg-gray-50'
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            PDF
          </button>
          <button
            disabled={!isEdit || isLoading}
            className={`px-3 py-1 border border-gray-300 rounded text-sm ${
              isEdit && !isLoading
                ? 'text-gray-600 hover:bg-gray-50'
                : 'text-gray-400 cursor-not-allowed'
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
              OFFICER ID / SERVICE NUMBER
            </label>
            <div className="col-span-9 relative">
              <input
                type="text"
                name="serviceNumber"
                value={formData.serviceNumber}
                onChange={handleSetOfficerId}
                placeholder="Service Number"
                disabled={!isEdit || isLoading}
                className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                  !isEdit || isLoading
                    ? 'bg-gray-50 text-gray-600 cursor-not-allowed'
                    : 'placeholder-gray-400'
                }`}
              />
              {openOfficerNames && formData.serviceNumber !== '' && filteredArmy.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredArmy?.map((officer: any) => (
                    <button
                      key={officer.id}
                      type="button"
                      onClick={() => handleSelectOfficer(officer)}
                      disabled={!isEdit || isLoading}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:opacity-50"
                    >
                      <div className="flex justify-between">
                        <p>{officer.name}</p>
                        <p>{officer.serviceNumber}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
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
                disabled={!isEdit || isLoading}
                className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                  !isEdit || isLoading
                    ? 'bg-gray-50 text-gray-600 cursor-not-allowed'
                    : 'placeholder-gray-400'
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
                disabled={!isEdit || isLoading}
                className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                  !isEdit || isLoading
                    ? 'bg-gray-50 text-gray-600 cursor-not-allowed'
                    : 'placeholder-gray-400'
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
                disabled={!isEdit || isLoading}
                className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                  !isEdit || isLoading
                    ? 'bg-gray-50 text-gray-600 cursor-not-allowed'
                    : 'placeholder-gray-400'
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
                disabled={!isEdit || isLoading}
                className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-none ${
                  !isEdit || isLoading
                    ? 'bg-gray-50 text-gray-600 cursor-not-allowed'
                    : 'placeholder-gray-400'
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
                disabled={!isEdit || isLoading}
                className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-none ${
                  !isEdit || isLoading
                    ? 'bg-gray-50 text-gray-600 cursor-not-allowed'
                    : 'placeholder-gray-400'
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
                disabled={!isEdit || isLoading}
                className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-none ${
                  !isEdit || isLoading
                    ? 'bg-gray-50 text-gray-600 cursor-not-allowed'
                    : 'placeholder-gray-400'
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
                disabled={!isEdit || isLoading}
                className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-none ${
                  !isEdit || isLoading
                    ? 'bg-gray-50 text-gray-600 cursor-not-allowed'
                    : 'placeholder-gray-400'
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
                disabled={!isEdit || isLoading}
                className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-none ${
                  !isEdit || isLoading
                    ? 'bg-gray-50 text-gray-600 cursor-not-allowed'
                    : 'placeholder-gray-400'
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
                disabled={!isEdit || isLoading}
                className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-none ${
                  !isEdit || isLoading
                    ? 'bg-gray-50 text-gray-600 cursor-not-allowed'
                    : 'placeholder-gray-400'
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
                disabled={!isEdit || isLoading}
                className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-none ${
                  !isEdit || isLoading
                    ? 'bg-gray-50 text-gray-600 cursor-not-allowed'
                    : 'placeholder-gray-400'
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
                  disabled={!isEdit || isLoading}
                  className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                    !isEdit || isLoading
                      ? 'bg-gray-50 text-gray-600 cursor-not-allowed'
                      : 'placeholder-gray-400'
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
                  disabled={!isEdit || isLoading}
                  className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                    !isEdit || isLoading
                      ? 'bg-gray-50 text-gray-600 cursor-not-allowed'
                      : 'placeholder-gray-400'
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
                  disabled={!isEdit || isLoading}
                  className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                    !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
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
                  value={formData.rank_officer}
                  onChange={(e) => handleInputChange('rank_officer', e.target.value)}
                  disabled={!isEdit || isLoading}
                  className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                    !isEdit || isLoading
                      ? 'bg-gray-50 text-gray-600 cursor-not-allowed'
                      : 'placeholder-gray-400'
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
                  disabled={!isEdit || isLoading}
                  className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                    !isEdit || isLoading
                      ? 'bg-gray-50 text-gray-600 cursor-not-allowed'
                      : 'placeholder-gray-400'
                  }`}
                />
              </div>
            </div>

            {/* File Upload */}
            <div className="grid grid-cols-12 gap-4 items-start">
              <label className="col-span-3 text-sm font-medium text-gray-700 uppercase">
               Signature
              </label>
              <div className="col-span-9 space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange('upload', e.target.files?.[0] || null)}
                  disabled={!isEdit || isLoading}
                  className={`w-full px-3 py-2.5 border border-gray-300 rounded-md ${
                    !isEdit || isLoading
                      ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700'
                  }`}
                />
                {formData.upload && (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs text-green-600">File selected</p>
                  </div>
                )}
              </div>
            </div>
          </div>



          {/* Save Button */}
          <div className="flex justify-center pt-8">
            <button
              onClick={handleSave}
              disabled={!isEdit || isLoading}
              className={`font-medium py-3 px-8 rounded-md transition-colors duration-200 ${
                !isEdit || isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
              }`}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
