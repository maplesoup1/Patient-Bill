'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import e from 'express';

const TimePeriodSelector = ({ selectedFilter, setSelectedFilter }: { selectedFilter: string, setSelectedFilter: (value: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const options = ['This month', 'Last month', 'Last 3 months', 'This year'];
  
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          <span>{selectedFilter}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSelectedFilter(option);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  export default TimePeriodSelector;