'use client';
import React, { useState } from 'react';
import { ChevronDown, Clock } from 'lucide-react';

interface OverdueByFilterProps {
  selectedOverdue: string;
  onOverdueChange: (overdue: string) => void;
}

const OverdueByFilter: React.FC<OverdueByFilterProps> = ({ selectedOverdue, onOverdueChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const overdueOptions = [
    'Overdue by',
    '20-60 days overdue',
    '60-90 days overdue',
    'More than 90 days overdue'
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <Clock className="w-4 h-4" />
        <span>{selectedOverdue}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <div className="py-1">
            {overdueOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onOverdueChange(option);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                  selectedOverdue === option ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OverdueByFilter;