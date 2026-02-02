/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useEffect } from 'react';
import api from '../../services/api';
import { InputField, CustomSelect, FormSection, FormRow } from './PartTwoOrderComponents';
import { OfficerSearchField } from './OfficerSearchField';

interface PartTwoOrderProps {
  isEdit?: boolean;
  mockData?: any;
}

const PartTwoOrder: React.FC<PartTwoOrderProps> = ({ isEdit = true, mockData }) => {
  const [formData, setFormData] = useState({
    unit: '',
    phone: '',
    email: '',
    order_officer: '',
    location: '',
    issueNo: '',
    date: '',
    sheetNo: '',
    dutyDepartment: '',
    strength_increase_posted_in: 'Senior officer',
    strength_increase_officer_search: '',
    strength_increase_officer_id: '',
    strength_increase_appointment: '',
    strength_increase_previous_unit: '',
    strength_increase_effective_date: '',
    strength_increase_corps: '',
    strength_increase_authority: '',
    strength_decrease_posted_out: 'Senior officer',
    strength_decrease_officer_search: '',
    strength_decrease_officer_id: '',
    strength_decrease_appointment: '',
    strength_decrease_previous_unit: '',
    strength_decrease_effective_date: '',
    strength_decrease_corps: '',
    strength_decrease_authority: '',
    pay_allowance_posted_out: 'Senior officer',
    pay_allowance_officer_search: '',
    pay_allowance_officer_id: '',
    pay_allowance_appointment: '',
    pay_allowance_previous_unit: '',
    pay_allowance_effective_date: '',
    pay_allowance_corps: '',
    pay_allowance_authority: '',
    pay_allowance_from: 'Senior officer',
    pay_allowance_from_officer_search: '',
    pay_allowance_from_officer_id: '',
    pay_allowance_from_appointment: '',
    pay_allowance_from_previous_unit: '',
    pay_allowance_from_effective_date: '',
    pay_allowance_from_corps: '',
    pay_allowance_from_authority: '',
    miscellaneous_entries_from: 'Senior officer',
    miscellaneous_entries_officer_search: '',
    miscellaneous_entries_officer_id: '',
    miscellaneous_entries_appointment: '',
    miscellaneous_entries_previous_unit: '',
    miscellaneous_entries_effective_date: '',
    miscellaneous_entries_corps: '',
    miscellaneous_entries_authority: ''
  });

  // Stable handlers to prevent focus loss on input changes
  const handleFieldChange = useCallback(
    (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    },
    []
  );

  const handleSelectChange = useCallback(
    (field: keyof typeof formData) => (value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );
  const [distributionItems, setDistributionItems] = useState(
    isEdit
      ? [
          {
            id: 1,
            name: 'HQ 1 DIV',
            copies: 'One Copy',
            subName: 'AHQ DAPP',
            subCopies: 'One Copy'
          },
          {
            id: 2,
            name: 'HQ 1 DIV',
            copies: 'One Copy',
            subName: 'AHQ DAPP',
            subCopies: 'One Copy'
          },
          {
            id: 3,
            name: 'HQ 2 DIV',
            copies: 'One Copy',
            subName: 'AHQ DAPP',
            subCopies: 'One Copy'
          },
          {
            id: 4,
            name: 'HQ 2 DIV',
            copies: 'One Copy',
            subName: 'AHQ DAPP',
            subCopies: 'One Copy'
          }
        ]
      : mockData?.distribution || []
  );

  const rankOptions = ['Senior officer', 'Officer', 'Soldier'];

  // Populate form data when mockData changes (from clicked row)
  useEffect(() => {
    if (mockData) {
      console.log('[PartTwoOrder] Populating form with mockData:', mockData);
      setFormData((prev) => ({
        ...prev,
        // Basic fields
        unit: mockData.unit || '',
        phone: mockData.phone || '',
        email: mockData.email || '',
        order_officer: mockData.order_officer || '',
        location: mockData.location || '',
        issueNo: mockData.issueNo || '',
        date: mockData.date || '',
        sheetNo: mockData.sheetNo || '',
        dutyDepartment: mockData.dutyDepartment || '',
        // Strength Increase
        strength_increase_posted_in: mockData.strength_increase_posted_in || 'Senior officer',
        strength_increase_officer_search: mockData.strength_increase_officer_service_number || '',
        strength_increase_appointment: mockData.strength_increase_appointment || '',
        strength_increase_previous_unit: mockData.strength_increase_previous_unit || '',
        strength_increase_effective_date: mockData.strength_increase_effective_date || '',
        strength_increase_corps: mockData.strength_increase_corps || '',
        strength_increase_authority: mockData.strength_increase_authority || '',
        // Strength Decrease
        strength_decrease_posted_out: mockData.strength_decrease_posted_out || 'Senior officer',
        strength_decrease_officer_search: mockData.strength_decrease_officer_number || '',
        strength_decrease_appointment: mockData.strength_decrease_appointment || '',
        strength_decrease_previous_unit: mockData.strength_decrease_previous_unit || '',
        strength_decrease_effective_date: mockData.strength_decrease_effective_date || '',
        strength_decrease_corps: mockData.strength_decrease_corps || '',
        strength_decrease_authority: mockData.strength_decrease_authority || '',
        // Pay Allowance
        pay_allowance_posted_out: mockData.pay_allowance_posted_out || 'Senior officer',
        pay_allowance_officer_search: mockData.pay_allowance_officer_number || '',
        pay_allowance_appointment: mockData.pay_allowance_appointment || '',
        pay_allowance_previous_unit: mockData.pay_allowance_previous_unit || '',
        pay_allowance_effective_date: mockData.pay_allowance_effective_date || '',
        pay_allowance_corps: mockData.pay_allowance_corps || '',
        pay_allowance_authority: mockData.pay_allowance_authority || '',
        // Pay Allowance From
        pay_allowance_from: mockData.pay_allowance_from || 'Senior officer',
        pay_allowance_from_officer_search: mockData.pay_allowance_from_officer_number || '',
        pay_allowance_from_appointment: mockData.pay_allowance_from_appointment || '',
        pay_allowance_from_previous_unit: mockData.pay_allowance_from_previous_unit || '',
        pay_allowance_from_effective_date: mockData.pay_allowance_from_effective_date || '',
        pay_allowance_from_corps: mockData.pay_allowance_from_corps || '',
        pay_allowance_from_authority: mockData.pay_allowance_from_authority || '',
        // Miscellaneous Entries
        miscellaneous_entries_from: mockData.miscellaneous_entries_from || 'Senior officer',
        miscellaneous_entries_officer_search: mockData.miscellaneous_entries_officer_number || '',
        miscellaneous_entries_appointment: mockData.miscellaneous_entries_appointment || '',
        miscellaneous_entries_previous_unit: mockData.miscellaneous_entries_previous_unit || '',
        miscellaneous_entries_effective_date: mockData.miscellaneous_entries_effective_date || '',
        miscellaneous_entries_corps: mockData.miscellaneous_entries_corps || '',
        miscellaneous_entries_authority: mockData.miscellaneous_entries_authority || ''
      }));
    }
  }, [mockData]);

  const handleOfficerSelect = useCallback((sectionName: string, officer: any) => {
    // Update the form data with officer ID and search display
    setFormData((prev) => ({
      ...prev,
      [`${sectionName}_search`]: officer.serviceNumber || '',
      [`${sectionName}_id`]: officer.id || ''
    }));
  }, []);

  const handleOfficerSearchChange = useCallback((sectionName: string, value: string) => {
    // Update only the search display field
    setFormData((prev) => ({
      ...prev,
      [`${sectionName}_search`]: value
    }));
  }, []);

  // Distribution functions
  interface DistributionItem {
    id: number;
    name: string;
    copies: string;
    subName: string;
    subCopies: string;
  }

  const addDistributionItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const newItem: DistributionItem = {
      id: Date.now(),
      name: 'New Division',
      copies: 'One Copy',
      subName: 'AHQ DAPP',
      subCopies: 'One Copy'
    };
    setDistributionItems([...distributionItems, newItem]);
  };

  const removeDistributionItem = (id: number) => {
    setDistributionItems(distributionItems.filter((item: any) => item.id !== id));
  };

  interface UpdateDistributionItemFn {
    (id: number, field: keyof DistributionItem, value: string): void;
  }

  const updateDistributionItem: UpdateDistributionItemFn = (id, field, value) => {
    setDistributionItems(
      (distributionItems || []).map((item: any) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSubmit = async () => {
    const payload = {
      unit: formData.unit,
      phone: formData.phone,
      email: formData.email,
      order_officer: formData.order_officer,
      location: formData.location,
      issueNo: formData.issueNo,
      date: formData.date ? new Date(formData.date).toISOString() : '',
      sheetNo: formData.sheetNo,
      dutyDepartment: formData.dutyDepartment,
      strength_increase_posted_in: formData.strength_increase_posted_in,
      strength_increase_officer_id: parseInt(formData.strength_increase_officer_id) || 0,
      strength_increase_appointment: formData.strength_increase_appointment,
      strength_increase_previous_unit: formData.strength_increase_previous_unit,
      strength_increase_effective_date: formData.strength_increase_effective_date
        ? new Date(formData.strength_increase_effective_date).toISOString()
        : '',
      strength_increase_corps: formData.strength_increase_corps,
      strength_increase_authority: formData.strength_increase_authority,
      strength_decrease_posted_out: formData.strength_decrease_posted_out,
      strength_decrease_officer_id: parseInt(formData.strength_decrease_officer_id) || 0,
      strength_decrease_appointment: formData.strength_decrease_appointment,
      strength_decrease_previous_unit: formData.strength_decrease_previous_unit,
      strength_decrease_effective_date: formData.strength_decrease_effective_date
        ? new Date(formData.strength_decrease_effective_date).toISOString()
        : '',
      strength_decrease_corps: formData.strength_decrease_corps,
      strength_decrease_authority: formData.strength_decrease_authority,
      pay_allowance_posted_out: formData.pay_allowance_posted_out,
      pay_allowance_officer_id: parseInt(formData.pay_allowance_officer_id) || 0,
      pay_allowance_appointment: formData.pay_allowance_appointment,
      pay_allowance_previous_unit: formData.pay_allowance_previous_unit,
      pay_allowance_effective_date: formData.pay_allowance_effective_date
        ? new Date(formData.pay_allowance_effective_date).toISOString()
        : '',
      pay_allowance_corps: formData.pay_allowance_corps,
      pay_allowance_authority: formData.pay_allowance_authority,
      pay_allowance_from: formData.pay_allowance_from,
      pay_allowance_from_officer_id: parseInt(formData.pay_allowance_from_officer_id) || 0,
      pay_allowance_from_appointment: formData.pay_allowance_from_appointment,
      pay_allowance_from_previous_unit: formData.pay_allowance_from_previous_unit,
      pay_allowance_from_effective_date: formData.pay_allowance_from_effective_date
        ? new Date(formData.pay_allowance_from_effective_date).toISOString()
        : '',
      pay_allowance_from_corps: formData.pay_allowance_from_corps,
      pay_allowance_from_authority: formData.pay_allowance_from_authority,
      miscellaneous_entries_from: formData.miscellaneous_entries_from,
      miscellaneous_entries_officer_id: parseInt(formData.miscellaneous_entries_officer_id) || 0,
      miscellaneous_entries_appointment: formData.miscellaneous_entries_appointment,
      miscellaneous_entries_previous_unit: formData.miscellaneous_entries_previous_unit,
      miscellaneous_entries_effective_date: formData.miscellaneous_entries_effective_date
        ? new Date(formData.miscellaneous_entries_effective_date).toISOString()
        : '',
      miscellaneous_entries_corps: formData.miscellaneous_entries_corps,
      miscellaneous_entries_authority: formData.miscellaneous_entries_authority
    };
    try {
      await api.post('/v1/part2-order/create', payload);
      // Handle success, e.g., show toast or redirect
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="flex justify-center items-center mb-8 relative">
        <h1 className="text-2xl font-bold text-gray-800">FORM</h1>
        <button className="absolute right-0 flex items-center gap-2 text-gray-600 hover:text-gray-800">
          <img alt="" src="/dutyReport/print-icon.svg" className="h-4 w-4" />
          Print form
        </button>
      </div>

      {/* Form Details */}
      <div className="flex mb-8">
        <div className="space-y-4 border border-r-0 w-[30%] border-gray-500 p-3 rounded-l-md">
          <div className="flex items-center gap-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">UNIT:</label>
            {/* <div className="text-sm text-gray-600">{mockData?.unit}</div> */}
            <input
              type="text"
              value={formData.unit}
              onChange={handleFieldChange('unit')}
              className="bg-[#F5F5F5] px-2 border-none "
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">PHONE:</label>
            {/* <div className="text-sm text-gray-600">{mockData?.phone}</div> */}
            <input
              type="text"
              value={formData.phone}
              onChange={handleFieldChange('phone')}
              className="bg-[#F5F5F5] px-2 border-none "
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">EMAIL:</label>
            {/* <div className="text-sm text-gray-600">{mockData?.email}</div> */}
            <input
              type="text"
              value={formData.email}
              onChange={handleFieldChange('email')}
              className="bg-[#F5F5F5] px-2 border-none "
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">LOCATION:</label>
            {/* <div className="text-sm text-gray-600">{mockData?.location}</div> */}
            <input
              type="text"
              value={formData.location}
              onChange={handleFieldChange('location')}
              className="bg-[#F5F5F5] px-2 border-none "
            />
          </div>
        </div>

        <div className="grid grid-cols-5 w-[70%]">
          <InputField
            label="PART 11 ORDER(OFFICER)"
            className="border border-r-0 border-gray-500"
            placeholder="Write here"
            labelClass="py-2 px-2 bg-[#F5F5F5] h-12"
            showBorder={false}
            value={formData.order_officer}
            onChange={handleFieldChange('order_officer')}
          />
          <InputField
            label="ISSUE NO"
            className="border border-r-0 border-gray-500"
            placeholder="Write here"
            labelClass="py-2 px-2 bg-[#F5F5F5] h-12"
            showBorder={false}
            value={formData.issueNo}
            onChange={handleFieldChange('issueNo')}
          />
          <InputField
            label="DATE"
            className="border border-r-0 border-gray-500"
            placeholder="Write here"
            labelClass="py-2 px-2 bg-[#F5F5F5] h-12"
            showBorder={false}
            type="date"
            value={formData.date}
            onChange={handleFieldChange('date')}
          />
          <InputField
            label="DUTY DEPARTMENT"
            className="border border-r-0 border-gray-500"
            placeholder="Write here"
            labelClass="py-2 px-2 bg-[#F5F5F5] h-12"
            showBorder={false}
            value={formData.dutyDepartment}
            onChange={handleFieldChange('dutyDepartment')}
          />
          <InputField
            label="SHEET NO"
            className="border border-gray-500 rounded-r-md overflow-hidden"
            placeholder="Write here"
            labelClass="py-2 px-2 bg-[#F5F5F5] h-12"
            showBorder={false}
            value={formData.sheetNo}
            onChange={handleFieldChange('sheetNo')}
          />
        </div>
      </div>

      {/* Strength Increase */}
      <FormSection title="STRENGTH INCREASE">
        <div className="mb-4 w-[20%]">
          <label className="block text-xs font-medium text-gray-700 mb-1">POSTED IN</label>
          <CustomSelect
            value={formData.strength_increase_posted_in}
            onChange={handleSelectChange('strength_increase_posted_in')}
            options={rankOptions}
            placeholder="Select rank"
            showGreenBg={true}
          />
        </div>

        <FormRow>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">OFFICER ID</label>
            <OfficerSearchField
              value={formData.strength_increase_officer_search}
              officerId={formData.strength_increase_officer_id}
              onChange={(value) => handleOfficerSearchChange('strength_increase_officer', value)}
              onSelect={(officer) => handleOfficerSelect('strength_increase_officer', officer)}
            />
          </div>
          <InputField
            label="APPOINTMENT"
            placeholder="Appointment"
            value={formData.strength_increase_appointment}
            onChange={handleFieldChange('strength_increase_appointment')}
          />
          <InputField
            label="PREVIOUS UNIT"
            placeholder="Previous unit"
            value={formData.strength_increase_previous_unit}
            onChange={handleFieldChange('strength_increase_previous_unit')}
          />
        </FormRow>

        <FormRow>
          <InputField
            label="EFFECTIVE DATE"
            placeholder="Effective date"
            type="date"
            value={formData.strength_increase_effective_date}
            onChange={handleFieldChange('strength_increase_effective_date')}
          />
          <InputField
            label="CORPS"
            placeholder="corps"
            value={formData.strength_increase_corps}
            onChange={handleFieldChange('strength_increase_corps')}
          />
          <InputField
            label="AUTHORITY"
            placeholder="Authority"
            value={formData.strength_increase_authority}
            onChange={handleFieldChange('strength_increase_authority')}
          />
        </FormRow>
      </FormSection>

      {/* Strength Decrease */}
      <FormSection title="STRENGTH DECREASE">
        <div className="mb-4 w-[20%]">
          <label className="block text-xs font-medium text-gray-700 mb-1">POSTED OUT</label>
          <CustomSelect
            value={formData.strength_decrease_posted_out}
            onChange={handleSelectChange('strength_decrease_posted_out')}
            options={rankOptions}
            placeholder="Select rank"
            showGreenBg={true}
          />
        </div>

        <FormRow>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">OFFICER ID</label>
            <OfficerSearchField
              value={formData.strength_decrease_officer_search}
              officerId={formData.strength_decrease_officer_id}
              onChange={(value) => handleOfficerSearchChange('strength_decrease_officer', value)}
              onSelect={(officer) => handleOfficerSelect('strength_decrease_officer', officer)}
            />
          </div>
          <InputField
            label="APPOINTMENT"
            placeholder="Appointment"
            value={formData.strength_decrease_appointment}
            onChange={handleFieldChange('strength_decrease_appointment')}
          />
          <InputField
            label="PREVIOUS UNIT"
            placeholder="Previous unit"
            value={formData.strength_decrease_previous_unit}
            onChange={handleFieldChange('strength_decrease_previous_unit')}
          />
        </FormRow>

        <FormRow>
          <InputField
            label="EFFECTIVE DATE"
            placeholder="Effective date"
            type="date"
            value={formData.strength_decrease_effective_date}
            onChange={handleFieldChange('strength_decrease_effective_date')}
          />
          <InputField
            label="CORPS"
            placeholder="corps"
            value={formData.strength_decrease_corps}
            onChange={handleFieldChange('strength_decrease_corps')}
          />
          <InputField
            label="AUTHORITY"
            placeholder="Authority"
            value={formData.strength_decrease_authority}
            onChange={handleFieldChange('strength_decrease_authority')}
          />
        </FormRow>
      </FormSection>

      {/* Pay and Allowance (First Section) */}
      <FormSection title="PAY AND ALLOWANCE">
        <div className="mb-4 w-[20%]">
          <label className="block text-xs font-medium text-gray-700 mb-1">POSTED OUT</label>
          <CustomSelect
            value={formData.pay_allowance_posted_out}
            onChange={handleSelectChange('pay_allowance_posted_out')}
            options={rankOptions}
            placeholder="Select rank"
          />
        </div>

        <FormRow>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">OFFICER ID</label>
            <OfficerSearchField
              value={formData.pay_allowance_officer_search}
              officerId={formData.pay_allowance_officer_id}
              onChange={(value) => handleOfficerSearchChange('pay_allowance_officer', value)}
              onSelect={(officer) => handleOfficerSelect('pay_allowance_officer', officer)}
            />
          </div>
          <InputField
            label="APPOINTMENT"
            placeholder="Appointment"
            value={formData.pay_allowance_appointment}
            onChange={handleFieldChange('pay_allowance_appointment')}
          />
          <InputField
            label="PREVIOUS UNIT"
            placeholder="Previous unit"
            value={formData.pay_allowance_previous_unit}
            onChange={handleFieldChange('pay_allowance_previous_unit')}
          />
        </FormRow>

        <FormRow>
          <InputField
            label="EFFECTIVE DATE"
            placeholder="Effective date"
            type="date"
            value={formData.pay_allowance_effective_date}
            onChange={handleFieldChange('pay_allowance_effective_date')}
          />
          <InputField
            label="CORPS"
            placeholder="corps"
            value={formData.pay_allowance_corps}
            onChange={handleFieldChange('pay_allowance_corps')}
          />
          <InputField
            label="AUTHORITY"
            placeholder="Authority"
            value={formData.pay_allowance_authority}
            onChange={handleFieldChange('pay_allowance_authority')}
          />
        </FormRow>
      </FormSection>

      {/* Pay and Allowance (Second Section) */}
      <FormSection title="PAY AND ALLOWANCE">
        <div className="mb-4 w-[20%]">
          <label className="block text-xs font-medium text-gray-700 mb-1">FROM</label>
          <CustomSelect
            value={formData.pay_allowance_from}
            onChange={handleSelectChange('pay_allowance_from')}
            options={rankOptions}
            placeholder="Select rank"
          />
        </div>

        <FormRow>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">OFFICER ID</label>
            <OfficerSearchField
              value={formData.pay_allowance_from_officer_search}
              officerId={formData.pay_allowance_from_officer_id}
              onChange={(value) => handleOfficerSearchChange('pay_allowance_from_officer', value)}
              onSelect={(officer) => handleOfficerSelect('pay_allowance_from_officer', officer)}
            />
          </div>
          <InputField
            label="APPOINTMENT"
            placeholder="Appointment"
            value={formData.pay_allowance_from_appointment}
            onChange={handleFieldChange('pay_allowance_from_appointment')}
          />
          <InputField
            label="PREVIOUS UNIT"
            placeholder="Previous unit"
            value={formData.pay_allowance_from_previous_unit}
            onChange={handleFieldChange('pay_allowance_from_previous_unit')}
          />
        </FormRow>

        <FormRow>
          <InputField
            label="EFFECTIVE DATE"
            placeholder="Effective date"
            type="date"
            value={formData.pay_allowance_from_effective_date}
            onChange={handleFieldChange('pay_allowance_from_effective_date')}
          />
          <InputField
            label="CORPS"
            placeholder="corps"
            value={formData.pay_allowance_from_corps}
            onChange={handleFieldChange('pay_allowance_from_corps')}
          />
          <InputField
            label="AUTHORITY"
            placeholder="Authority"
            value={formData.pay_allowance_from_authority}
            onChange={handleFieldChange('pay_allowance_from_authority')}
          />
        </FormRow>
      </FormSection>

      {/* Miscellaneous Entries */}
      <FormSection title="MISCELLANEOUS ENTRIES">
        <div className="mb-4 w-[20%]">
          <label className="block text-xs font-medium text-gray-700 mb-1">FROM</label>
          <CustomSelect
            value={formData.miscellaneous_entries_from}
            onChange={handleSelectChange('miscellaneous_entries_from')}
            options={rankOptions}
            placeholder="Select rank"
            showGreenBg={true}
          />
        </div>

        <FormRow>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">OFFICER ID</label>
            <OfficerSearchField
              value={formData.miscellaneous_entries_officer_search}
              officerId={formData.miscellaneous_entries_officer_id}
              onChange={(value) =>
                handleOfficerSearchChange('miscellaneous_entries_officer', value)
              }
              onSelect={(officer) => handleOfficerSelect('miscellaneous_entries_officer', officer)}
            />
          </div>
          <InputField
            label="APPOINTMENT"
            placeholder="Appointment"
            value={formData.miscellaneous_entries_appointment}
            onChange={handleFieldChange('miscellaneous_entries_appointment')}
          />
          <InputField
            label="PREVIOUS UNIT"
            placeholder="Previous unit"
            value={formData.miscellaneous_entries_previous_unit}
            onChange={handleFieldChange('miscellaneous_entries_previous_unit')}
          />
        </FormRow>

        <FormRow>
          <InputField
            label="EFFECTIVE DATE"
            placeholder="Effective date"
            type="date"
            value={formData.miscellaneous_entries_effective_date}
            onChange={handleFieldChange('miscellaneous_entries_effective_date')}
          />
          <InputField
            label="CORPS"
            placeholder="corps"
            value={formData.miscellaneous_entries_corps}
            onChange={handleFieldChange('miscellaneous_entries_corps')}
          />
          <InputField
            label="AUTHORITY"
            placeholder="Authority"
            value={formData.miscellaneous_entries_authority}
            onChange={handleFieldChange('miscellaneous_entries_authority')}
          />
        </FormRow>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2 rounded-md font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!isEdit}
          >
            Save
          </button>
        </div>
      </FormSection>

      <FormSection title="DISTRIBUTION">
        <div className="flex items-start flex-wrap gap-6">
          {distributionItems?.map((item: any) => (
            <div key={item.id} className="flex flex-col items-center">
              <div className="flex items-center justify-between w-full mb-2">
                {isEdit ? (
                  <>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        updateDistributionItem(item.id, 'name', e.target.value);
                      }}
                      onFocus={(e) => e.stopPropagation()}
                      className="font-medium text-sm bg-transparent border-none outline-none flex-1"
                    />
                    <input
                      type="text"
                      value={item.copies}
                      onChange={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        updateDistributionItem(item.id, 'copies', e.target.value);
                      }}
                      onFocus={(e) => e.stopPropagation()}
                      className="text-sm text-gray-600 bg-transparent border-none outline-none w-20 text-right"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeDistributionItem(item.id);
                      }}
                      className="p-1 hover:bg-gray-200 rounded-full ml-2"
                    >
                      <img src="/cancel-circle.svg" alt="" />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="font-medium text-sm text-gray-700 flex-1">{item.name}</div>
                    <div className="text-sm text-gray-600 w-20 text-right">{item.copies}</div>
                  </>
                )}
              </div>
              <div className="text-xs text-gray-400 w-full text-left">AHQ DAPP</div>
              <div className="text-xs text-gray-400 w-full text-left">One Copy</div>
            </div>
          ))}
        </div>

        {/* Additional row if more than 4 items */}
        {isEdit && (
          <div className="grid grid-cols-4 gap-6 mt-6">
            <button
              type="button"
              onClick={addDistributionItem}
              className="flex items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-md hover:border-teal-500 hover:bg-teal-50"
            >
              <img alt="" src="/department/add-black-icon.svg" className="h-6 w-6 text-gray-400" />
            </button>
          </div>
        )}
      </FormSection>
    </div>
  );
};

export default PartTwoOrder;
