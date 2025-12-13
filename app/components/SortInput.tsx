'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from "lucide-react"

interface SortOption {
  label: string;
  value: string;
}

interface SortInputProps {
  options?: SortOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const DEFAULT_OPTIONS: SortOption[] = [
  { label: 'A-Z', value: 'asc' },
  { label: 'Z-A', value: 'desc' },
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' }
];

export default function SortInput({ 
  options = DEFAULT_OPTIONS,
  value = '',
  onChange,
  className = ""
}: SortInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedOption = options.find(option => option.value === value);
  const displayLabel = selectedOption ? selectedOption.label : 'Sort';

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center text-black bg-white dark:bg-blue-300 rounded-sm overflow-hidden">
        <span className="px-3 py-2">{displayLabel}</span>
        <button
          type="button"
          onClick={handleToggle}
          className="px-3 py-2 cursor-pointer hover:opacity-80"
        >
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
      
      {isOpen && (
        <ul className="absolute top-full left-0 right-0 z-10 mt-1 text-black bg-white dark:bg-blue-300 rounded-sm shadow-lg border border-gray-200 dark:border-gray-600">
          {options.map((option) => (
            <li 
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-blue-400 transition-colors"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}