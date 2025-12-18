'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Search } from "lucide-react"

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownGroup {
  label: string;
  options: DropdownOption[];
}

interface DropdownMenuProps {
  groups?: DropdownGroup[];
  options?: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function DropdownMenu({ 
  groups = [],
  options = [],
  value = '',
  onChange,
  placeholder = 'Select',
  className = ""
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Flatten all options for finding selected option
  const allOptions = [
    ...options,
    ...groups.flatMap(group => group.options)
  ];
  
  const totalItemCount = allOptions.length;
  const showSearch = totalItemCount > 20;
  
  // Filter options based on search term
  const filteredOptions = options.filter(option => 
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredGroups = groups.map(group => ({
    ...group,
    options: group.options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(group => group.options.length > 0);
  
  const selectedOption = allOptions.find(option => option.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm(''); // Reset search when opening
    }
  };

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const renderOption = (option: DropdownOption) => (
    <li 
      key={option.value}
      onClick={() => handleSelect(option.value)}
      className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-blue-400 transition-colors"
    >
      {option.label}
    </li>
  );

  const renderGroup = (group: DropdownGroup, index: number) => (
    <li key={group.label}>
      <div className="px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wide bg-gray-50 dark:bg-blue-200">
        {group.label}
      </div>
      <ul>
        {group.options.map(option => renderOption(option))}
      </ul>
      {index < groups.length - 1 && (
        <hr className="border-gray-200 dark:border-gray-500" />
      )}
    </li>
  );

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center border bg-white border-gray-300 dark:bg-black dark:border-gray-700 rounded-sm overflow-hidden">
        <span className="block flex-1 px-3 py-2">{displayLabel}</span>
        <button
          type="button"
          onClick={handleToggle}
          className="px-3 py-2 cursor-pointer hover:opacity-60"
        >
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-white dark:bg-black rounded-sm shadow-lg border border-gray-200 dark:border-gray-600">
          {/* Search field for large lists */}
          {showSearch && (
            <div className="sticky top-0 p-2 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-black">
              <div className="flex items-center gap-2 px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-sm">
                <Search size={14} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search options..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 text-sm bg-transparent border-none outline-none"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}
          
          <ul className="max-h-60 overflow-y-auto">
            {/* Show "no results" message when search yields no results */}
            {showSearch && searchTerm && filteredOptions.length === 0 && filteredGroups.length === 0 && (
              <li className="px-3 py-4 text-center text-gray-500 dark:text-gray-400">
                No options found for "{searchTerm}"
              </li>
            )}
            
            {/* Render filtered flat options */}
            {filteredOptions.map(option => renderOption(option))}
            
            {/* Add separator if both flat options and groups exist */}
            {filteredOptions.length > 0 && filteredGroups.length > 0 && (
              <hr className="border-gray-200 dark:border-gray-500" />
            )}
            
            {/* Render filtered grouped options */}
            {filteredGroups.map((group, index) => renderGroup(group, index))}
          </ul>
        </div>
      )}
    </div>
  );
}