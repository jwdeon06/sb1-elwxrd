import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface FormInputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  type?: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

export function FormInput({
  label,
  name,
  register,
  type = 'text',
  error,
  placeholder,
  required = false
}: FormInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}