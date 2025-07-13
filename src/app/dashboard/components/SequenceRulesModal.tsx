'use client';
import React, { useState } from 'react';
import { X, Clock, ChevronDown } from 'lucide-react';
import { WorkCoverInvoice } from '../../../data/types';
import { useClickOutside } from '../../../hooks/useClickOutside';

interface SequenceRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: WorkCoverInvoice;
}

const SequenceRulesModal: React.FC<SequenceRulesModalProps> = ({ isOpen, onClose, invoice }) => {
  const [initialDelay, setInitialDelay] = useState(9);
  const [repeatInterval, setRepeatInterval] = useState(14);
  const [maxAttempts, setMaxAttempts] = useState(3);

  const modalRef = useClickOutside<HTMLDivElement>({
    onClickOutside: onClose,
    enabled: isOpen,
  });

  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const getOverdueText = () => {
    if (invoice.overdueDays && invoice.overdueDays > 0) {
      return `${invoice.overdueDays} days overdue`;
    }
    return 'On time';
  };

  const handleSaveRules = () => {
    console.log('Saving follow-up rules:', {
      invoice: invoice.id,
      initialDelay,
      repeatInterval,
      maxAttempts
    });
    onClose();
  };

  const CustomDropdown = ({ 
    value, 
    onChange, 
    options, 
    suffix 
  }: { 
    value: number; 
    onChange: (value: number) => void; 
    options: number[]; 
    suffix: string 
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded bg-white text-sm hover:bg-gray-50 min-w-16 justify-between"
        >
          <span className="font-medium">{value}</span>
          <ChevronDown className="w-3 h-3" />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 min-w-16">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Configure Follow-up Rules</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-gray-600 mb-6">
            Set automatic follow-up logic for unpaid invoices.
          </p>

          {/* Workcover Information */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Workcover Information</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Name</p>
                  <p className="text-sm font-medium text-gray-900">{invoice.patient}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Phone</p>
                  <p className="text-sm text-gray-700">+61 400 123 456</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Invoice Date</p>
                  <div>
                    <p className="text-sm text-gray-700">{formatDate(invoice.invoiceCreatedDate)}</p>
                    <p className="text-xs text-red-600">{getOverdueText()}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Amount</p>
                  <p className="text-sm font-semibold text-gray-900">${invoice.amount.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timing Rules */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Timing</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 flex-1">Send initial email after</span>
                <div className="flex items-center space-x-2">
                  <CustomDropdown
                    value={initialDelay}
                    onChange={setInitialDelay}
                    options={[1, 3, 5, 7, 9, 14, 21, 30]}
                    suffix=""
                  />
                  <span className="text-sm text-gray-600 min-w-12">days</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 flex-1">Repeat every</span>
                <div className="flex items-center space-x-2">
                  <CustomDropdown
                    value={repeatInterval}
                    onChange={setRepeatInterval}
                    options={[7, 14, 21, 30]}
                    suffix=""
                  />
                  <span className="text-sm text-gray-600 min-w-12">days</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 flex-1">Stop follow-ups after</span>
                <div className="flex items-center space-x-2">
                  <CustomDropdown
                    value={maxAttempts}
                    onChange={setMaxAttempts}
                    options={[1, 2, 3, 4, 5]}
                    suffix=""
                  />
                  <span className="text-sm text-gray-600 min-w-16">attempts</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Close
          </button>
          <button
            onClick={handleSaveRules}
            className="px-6 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-900"
          >
            Save rules
          </button>
        </div>
      </div>
    </div>
  );
};

export default SequenceRulesModal;