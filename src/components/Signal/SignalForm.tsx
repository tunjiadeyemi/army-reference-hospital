/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from 'react';
import { showError } from '../../utils/toast';
import {
  useCreateSignalForm,
  useUpdateSignalForm
} from '../../hooks/dashboardhooks/useDasboardData';

interface SignalFormProps {
  isEdit?: boolean;
  mockData?: any;
  onSuccess?: () => void;
  isLoading?: boolean;
}

export default function SignalForm({
  isEdit = true,
  mockData,
  onSuccess,
  isLoading = false
}: SignalFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const createMutation = useCreateSignalForm();
  const updateMutation = useUpdateSignalForm();

  const [formData, setFormData] = useState({
    drafter_name_in: mockData?.drafter_name_in || '',
    from: mockData?.from || '',
    to: mockData?.to || '',
    info: mockData?.info || '',
    precedence_a_action: mockData?.precedence_a_action || '',
    branch: mockData?.branch || '',
    precedence_info: mockData?.precedence_info || '',
    telephone_number: mockData?.telephone_number || '',
    date_time_group_month: mockData?.date_time_group_month || '',
    dig_serial_no: mockData?.dig_serial_no || '',
    name_in_block_letters: mockData?.name_in_block_letters || '',
    message_instructions: mockData?.message_instructions || '',
    releasing_officer_rank: mockData?.releasing_officer_rank || '',
    security_classification: mockData?.security_classification || '',
    originator_number: mockData?.originator_number || '',
    text: mockData?.text || '',
    internal_distribution: mockData?.internal_distribution || '',
    file_number_or_reference: mockData?.file_number_or_reference || '',
    page_details: mockData?.page_details || '',
    classification_status: mockData?.classification_status || false,
    comm_gen_serial: mockData?.comm_gen_serial || '',
    senior_received: mockData?.senior_received || '',
    system: mockData?.system || '',
    time_in_out: mockData?.time_in_out || '',
    upload: null as File | null
  });

  // Update form when mockData changes
  useEffect(() => {
    if (mockData) {
      setFormData((prev) => ({
        ...prev,
        drafter_name_in: mockData?.drafter_name_in || '',
        from: mockData?.from || '',
        to: mockData?.to || '',
        info: mockData?.info || '',
        precedence_a_action: mockData?.precedence_a_action || '',
        branch: mockData?.branch || '',
        precedence_info: mockData?.precedence_info || '',
        telephone_number: mockData?.telephone_number || '',
        date_time_group_month: mockData?.date_time_group_month || '',
        dig_serial_no: mockData?.dig_serial_no || '',
        name_in_block_letters: mockData?.name_in_block_letters || '',
        message_instructions: mockData?.message_instructions || '',
        releasing_officer_rank: mockData?.releasing_officer_rank || '',
        security_classification: mockData?.security_classification || '',
        originator_number: mockData?.originator_number || '',
        text: mockData?.text || '',
        internal_distribution: mockData?.internal_distribution || '',
        file_number_or_reference: mockData?.file_number_or_reference || '',
        page_details: mockData?.page_details || '',
        classification_status: mockData?.classification_status || false,
        comm_gen_serial: mockData?.comm_gen_serial || '',
        senior_received: mockData?.senior_received || '',
        system: mockData?.system || '',
        time_in_out: mockData?.time_in_out || ''
      }));
    }
  }, [mockData]);

  const handleInsertSignatureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveFile = () => {
    setFormData((prev) => ({
      ...prev,
      upload: null
    }));
  };

  const handleInputChange = (e: any) => {
    if (!isEdit) return;

    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files?.[0] || null : value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!formData.drafter_name_in.trim()) {
      showError('Drafter name is required');
      return;
    }

    try {
      console.log('[SignalForm] Submitting with data:', formData);

      // Use update mutation if ID exists, otherwise create
      const isUpdate = mockData?.id;
      const mutation = isUpdate ? updateMutation : createMutation;

      // Pass ID in payload for update
      const payload = isUpdate ? { ...formData, id: mockData.id } : formData;

      await mutation.mutateAsync(payload);

      console.log('[SignalForm] Success!');
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('[SignalForm] Error:', error);
    }
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
              name="drafter_name_in"
              value={formData.drafter_name_in}
              onChange={handleInputChange}
              placeholder="Drafter's Name in block letters"
              disabled={!isEdit || isLoading}
              className={`w-64 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
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
              disabled={!isEdit || isLoading}
              className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
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
              disabled={!isEdit || isLoading}
              className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
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
              disabled={!isEdit || isLoading}
              className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
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
              name="precedence_a_action"
              value={formData.precedence_a_action}
              onChange={handleInputChange}
              placeholder="precedence"
              disabled={!isEdit || isLoading}
              className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
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
              disabled={!isEdit || isLoading}
              className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">PRECEDENCE - INFO</label>
            <input
              type="text"
              name="precedence_info"
              value={formData.precedence_info}
              onChange={handleInputChange}
              placeholder="precedence"
              disabled={isLoading}
              className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* Contact and Timing Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">TELEPHONE NUMBER</label>
            <input
              type="text"
              name="telephone_number"
              value={formData.telephone_number}
              onChange={handleInputChange}
              placeholder="telephone number"
              disabled={isLoading}
              className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">DATE TIME GROUP MONTH</label>
            <input
              type="text"
              name="date_time_group_month"
              value={formData.date_time_group_month}
              onChange={handleInputChange}
              placeholder="70"
              disabled={isLoading}
              className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">DIG SERIAL NO (if used)</label>
            <input
              type="text"
              name="dig_serial_no"
              value={formData.dig_serial_no}
              onChange={handleInputChange}
              placeholder="Dig"
              disabled={isLoading}
              className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* Name and Instructions */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">NAME IN BLOCK LETTERS</label>
            <input
              type="text"
              name="name_in_block_letters"
              value={formData.name_in_block_letters}
              onChange={handleInputChange}
              placeholder="name in block letters"
              disabled={isLoading}
              className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">MESSAGE INSTRUCTIONS</label>
            <textarea
              name="message_instructions"
              value={formData.message_instructions}
              onChange={handleInputChange}
              placeholder="message instructions"
              rows={4}
              disabled={isLoading}
              className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
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
                onClick={handleInsertSignatureClick}
                disabled={!isEdit || isLoading}
                className={`px-4 py-2 rounded transition-colors ${
                  !isEdit || isLoading
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Insert signature
              </button>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                name="upload"
                onChange={handleInputChange}
                disabled={!isEdit || isLoading}
                className="hidden"
              />
            </div>

            {formData.upload && (
              <div className="border border-gray-300 rounded-lg p-3 flex items-center justify-between">
                <p className="text-sm text-gray-700 font-medium">{formData.upload.name}</p>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  disabled={isLoading}
                  className="text-gray-500 hover:text-red-600 transition-colors"
                  title="Remove file"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}

            <select
              name="releasing_officer_rank"
              value={formData.releasing_officer_rank}
              onChange={handleInputChange}
              disabled={!isEdit || isLoading}
              className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
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
            name="security_classification"
            value={formData.security_classification}
            onChange={handleInputChange}
            placeholder="70"
            disabled={isLoading}
            className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
            }`}
          />
        </div>

        {/* Originator's Number */}
        <div>
          <label className="block text-sm font-medium mb-2">ORIGINATOR'S NUMBER</label>
          <input
            type="text"
            name="originator_number"
            value={formData.originator_number}
            onChange={handleInputChange}
            placeholder="01"
            disabled={isLoading}
            className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
            }`}
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
            disabled={!isEdit || isLoading}
            className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
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
                name="internal_distribution"
                value={formData.internal_distribution}
                onChange={handleInputChange}
                placeholder="Write here"
                rows={3}
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="classification_status"
                  checked={formData.classification_status}
                  onChange={handleInputChange}
                  disabled={!isEdit || isLoading}
                  className={`w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${
                    !isEdit || isLoading ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                />
                <div>
                  <div className="font-medium">This message (tick as appropriate)</div>
                  <div className="text-sm text-gray-600">Refers to classified message</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">COMM./GEN SERIAL</label>
                <input
                  type="text"
                  name="comm_gen_serial"
                  value={formData.comm_gen_serial}
                  onChange={handleInputChange}
                  placeholder="Write here"
                  disabled={isLoading}
                  className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">SENIOR RECEIVED</label>
                <input
                  type="text"
                  name="senior_received"
                  value={formData.senior_received}
                  onChange={handleInputChange}
                  placeholder="Write here"
                  disabled={isLoading}
                  className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                  }`}
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
                  disabled={isLoading}
                  className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">TIME IN/OUT</label>
                <input
                  type="text"
                  name="time_in_out"
                  value={formData.time_in_out}
                  onChange={handleInputChange}
                  placeholder="Write here"
                  disabled={isLoading}
                  className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">FILE NUMBER OR REFERENCE</label>
              <textarea
                name="file_number_or_reference"
                value={formData.file_number_or_reference}
                onChange={handleInputChange}
                placeholder="Write here"
                rows={3}
                disabled={isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div className="border border-gray-300 rounded p-3">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Page................</span>
                <input
                  type="text"
                  name="pageNumber"
                  value={formData.page_details}
                  onChange={handleInputChange}
                  className="w-8 text-center border-b border-gray-400 focus:border-blue-500 focus:outline-none"
                />
                <span>...........of................</span>
                <input
                  type="text"
                  name="totalPages"
                  value={formData.page_details}
                  onChange={handleInputChange}
                  className="w-8 text-center border-b border-gray-400 focus:border-blue-500 focus:outline-none"
                />
                <span>................................page</span>
              </div>

              <textarea
                name="page_details"
                value={formData.page_details}
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
            disabled={!isEdit || isLoading}
            className={`font-medium py-3 px-8 rounded transition-colors duration-200 flex items-center gap-2 ${
              !isEdit || isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-teal-600 hover:bg-teal-700 text-white'
            }`}
          >
            {isLoading && (
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
