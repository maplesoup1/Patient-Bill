'use client'
import React, { useState } from 'react';

const FilterTabs = () => {
    const [activeTab, setActiveTab] = useState('Patients');
    
    const tabs = [
      { name: 'Patients', count: 8 },
      { name: 'Workcover', count: 7 },
      { name: 'Others', count: 0 }
    ];
  
    return (
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
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