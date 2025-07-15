'use client';
import React from 'react';
import DateRangeFilter from './DateRangeFilter';
import OverdueByFilter from './OverdueByFilter';

interface TimePeriodSelectorProps {
  selectedFilter: string;
  setSelectedFilter: (value: string) => void;
  selectedOverdue?: string;
  setSelectedOverdue?: (value: string) => void;
}

const TimePeriodSelector: React.FC<TimePeriodSelectorProps> = ({ 
  selectedFilter, 
  setSelectedFilter,
  selectedOverdue = 'Overdue by',
  setSelectedOverdue 
}) => {
  const handleOverdueChange = (overdue: string) => {
    if (setSelectedOverdue) {
      setSelectedOverdue(overdue);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <DateRangeFilter 
        selectedRange={selectedFilter}
        onRangeChange={setSelectedFilter}
      />
      <OverdueByFilter 
        selectedOverdue={selectedOverdue}
        onOverdueChange={handleOverdueChange}
      />
    </div>
  );
};

  export default TimePeriodSelector;