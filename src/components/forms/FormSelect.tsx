import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface FormSelectProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  options: { value: string; label: string }[];
  error?: string;
  required?: boolean;
}

export function FormSelect({
  label,
  name,
  register,
  options,
  error,
  required = false
}: FormSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        {...register(name)}
        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
      >
        <option value="">Select an option</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}