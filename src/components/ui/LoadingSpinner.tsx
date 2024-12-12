import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const sizes = {
  small: 'w-4 h-4',
  medium: 'w-8 h-8',
  large: 'w-12 h-12'
};

export function LoadingSpinner({ size = 'medium', className = '' }: LoadingSpinnerProps) {
  return (
    <div className={`${sizes[size]} ${className}`}>
      <div className="w-full h-full border-2 border-gray-200 border-t-primary-500 rounded-full animate-spin" />
    </div>
  );
}