/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useGetOfficers } from '../UnitBible/hooks/useUnitBible';
import { showError } from '../../utils/toast';
import {
  useCreateChargeSheet,
  useUpdateChargeSheet
} from '../../hooks/dashboardhooks/useDasboardData';

interface DisciplineFormProps {
  isEdit?: boolean;
  mockData?: any;
  onSave?: (data: any) => void;
  isLoading?: boolean;
}

const emptyFormData = {
  // Accused Officer
  accused_officer_id: '',
  accused_officer_number: '',
  accused_officer_unit: '',
  // Statement
  statement_of_offence: '',
  punishable_under_section: '',
  particulars_of_offence: '',
  // Reporting Officer
  reporting_officer_id: '',
  reporting_officer_number: '',
  reporting_officer_unit: '',
  // Witnessing Officer
  witnessing_officer_id: '',
  witnessing_officer_number: '',
  witnessing_officer_unit: '',
  // Tried By Officer
  tried_by_officer_id: '',
  tried_by_officer_number: '',
  tried_by_officer_unit: '',
  // Commander Section
  commander_officer_id: '',
  commander_officer_number: '',
  commander_findings: '',
  commander_award: '',
  commander_recommendations: '',
  commander_date: '',
  commander_signature: '',
  // Battalion Commander Section
  bn_commander_officer_id: '',
  bn_commander_officer_number: '',
  bn_commander_findings: '',
  bn_commander_award: '',
  bn_commander_recommendations: '',
  bn_commander_date: '',
  bn_commander_signature: '',
  // Brigade Commander Section
  bde_commander_officer_id: '',
  bde_commander_officer_number: '',
  bde_commander_findings: '',
  bde_commander_award: '',
  bde_commander_recommendations: '',
  bde_commander_date: '',
  bde_commander_signature: '',
  // General Commander Section
  gen_commander_officer_id: '',
  gen_commander_officer_number: '',
  gen_commander_findings: '',
  gen_commander_award: '',
  gen_commander_recommendations: '',
  gen_commander_date: '',
  gen_commander_signature: ''
};

