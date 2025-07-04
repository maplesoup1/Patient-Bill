import React, { useState } from 'react';
import { Search, Phone, MessageSquare, Settings, ChevronDown, Calendar, DollarSign, FileText, Clock, AlertCircle } from 'lucide-react';

// Header Component
const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">B</span>
          </div>
          <span className="text-gray-700 font-medium">Bill</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">John Doe</span>
          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">J</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;