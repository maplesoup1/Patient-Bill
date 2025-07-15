'use client'
import React from 'react';

interface FilterTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  patientsCount: number;
  workcoverCount: number;
  othersCount?: number;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ 
  activeTab, 
  onTabChange, 
  patientsCount, 
  workcoverCount, 
  othersCount = 0 
}) => {
    const tabs = [
      { name: 'Patients', count: patientsCount },
      { name: 'Workcover', count: workcoverCount },
      { name: 'Others', count: othersCount }
    ];
  
    return (
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => onTabChange(tab.name)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab.name
                ? 'text-gray-900 bg-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.name} <span className="ml-1 text-gray-500">{tab.count}</span>
          </button>
        ))}
      </div>
    );
  };

export default FilterTabs;