export default function DisciplineForm({
  isEdit = true,
  mockData,
  onSave,
  isLoading = false
}: DisciplineFormProps) {
  const { data: officers } = useGetOfficers();
  const createMutation = useCreateChargeSheet();
  const updateMutation = useUpdateChargeSheet();

  const [formData, setFormData] = useState(mockData || emptyFormData);
  const [openOfficerDropdown, setOpenOfficerDropdown] = useState<string | null>(null);
  const [filteredOfficers, setFilteredOfficers] = useState<Record<string, any[]>>({});
  const [officerIds, setOfficerIds] = useState<Record<string, number | string>>({});

  // Update formData when mockData changes
  useEffect(() => {
    if (mockData) {
      console.log('[Charge Sheet Form] Syncing formData from mockData:', mockData);
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

  const handleFileChange = (field: string, file: File | null) => {
    if (!isEdit) return;
    setFormData((prev: any) => ({
      ...prev,
      [field]: file ? file.name : ''
    }));
  };

  const handleOfficerSearch = (field: string, searchTerm: string) => {
    if (!isEdit) return;

    const numberFieldName = field.replace('_id', '_number');

    setFormData((prev: any) => ({
      ...prev,
      [numberFieldName]: searchTerm
    }));

    setOpenOfficerDropdown(field);

    if (searchTerm.trim() === '') {
      setFilteredOfficers((prev) => ({ ...prev, [field]: [] }));
      return;
    }

    const filtered =
      officers?.filter(
        (officer: any) =>
          officer.serviceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          officer.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [];

    setFilteredOfficers((prev) => ({ ...prev, [field]: filtered }));
  };

  const handleOfficerSelect = (field: string, officer: any) => {
    const numberFieldName = field.replace('_id', '_number');

    setFormData((prev: any) => ({
      ...prev,
      [numberFieldName]: officer.serviceNumber // Store officer number for display
    }));
    setOfficerIds((prev) => ({
      ...prev,
      [field]: officer.id // Store officer ID separately for submission
    }));
    setOpenOfficerDropdown(null);
    setFilteredOfficers((prev) => ({ ...prev, [field]: [] }));
  };

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!formData.accused_officer_number?.toString().trim()) {
        showError('Accused Officer is required');
        return;
      }
      if (!formData.accused_officer_unit?.trim()) {
        showError('Accused Officer Unit is required');
        return;
      }
      if (!formData.statement_of_offence?.trim()) {
        showError('Statement of Offence is required');
        return;
      }

      // Helper function to find officer ID by service number
      const findOfficerIdByNumber = (serviceNumber: string) => {
        if (!serviceNumber) return '';
        const officer = officers?.find((o: any) => o.serviceNumber === serviceNumber);
        return officer?.id || '';
      };

      // Build submission data with officer IDs
      const submissionData = {
        ...formData,
        accused_officer_id:
          officerIds.accused_officer_id || findOfficerIdByNumber(formData.accused_officer_number),
        reporting_officer_id:
          officerIds.reporting_officer_id ||
          findOfficerIdByNumber(formData.reporting_officer_number),
        witnessing_officer_id:
          officerIds.witnessing_officer_id ||
          findOfficerIdByNumber(formData.witnessing_officer_number),
        tried_by_officer_id:
          officerIds.tried_by_officer_id || findOfficerIdByNumber(formData.tried_by_officer_number),
        commander_officer_id:
          officerIds.commander_officer_id ||
          findOfficerIdByNumber(formData.commander_officer_number),
        bn_commander_officer_id:
          officerIds.bn_commander_officer_id ||
          findOfficerIdByNumber(formData.bn_commander_officer_number),
        bde_commander_officer_id:
          officerIds.bde_commander_officer_id ||
          findOfficerIdByNumber(formData.bde_commander_officer_number),
        gen_commander_officer_id:
          officerIds.gen_commander_officer_id ||
          findOfficerIdByNumber(formData.gen_commander_officer_number)
      };

      console.log('[Charge Sheet Form] Submitting form data:', submissionData);

      if (onSave) {
        await onSave(submissionData);
      } else {
        // Direct save if no onSave callback
        const isUpdate = submissionData.id;
        const mutation = isUpdate ? updateMutation : createMutation;
        await mutation.mutateAsync(submissionData);
      }
    } catch (error) {
      console.error('[Charge Sheet Form] Save failed:', error);
    }
  };

  return (
    <div className="p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-gray-600">NA FORM 252</p>
            <p className="text-sm text-gray-600">SECTION 123</p>
          </div>
          <div className="flex gap-2">
            <button
              disabled={!isEdit || isLoading}
              className={`px-4 py-1 text-sm border border-gray-300 rounded ${
                !isEdit || isLoading
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'hover:bg-gray-50'
              }`}
            >
              PDF
            </button>
            <button
              disabled={!isEdit || isLoading}
              className={`px-4 py-1 text-sm border border-gray-300 rounded ${
                !isEdit || isLoading
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'hover:bg-gray-50'
              }`}
            >
              Print
            </button>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-4">CHARGE SHEET</h1>
        <p className="text-center text-gray-700 mb-8">MADE UNDER AFA CAP A20 LFN 2004</p>
      </div>

      <div className="space-y-8">
        {/* Section 1: The Accused */}
        <div>
          <h2 className="text-lg font-semibold mb-4 underline">1 THE ACCUSED</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <label className="block text-sm font-medium mb-2">OFFICER</label>
              <input
                type="text"
                value={formData.accused_officer_number || ''}
                onChange={(e) => handleOfficerSearch('accused_officer_id', e.target.value)}
                placeholder="Search by name or service number"
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
              {openOfficerDropdown === 'accused_officer_id' &&
                formData.accused_officer_number &&
                filteredOfficers['accused_officer_id']?.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredOfficers['accused_officer_id'].map((officer: any) => (
                      <button
                        key={officer.id}
                        type="button"
                        onClick={() => handleOfficerSelect('accused_officer_id', officer)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                      >
                        <div className="flex justify-between">
                          <p>{officer.name}</p>
                          <p className="text-gray-600">{officer.serviceNumber}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">UNIT</label>
              <input
                type="text"
                value={formData.accused_officer_unit}
                onChange={(e) => handleInputChange('accused_officer_unit', e.target.value)}
                placeholder="Unit"
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>

          <p className="mb-4">Being a person subject to military law is charge with</p>

          <div className="mb-4">
            <div className="flex items-start gap-4 mb-4">
              <span className="font-medium">a.</span>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">A STATEMENT OF OFFENCE</label>
                <textarea
                  value={formData.statement_of_offence}
                  onChange={(e) => handleInputChange('statement_of_offence', e.target.value)}
                  placeholder="write here"
                  rows={4}
                  disabled={!isEdit || isLoading}
                  className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                  }`}
                />
              </div>
            </div>

            <div className="ml-8">
              <label className="block text-sm font-medium mb-2">PUNISHABLE UNDER SECTION</label>
              <input
                type="text"
                value={formData.punishable_under_section}
                onChange={(e) => handleInputChange('punishable_under_section', e.target.value)}
                placeholder="Punishable under section"
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="font-medium">b.</span>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">PARTICULARS OF OFFENCE</label>
              <textarea
                value={formData.particulars_of_offence}
                onChange={(e) => handleInputChange('particulars_of_offence', e.target.value)}
                placeholder="Write here"
                rows={4}
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Offence Reported By */}
        <div>
          <h2 className="text-lg font-semibold mb-4 underline">2 OFFENCE REPORTED BY</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium mb-2">OFFICER</label>
              <input
                type="text"
                value={formData.reporting_officer_number || ''}
                onChange={(e) => handleOfficerSearch('reporting_officer_id', e.target.value)}
                placeholder="Search by name or service number"
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
              {openOfficerDropdown === 'reporting_officer_id' &&
                formData.reporting_officer_number &&
                filteredOfficers['reporting_officer_id']?.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredOfficers['reporting_officer_id'].map((officer: any) => (
                      <button
                        key={officer.id}
                        type="button"
                        onClick={() => handleOfficerSelect('reporting_officer_id', officer)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                      >
                        <div className="flex justify-between">
                          <p>{officer.name}</p>
                          <p className="text-gray-600">{officer.serviceNumber}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">UNIT</label>
              <input
                type="text"
                value={formData.reporting_officer_unit}
                onChange={(e) => handleInputChange('reporting_officer_unit', e.target.value)}
                placeholder="Unit"
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>
        </div>

        {/* Section 3: Witness */}
        <div>
          <h2 className="text-lg font-semibold mb-4 underline">3 WITNESS</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium mb-2">OFFICER</label>
              <input
                type="text"
                value={formData.witnessing_officer_number || ''}
                onChange={(e) => handleOfficerSearch('witnessing_officer_id', e.target.value)}
                placeholder="Search by name or service number"
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
              {openOfficerDropdown === 'witnessing_officer_id' &&
                formData.witnessing_officer_number &&
                filteredOfficers['witnessing_officer_id']?.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredOfficers['witnessing_officer_id'].map((officer: any) => (
                      <button
                        key={officer.id}
                        type="button"
                        onClick={() => handleOfficerSelect('witnessing_officer_id', officer)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                      >
                        <div className="flex justify-between">
                          <p>{officer.name}</p>
                          <p className="text-gray-600">{officer.serviceNumber}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">UNIT</label>
              <input
                type="text"
                value={formData.witnessing_officer_unit}
                onChange={(e) => handleInputChange('witnessing_officer_unit', e.target.value)}
                placeholder="Unit"
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>
        </div>

        {/* Section 4: To Be Tried By */}
        <div>
          <h2 className="text-lg font-semibold mb-4 underline">4 TO BE TRIED BY</h2>
          <p className="text-sm mb-4">IN CASE OF COURT MARTIAL ONLY, STATE TYPE</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium mb-2">OFFICER</label>
              <input
                type="text"
                value={formData.tried_by_officer_number || ''}
                onChange={(e) => handleOfficerSearch('tried_by_officer_id', e.target.value)}
                placeholder="Search by name or service number"
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
              {openOfficerDropdown === 'tried_by_officer_id' &&
                formData.tried_by_officer_number &&
                filteredOfficers['tried_by_officer_id']?.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredOfficers['tried_by_officer_id'].map((officer: any) => (
                      <button
                        key={officer.id}
                        type="button"
                        onClick={() => handleOfficerSelect('tried_by_officer_id', officer)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                      >
                        <div className="flex justify-between">
                          <p>{officer.name}</p>
                          <p className="text-gray-600">{officer.serviceNumber}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">UNIT</label>
              <input
                type="text"
                value={formData.tried_by_officer_unit}
                onChange={(e) => handleInputChange('tried_by_officer_unit', e.target.value)}
                placeholder="Unit"
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>
        </div>

        {/* Section 5: Commander */}
        <div>
          <h2 className="text-lg font-semibold mb-4 underline">5 COMMANDER</h2>

          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium mb-2">OFFICER</label>
              <input
                type="text"
                value={formData.commander_officer_number || ''}
                onChange={(e) => handleOfficerSearch('commander_officer_id', e.target.value)}
                placeholder="Search by name or service number"
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
              {openOfficerDropdown === 'commander_officer_id' &&
                formData.commander_officer_number &&
                filteredOfficers['commander_officer_id']?.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredOfficers['commander_officer_id'].map((officer: any) => (
                      <button
                        key={officer.id}
                        type="button"
                        onClick={() => handleOfficerSelect('commander_officer_id', officer)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                      >
                        <div className="flex justify-between">
                          <p>{officer.name}</p>
                          <p className="text-gray-600">{officer.serviceNumber}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">FINDINGS</label>
              <textarea
                value={formData.commander_findings}
                onChange={(e) => handleInputChange('commander_findings', e.target.value)}
                placeholder="Findings"
                rows={3}
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">AWARD</label>
              <input
                type="text"
                value={formData.commander_award}
                onChange={(e) => handleInputChange('commander_award', e.target.value)}
                placeholder="Award"
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">RECOMMENDATIONS</label>
              <textarea
                value={formData.commander_recommendations}
                onChange={(e) => handleInputChange('commander_recommendations', e.target.value)}
                placeholder="Recommendations"
                rows={3}
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">DATE</label>
              <input
                type="date"
                value={formData.commander_date}
                onChange={(e) => handleInputChange('commander_date', e.target.value)}
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">SIGNATURE</label>
              <input
                type="file"
                onChange={(e) =>
                  handleFileChange('commander_signature', e.target.files?.[0] || null)
                }
                disabled={!isEdit || isLoading}
                accept="image/*,.pdf"
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
              {formData.commander_signature && (
                <p className="text-sm text-gray-600 mt-1">
                  Selected: {formData.commander_signature}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section 6: Battalion Commander */}
        <div>
          <h2 className="text-lg font-semibold mb-4 underline">6 BATTALION COMMANDER</h2>

          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium mb-2">OFFICER</label>
              <input
                type="text"
                value={formData.bn_commander_officer_number || ''}
                onChange={(e) => handleOfficerSearch('bn_commander_officer_id', e.target.value)}
                placeholder="Search by name or service number"
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
              {openOfficerDropdown === 'bn_commander_officer_id' &&
                formData.bn_commander_officer_number &&
                filteredOfficers['bn_commander_officer_id']?.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredOfficers['bn_commander_officer_id'].map((officer: any) => (
                      <button
                        key={officer.id}
                        type="button"
                        onClick={() => handleOfficerSelect('bn_commander_officer_id', officer)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                      >
                        <div className="flex justify-between">
                          <p>{officer.name}</p>
                          <p className="text-gray-600">{officer.serviceNumber}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">FINDINGS</label>
              <textarea
                value={formData.bn_commander_findings}
                onChange={(e) => handleInputChange('bn_commander_findings', e.target.value)}
                placeholder="Findings"
                rows={3}
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">AWARD</label>
              <input
                type="text"
                value={formData.bn_commander_award}
                onChange={(e) => handleInputChange('bn_commander_award', e.target.value)}
                placeholder="Award"
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">RECOMMENDATIONS</label>
              <textarea
                value={formData.bn_commander_recommendations}
                onChange={(e) => handleInputChange('bn_commander_recommendations', e.target.value)}
                placeholder="Recommendations"
                rows={3}
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">DATE</label>
              <input
                type="date"
                value={formData.bn_commander_date}
                onChange={(e) => handleInputChange('bn_commander_date', e.target.value)}
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">SIGNATURE</label>
              <input
                type="file"
                onChange={(e) =>
                  handleFileChange('bn_commander_signature', e.target.files?.[0] || null)
                }
                disabled={!isEdit || isLoading}
                accept="image/*,.pdf"
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
              {formData.bn_commander_signature && (
                <p className="text-sm text-gray-600 mt-1">
                  Selected: {formData.bn_commander_signature}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section 7: Brigade Commander */}
        <div>
          <h2 className="text-lg font-semibold mb-4 underline">7 BRIGADE COMMANDER</h2>

          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium mb-2">OFFICER</label>
              <input
                type="text"
                value={formData.bde_commander_officer_number || ''}
                onChange={(e) => handleOfficerSearch('bde_commander_officer_id', e.target.value)}
                placeholder="Search by name or service number"
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
              {openOfficerDropdown === 'bde_commander_officer_id' &&
                formData.bde_commander_officer_number &&
                filteredOfficers['bde_commander_officer_id']?.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredOfficers['bde_commander_officer_id'].map((officer: any) => (
                      <button
                        key={officer.id}
                        type="button"
                        onClick={() => handleOfficerSelect('bde_commander_officer_id', officer)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                      >
                        <div className="flex justify-between">
                          <p>{officer.name}</p>
                          <p className="text-gray-600">{officer.serviceNumber}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">FINDINGS</label>
              <textarea
                value={formData.bde_commander_findings}
                onChange={(e) => handleInputChange('bde_commander_findings', e.target.value)}
                placeholder="Findings"
                rows={3}
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">AWARD</label>
              <input
                type="text"
                value={formData.bde_commander_award}
                onChange={(e) => handleInputChange('bde_commander_award', e.target.value)}
                placeholder="Award"
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">RECOMMENDATIONS</label>
              <textarea
                value={formData.bde_commander_recommendations}
                onChange={(e) => handleInputChange('bde_commander_recommendations', e.target.value)}
                placeholder="Recommendations"
                rows={3}
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">DATE</label>
              <input
                type="date"
                value={formData.bde_commander_date}
                onChange={(e) => handleInputChange('bde_commander_date', e.target.value)}
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">SIGNATURE</label>
              <input
                type="file"
                onChange={(e) =>
                  handleFileChange('bde_commander_signature', e.target.files?.[0] || null)
                }
                disabled={!isEdit || isLoading}
                accept="image/*,.pdf"
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
              {formData.bde_commander_signature && (
                <p className="text-sm text-gray-600 mt-1">
                  Selected: {formData.bde_commander_signature}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section 8: General Commander */}
        <div>
          <h2 className="text-lg font-semibold mb-4 underline">8 GENERAL COMMANDER</h2>

          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium mb-2">OFFICER</label>
              <input
                type="text"
                value={formData.gen_commander_officer_number || ''}
                onChange={(e) => handleOfficerSearch('gen_commander_officer_id', e.target.value)}
                placeholder="Search by name or service number"
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
              {openOfficerDropdown === 'gen_commander_officer_id' &&
                formData.gen_commander_officer_number &&
                filteredOfficers['gen_commander_officer_id']?.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredOfficers['gen_commander_officer_id'].map((officer: any) => (
                      <button
                        key={officer.id}
                        type="button"
                        onClick={() => handleOfficerSelect('gen_commander_officer_id', officer)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                      >
                        <div className="flex justify-between">
                          <p>{officer.name}</p>
                          <p className="text-gray-600">{officer.serviceNumber}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">FINDINGS</label>
              <textarea
                value={formData.gen_commander_findings}
                onChange={(e) => handleInputChange('gen_commander_findings', e.target.value)}
                placeholder="Findings"
                rows={3}
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">AWARD</label>
              <input
                type="text"
                value={formData.gen_commander_award}
                onChange={(e) => handleInputChange('gen_commander_award', e.target.value)}
                placeholder="Award"
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">RECOMMENDATIONS</label>
              <textarea
                value={formData.gen_commander_recommendations}
                onChange={(e) => handleInputChange('gen_commander_recommendations', e.target.value)}
                placeholder="Recommendations"
                rows={3}
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">DATE</label>
              <input
                type="date"
                value={formData.gen_commander_date}
                onChange={(e) => handleInputChange('gen_commander_date', e.target.value)}
                disabled={!isEdit || isLoading}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">SIGNATURE</label>
              <input
                type="file"
                onChange={(e) =>
                  handleFileChange('gen_commander_signature', e.target.files?.[0] || null)
                }
                disabled={!isEdit || isLoading}
                accept="image/*,.pdf"
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit || isLoading ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
              {formData.gen_commander_signature && (
                <p className="text-sm text-gray-600 mt-1">
                  Selected: {formData.gen_commander_signature}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="text-base font-semibold mb-4">NOTES</h3>

          <div className="text-sm space-y-2">
            <p>
              <strong>1.</strong> If charge is dismissed or dealt with summarily, enter the space
              provided the decision made eg:
            </p>
            <p className="ml-4">
              <strong>a.</strong> Remanded for further inquiries, remanded for CO
            </p>
            <p className="ml-4">
              <strong>b.</strong> Remanded for ( close/open arrest) for further inquiry
            </p>
            <p className="ml-4">
              <strong>c.</strong> (for summary/abstract of evidence) ( for trial or election
              accused) case referred to high authority)
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <button
            onClick={handleSave}
            disabled={!isEdit || isLoading}
            className={`font-medium py-3 px-8 rounded transition-colors duration-200 ${
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
  );
}
