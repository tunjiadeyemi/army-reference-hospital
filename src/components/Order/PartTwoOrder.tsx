/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

// Mock data for view mode

interface PartTwoOrderProps {
  isEdit?: boolean;
  mockData?: any;
}

const PartTwoOrder: React.FC<PartTwoOrderProps> = ({ isEdit = true, mockData }) => {
  const [strengthIncreaseRank, setStrengthIncreaseRank] = useState(
    isEdit ? 'Senior officer' : mockData?.strengthIncrease.postedIn
  );
  const [strengthDecreaseRank, setStrengthDecreaseRank] = useState(
    isEdit ? 'Senior officer' : mockData?.strengthDecrease.postedOut
  );
  const [payAllowanceRank1, setPayAllowanceRank1] = useState(
    isEdit ? 'Senior officer' : mockData?.payAllowance1.postedOut
  );
  const [payAllowanceRank2, setPayAllowanceRank2] = useState(
    isEdit ? 'Senior officer' : mockData?.payAllowance2.from
  );
  const [miscellaneousRank, setMiscellaneousRank] = useState(
    isEdit ? '' : mockData?.miscellaneous.rank
  );
  const [miscellaneousFrom, setMiscellaneousFrom] = useState(
    isEdit ? 'Child birth' : mockData?.miscellaneous.from
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
      : mockData.distribution
  );

  const rankOptions = ['Senior officer', 'Officer', 'Soldier'];
  const miscellaneousOptions = [
    'Child birth',
    'Marriage',
    'Honours and Award',
    'Change of next of kin'
  ];

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
      distributionItems.map((item: any) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const CustomSelect = ({
    value,
    onChange,
    options,
    placeholder,
    showGreenBg = false
  }: {
    value: string;
    onChange: (value: string) => void;
    options: string[];
    placeholder: string;
    showGreenBg?: boolean;
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          type="button"
          className={`w-full px-3 py-2 text-left border border-gray-300 rounded-md bg-white hover:bg-gray-50 flex items-center justify-between ${
            showGreenBg && value ? 'bg-teal-600 text-white' : ''
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`${!value ? 'text-black' : 'text-black'}`}>{value || placeholder}</span>
          <img alt="" src="/chevron-down.svg" className="h-4 w-4 text-gray-400" />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                className={`w-full px-3 py-2 text-left hover:bg-teal-600 cursor-pointer ${
                  option === value ? 'bg-teal-600 text-white' : ''
                }`}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-gray-700 mb-4 border-b border-gray-300 pb-2">
        {title}
      </h3>
      {children}
    </div>
  );

  const FormRow = ({
    children,
    className = ''
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 ${className}`}>
      {children}
    </div>
  );

  const InputField = ({
    label = '',
    placeholder = '',
    type = 'text',
    className = '',
    labelClass = '',
    showBorder = true,
    value = '',
    disabled = false
  }) => (
    <div className={className}>
      <label className={`block text-xs font-medium text-gray-700 mb-1 ${labelClass}`}>
        {label}
      </label>
      {disabled ? (
        <div className="w-full px-3 py-2 text-gray-700 bg-gray-50 rounded-md border border-gray-200">
          {value || placeholder}
        </div>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          defaultValue={value}
          disabled={disabled}
          className={`${
            showBorder
              ? 'focus:ring-2 focus:ring-teal-500 focus:border-transparent border border-gray-300'
              : 'border-none'
          } w-full px-3 py-2 rounded-md focus:outline-none placeholder-gray-400 ${
            disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''
          }`}
        />
      )}
    </div>
  );

  interface SelectFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: string[];
    showGreenBg?: boolean;
    disabled?: boolean;
  }

  const SelectField: React.FC<SelectFieldProps> = ({
    label,
    value,
    onChange,
    options,
    showGreenBg = false,
    disabled = false
  }) => (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      {disabled ? (
        <div className="w-full px-3 py-2 text-gray-700 bg-gray-50 rounded-md border border-gray-200">
          {value || 'Select...'}
        </div>
      ) : (
        <CustomSelect
          value={value}
          onChange={onChange}
          options={options}
          placeholder="Select..."
          showGreenBg={showGreenBg}
        />
      )}
    </div>
  );

  const DistributionItem = ({
    label,
    copies = 'One Copy',
    onRemove,
    showRemove = true
  }: {
    label: string;
    copies?: string;
    onRemove: () => void;
    showRemove?: boolean;
  }) => (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-gray-50">
      <div>
        <div className="font-medium text-sm">{label}</div>
        <div className="text-xs text-gray-500">{copies}</div>
      </div>
      {showRemove && (
        <button type="button" onClick={onRemove} className="p-1 hover:bg-gray-200 rounded-full">
          <img src="/cancel-circle.svg" alt="" />
        </button>
      )}
    </div>
  );

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
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">UNIT:</label>
            <div className="text-sm text-gray-600">{mockData?.unit}</div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">PHONE:</label>
            <div className="text-sm text-gray-600">{mockData?.phone}</div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">EMAIL:</label>
            <div className="text-sm text-gray-600">{mockData?.email}</div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">LOCATION:</label>
            <div className="text-sm text-gray-600">{mockData?.location}</div>
          </div>
        </div>

        <div className="grid grid-cols-5 w-[70%]">
          <InputField
            label="PART 11 ORDER(OFFICER)"
            className="border border-r-0 border-gray-500"
            placeholder="Write here"
            labelClass="py-2 px-2 bg-[#F5F5F5] h-12"
            showBorder={false}
            value={isEdit ? '' : mockData?.header.partOrder}
            disabled={!isEdit}
          />
          <InputField
            label="ISSUE NO"
            className="border border-r-0 border-gray-500"
            placeholder="Write here"
            labelClass="py-2 px-2 bg-[#F5F5F5] h-12"
            showBorder={false}
            value={isEdit ? '' : mockData?.header.issueNo}
            disabled={!isEdit}
          />
          <InputField
            label="DATE"
            className="border border-r-0 border-gray-500"
            placeholder="Write here"
            labelClass="py-2 px-2 bg-[#F5F5F5] h-12"
            showBorder={false}
            value={isEdit ? '' : mockData?.header.date}
            disabled={!isEdit}
          />
          <InputField
            label="UNIT"
            className="border border-r-0 border-gray-500"
            placeholder="Write here"
            labelClass="py-2 px-2 bg-[#F5F5F5] h-12"
            showBorder={false}
            value={isEdit ? '' : mockData?.header.unit}
            disabled={!isEdit}
          />
          <InputField
            label="SHEET NO"
            className="border border-gray-500 rounded-r-md overflow-hidden"
            placeholder="Write here"
            labelClass="py-2 px-2 bg-[#F5F5F5] h-12"
            showBorder={false}
            value={isEdit ? '' : mockData?.header.sheetNo}
            disabled={!isEdit}
          />
        </div>
      </div>

      {/* Strength Increase */}
      <FormSection title="STRENGTH INCREASE">
        <div className="mb-4 w-[20%]">
          <label className="block text-xs font-medium text-gray-700 mb-1">POSTED IN</label>
          {!isEdit ? (
            <div className="w-full px-3 py-2 text-gray-700 bg-gray-50 rounded-md border border-gray-200">
              {strengthIncreaseRank}
            </div>
          ) : (
            <CustomSelect
              value={strengthIncreaseRank}
              onChange={setStrengthIncreaseRank}
              options={rankOptions}
              placeholder="Select rank"
              showGreenBg={true}
            />
          )}
        </div>

        <FormRow>
          <SelectField
            label="RANK"
            value={isEdit ? '' : mockData?.strengthIncrease.rank}
            onChange={() => {}}
            options={rankOptions}
            disabled={!isEdit}
          />
          <InputField
            label="NAME"
            placeholder="Enter full name"
            value={isEdit ? '' : mockData?.strengthIncrease.name}
            disabled={!isEdit}
          />
          <InputField
            label="SERVICE NO."
            placeholder="Service no."
            value={isEdit ? '' : mockData?.strengthIncrease.serviceNo}
            disabled={!isEdit}
          />
        </FormRow>

        <FormRow>
          <InputField
            label="APPOINTMENT"
            placeholder="Appointment"
            value={isEdit ? '' : mockData?.strengthIncrease.appointment}
            disabled={!isEdit}
          />
          <InputField
            label="PREVIOUS UNIT"
            placeholder="Previous unit"
            value={isEdit ? '' : mockData?.strengthIncrease.previousUnit}
            disabled={!isEdit}
          />
          <InputField
            label="EFFECTIVE DATE"
            placeholder="Effective date"
            value={isEdit ? '' : mockData?.strengthIncrease.effectiveDate}
            disabled={!isEdit}
          />
        </FormRow>

        <FormRow>
          <InputField
            label="CORPS"
            placeholder="corps"
            value={isEdit ? '' : mockData?.strengthIncrease.corps}
            disabled={!isEdit}
          />
          <InputField
            label="AUTHORITY"
            placeholder="Authority"
            value={isEdit ? '' : mockData?.strengthIncrease.authority}
            disabled={!isEdit}
          />
        </FormRow>
      </FormSection>

      {/* Strength Decrease */}
      <FormSection title="STRENGTH DECREASE">
        <div className="mb-4 w-[20%]">
          <label className="block text-xs font-medium text-gray-700 mb-1">POSTED OUT</label>
          <CustomSelect
            value={strengthDecreaseRank}
            onChange={setStrengthDecreaseRank}
            options={rankOptions}
            placeholder="Select rank"
            showGreenBg={true}
          />
        </div>

        <FormRow>
          <SelectField label="RANK" value="" onChange={() => {}} options={rankOptions} />
          <InputField label="NAME" placeholder="Enter full name" />
          <InputField label="SERVICE NO." placeholder="Service no." />
        </FormRow>

        <FormRow>
          <InputField label="APPOINTMENT" placeholder="Appointment" />
          <InputField label="PREVIOUS UNIT" placeholder="Previous unit" />
          <InputField label="EFFECTIVE DATE" placeholder="Effective date" />
        </FormRow>

        <FormRow>
          <InputField label="CORPS" placeholder="corps" />
          <InputField label="AUTHORITY" placeholder="Authority" />
        </FormRow>
      </FormSection>

      {/* Pay and Allowance (First Section) */}
      <FormSection title="PAY AND ALLOWANCE">
        <div className="mb-4 w-[20%]">
          <label className="block text-xs font-medium text-gray-700 mb-1">POSTED OUT</label>
          <CustomSelect
            value={payAllowanceRank1}
            onChange={setPayAllowanceRank1}
            options={rankOptions}
            placeholder="Select rank"
          />
        </div>

        <FormRow>
          <SelectField label="RANK" value="" onChange={() => {}} options={rankOptions} />
          <InputField label="NAME" placeholder="Enter full name" />
          <InputField label="SERVICE NO." placeholder="Service no." />
        </FormRow>

        <FormRow>
          <InputField label="APPOINTMENT" placeholder="Appointment" />
          <InputField label="PREVIOUS UNIT" placeholder="Previous unit" />
          <InputField label="EFFECTIVE DATE" placeholder="Effective date" />
        </FormRow>

        <FormRow>
          <InputField label="CORPS" placeholder="corps" />
          <InputField label="AUTHORITY" placeholder="Authority" />
        </FormRow>
      </FormSection>

      {/* Pay and Allowance (Second Section) */}
      <FormSection title="PAY AND ALLOWANCE">
        <div className="mb-4 w-[20%]">
          <label className="block text-xs font-medium text-gray-700 mb-1">FROM</label>
          <CustomSelect
            value={payAllowanceRank2}
            onChange={setPayAllowanceRank2}
            options={rankOptions}
            placeholder="Select rank"
          />
        </div>

        <FormRow>
          <SelectField label="RANK" value="" onChange={() => {}} options={rankOptions} />
          <InputField label="NAME" placeholder="Enter full name" />
          <InputField label="SERVICE NO." placeholder="Service no." />
        </FormRow>

        <FormRow>
          <InputField label="APPOINTMENT" placeholder="Appointment" />
          <InputField label="PREVIOUS UNIT" placeholder="Previous unit" />
          <InputField label="EFFECTIVE DATE" placeholder="Effective date" />
        </FormRow>

        <FormRow>
          <InputField label="CORPS" placeholder="corps" />
          <InputField label="AUTHORITY" placeholder="Authority" />
        </FormRow>
      </FormSection>

      {/* Miscellaneous Entries */}
      <FormSection title="MISCELLANEOUS ENTRIES">
        <div className="mb-4 w-[20%]">
          <label className="block text-xs font-medium text-gray-700 mb-1">FROM</label>
          <CustomSelect
            value={miscellaneousFrom}
            onChange={setMiscellaneousFrom}
            options={miscellaneousOptions}
            placeholder="Select type"
            showGreenBg={true}
          />
        </div>

        <FormRow>
          <SelectField
            label="RANK"
            value={miscellaneousRank}
            onChange={setMiscellaneousRank}
            options={rankOptions}
          />
          <InputField label="NAME" placeholder="Enter full name" />
          <InputField label="SERVICE NO." placeholder="Service no." />
        </FormRow>

        <FormRow>
          <InputField label="APPOINTMENT" placeholder="Appointment" />
          <InputField label="PREVIOUS UNIT" placeholder="Previous unit" />
          <InputField label="EFFECTIVE DATE" placeholder="Effective date" />
        </FormRow>

        <FormRow>
          <InputField label="CORPS" placeholder="corps" />
          <InputField label="AUTHORITY" placeholder="Authority" />
        </FormRow>

        <div className="flex justify-center mt-6">
          <button
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2 rounded-md font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!isEdit}
          >
            Save
          </button>
        </div>
      </FormSection>

      <FormSection title="DISTRIBUTION">
        <div className="flex items-start flex-wrap gap-6">
          {distributionItems.map((item: any) => (
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
