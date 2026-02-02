import React, { useState, memo } from 'react';

export const InputField = memo(
  ({
    label = '',
    placeholder = '',
    type = 'text',
    className = '',
    labelClass = '',
    showBorder = true,
    value = '',
    onChange,
    disabled = false
  }: {
    label?: string;
    placeholder?: string;
    type?: string;
    className?: string;
    labelClass?: string;
    showBorder?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
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
          value={value || ''}
          onChange={onChange}
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
  )
);

InputField.displayName = 'InputField';

export const CustomSelect = memo(
  ({
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
  }
);

CustomSelect.displayName = 'CustomSelect';

export const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h3 className="text-sm font-semibold text-gray-700 mb-4 border-b border-gray-300 pb-2">
      {title}
    </h3>
    {children}
  </div>
);

export const FormRow = ({
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
