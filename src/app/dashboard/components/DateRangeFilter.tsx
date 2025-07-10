'use client';
import React, { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';

interface DateRangeFilterProps {
  selectedRange: string;
  onRangeChange: (range: string) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ selectedRange, onRangeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dateRanges = [
    'Date range',
    'This week',
    'This month',
    'Last 3 months',
    'Last 6 months',
    'This year',
    'All time'
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <Calendar className="w-4 h-4" />
        <span>{selectedRange}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <div className="py-1">
            {dateRanges.map((range) => (
              <button
                key={range}
                onClick={() => {
                  onRangeChange(range);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                  selectedRange === range ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeFilter;