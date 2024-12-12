import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface FormTextAreaProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}

export function FormTextArea({
  label,
  name,
  register,
  error,
  placeholder,
  rows = 3,
  required = false
}: FormTextAreaProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        {...register(name)}
        rows={rows}
        placeholder={placeholder}
        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}