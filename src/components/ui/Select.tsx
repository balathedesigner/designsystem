import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  isMulti?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;
  hasError?: boolean;
  hasSuccess?: boolean;
  options: SelectOption[];
  placeholder?: string;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 text-sm',
  md: 'h-10 text-base',
  lg: 'h-12 text-lg'
};

const variantClasses = {
  default: 'bg-white border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500',
  outlined: 'bg-transparent border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500',
  filled: 'bg-gray-50 border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-blue-500'
};

export const Select: React.FC<SelectProps> = ({
  variant = 'default',
  size = 'md',
  isMulti = false,
  isSearchable = false,
  isClearable = false,
  isDisabled = false,
  hasError = false,
  hasSuccess = false,
  options,
  placeholder = 'Select an option...',
  value,
  onChange,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValues(Array.isArray(value) ? value : [value]);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (optionValue: string) => {
    let newValues: string[];
    if (isMulti) {
      newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter(v => v !== optionValue)
        : [...selectedValues, optionValue];
    } else {
      newValues = [optionValue];
      setIsOpen(false);
    }
    setSelectedValues(newValues);
    onChange?.(isMulti ? newValues : newValues[0]);
  };

  const handleClear = () => {
    setSelectedValues([]);
    onChange?.(isMulti ? [] : '');
  };

  const getDisplayValue = () => {
    if (selectedValues.length === 0) return placeholder;
    if (isMulti) {
      const selectedLabels = selectedValues
        .map(v => options.find(o => o.value === v)?.label)
        .filter(Boolean);
      return selectedLabels.join(', ');
    }
    return options.find(o => o.value === selectedValues[0])?.label || placeholder;
  };

  return (
    <div
      ref={wrapperRef}
      className={cn(
        'relative w-full',
        isDisabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between w-full px-3 border rounded-md transition-colors',
          sizeClasses[size],
          variantClasses[variant],
          hasError && 'border-red-500 focus:border-red-500 focus:ring-red-500',
          hasSuccess && 'border-green-500 focus:border-green-500 focus:ring-green-500',
          isOpen && 'ring-2 ring-blue-500 border-blue-500'
        )}
        onClick={() => !isDisabled && setIsOpen(!isOpen)}
      >
        <div className="flex-1 truncate">
          {isSearchable && isOpen ? (
            <input
              type="text"
              className="w-full bg-transparent outline-none"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onClick={e => e.stopPropagation()}
              placeholder={placeholder}
            />
          ) : (
            <span className={cn(
              'text-gray-500',
              selectedValues.length > 0 && 'text-gray-900'
            )}>
              {getDisplayValue()}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isClearable && selectedValues.length > 0 && (
            <X
              className="h-4 w-4 text-gray-400 hover:text-gray-600"
              onClick={e => {
                e.stopPropagation();
                handleClear();
              }}
            />
          )}
          <ChevronDown
            className={cn(
              'h-4 w-4 text-gray-400 transition-transform',
              isOpen && 'transform rotate-180'
            )}
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="max-h-60 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => (
                <div
                  key={option.value}
                  className={cn(
                    'px-3 py-2 cursor-pointer hover:bg-gray-100',
                    selectedValues.includes(option.value) && 'bg-blue-50 hover:bg-blue-100'
                  )}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500">No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 