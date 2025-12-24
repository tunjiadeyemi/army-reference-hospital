/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useGetOfficers } from '../UnitBible/hooks/useUnitBible';
import { showError, showSuccess } from '../../utils/toast';

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
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const signatureRef = useRef<SignatureCanvas>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 500, height: 200 });
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

  // Dynamically set canvas dimensions when modal opens
  useEffect(() => {
    if (showSignaturePad && canvasContainerRef.current) {
      const updateCanvasSize = () => {
        const container = canvasContainerRef.current;
        if (container) {
          const width = container.clientWidth;
          const height = Math.min(200, width * 0.4); // Maintain aspect ratio
          setCanvasDimensions({ width, height });
        }
      };

      // Initial size
      updateCanvasSize();

      // Update on resize
      window.addEventListener('resize', updateCanvasSize);
      return () => window.removeEventListener('resize', updateCanvasSize);
    }
  }, [showSignaturePad]);

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
                {/* Show existing signature URL from server */}
                {formData.signature &&
                  typeof formData.signature === 'string' &&
                  !formData.upload && (
                    <div className="space-y-2">
                      <img
                        src={formData.signature}
                        alt="Signature"
                        className="max-h-24 border border-gray-300 rounded bg-white p-2"
                      />
                      {isEdit && !isLoading && (
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev: any) => ({ ...prev, signature: null }));
                            setShowSignaturePad(true);
                          }}
                          className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                        >
                          Draw Signature
                        </button>
                      )}
                    </div>
                  )}

                {/* Show draw button when no signature exists or has new upload */}
                {(!formData.signature || formData.upload) && (
                  <>
                    <button
                      type="button"
                      onClick={() => setShowSignaturePad(true)}
                      disabled={!isEdit || isLoading}
                      className={`w-full px-3 py-2.5 border border-gray-300 rounded-md font-medium transition-colors ${
                        !isEdit || isLoading
                          ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {formData.upload ? 'Update Signature' : 'Draw Signature'}
                    </button>
                    {formData.upload && (
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p className="text-xs text-green-600">New signature captured</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Signature Pad Modal */}
          {showSignaturePad && (
            <div
              className="fixed inset-0 flex items-center justify-center"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: -50,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 9999
              }}
            >
              <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4">
                {/* Header */}
                <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">Draw Signature</h2>
                  <button
                    onClick={() => setShowSignaturePad(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Canvas */}
                <div className="p-6">
                  <p className="text-sm text-gray-600 mb-4">Sign in the box below</p>
                  <div
                    ref={canvasContainerRef}
                    className="border-2 border-gray-300 rounded bg-white"
                  >
                    <SignatureCanvas
                      ref={signatureRef}
                      canvasProps={{
                        width: canvasDimensions.width,
                        height: canvasDimensions.height,
                        style: {
                          touchAction: 'none',
                          cursor: 'crosshair',
                          display: 'block',
                          width: `${canvasDimensions.width}px`,
                          height: `${canvasDimensions.height}px`
                        }
                      }}
                      backgroundColor="rgb(255, 255, 255)"
                      penColor="rgb(0, 0, 0)"
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      signatureRef.current?.clear();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      if (signatureRef.current?.isEmpty()) {
                        showError('Please draw a signature');
                        return;
                      }

                      try {
                        // Step 1: Get dataURL from canvas
                        const dataUrl = signatureRef.current?.toDataURL('image/png');
                        if (!dataUrl) {
                          showError('Failed to capture signature');
                          return;
                        }

                        // Step 2: Convert dataURL to Blob
                        const response = await fetch(dataUrl);
                        const blob = await response.blob();

                        // Step 3: Convert Blob to File
                        const file = new File([blob], 'signature.png', { type: 'image/png' });

                        // Step 4: Pass File to form handler
                        handleFileChange('upload', file);

                        showSuccess('Signature saved successfully');
                        setShowSignaturePad(false);
                      } catch (error) {
                        console.error('Signature conversion error:', error);
                        showError('Failed to save signature');
                      }
                    }}
                    className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 font-medium"
                  >
                    Save Signature
                  </button>
                </div>
              </div>
            </div>
          )}

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
