'use client';
import React, { useState } from 'react';
import { X, ChevronDown, MessageSquare, Phone, Mail, Clock, AlertCircle, Plus } from 'lucide-react';
import { useClickOutside } from '../../../hooks/useClickOutside';

interface Patient {
  name: string;
  phone: string;
  appointment: string;
  amount: number;
  status: string;
  invoiceId?: string;
}

interface SetRulesProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient;
  invoiceId?: string;
}

const SetRules: React.FC<SetRulesProps> = ({ isOpen, onClose, patient, invoiceId }) => {
  const [enableAutomation, setEnableAutomation] = useState(true);
  const [activateSequence, setActivateSequence] = useState(true);
  const [aiCallDays, setAiCallDays] = useState(5);
  const [reminderHours, setReminderHours] = useState(48);

  const modalRef = useClickOutside<HTMLDivElement>({
    onClickOutside: onClose,
    enabled: isOpen,
  });
  const [skipWeekends, setSkipWeekends] = useState(true);

  if (!isOpen) return null;

  const handleSaveChanges = () => {
    console.log('Saving rules:', {
      enableAutomation,
      activateSequence,
      aiCallDays,
      reminderHours,
      skipWeekends
    });
    onClose();
  };

  const CustomDropdown = ({ value, onChange, options, suffix }: { value: number; onChange: (value: number) => void; options: number[]; suffix: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="relative flex items-center space-x-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1 px-2 py-1 border border-gray-300 rounded bg-gray-50 text-sm hover:bg-gray-100"
        >
          <span className="font-medium">{value}</span>
          <ChevronDown className="w-3 h-3" />
        </button>
        <span className="text-sm text-gray-600">{suffix}</span>
        
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
          <h2 className="text-lg font-semibold text-gray-900">Set Sequence</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Patient Information</h3>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Name</p>
                  <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Service Date</p>
                  <p className="text-sm text-gray-700">{patient.appointment}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Invoice ID</p>
                  <p className="text-sm text-gray-700 font-mono">{invoiceId || 'INV-2024-001'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Invoice Amount</p>
                  <p className="text-sm font-semibold text-gray-900">${patient.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Phone</p>
                  <p className="text-sm text-gray-700">{patient.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">
                    {patient.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Enable automation for this invoice</h3>
                <p className="text-xs text-gray-500 mt-1">Activate all automation sequence below</p>
              </div>
              <button
                onClick={() => setEnableAutomation(!enableAutomation)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  enableAutomation ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    enableAutomation ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            {enableAutomation && (
              <div className="mt-3 p-3 bg-blue-50 rounded-md">
                <p className="text-xs text-blue-700">✓ Automation is enabled for this invoice</p>
              </div>
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900">Automation Sequence</h3>
              <button className="text-xs text-blue-600 hover:text-blue-800 underline">
                To edit sequence, click here to open Settings.
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-900">Schedule AI phone call after</span>
                  <div className="flex items-center space-x-1">
                    <CustomDropdown
                      value={aiCallDays}
                      onChange={setAiCallDays}
                      options={[1, 2, 3, 4, 5, 6, 7, 10, 14]}
                      suffix="days"
                    />
                  </div>
                </div>
                <button 
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => {/* Remove this rule */}}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-900">Send reminder SMS after</span>
                  <div className="flex items-center space-x-1">
                    <CustomDropdown
                      value={reminderHours}
                      onChange={setReminderHours}
                      options={[24, 48, 72, 96, 120]}
                      suffix="hours"
                    />
                  </div>
                </div>
                <button 
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => {/* Remove this rule */}}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200">
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-900">Skip weekends</span>
                </div>
                <button
                  onClick={() => setSkipWeekends(!skipWeekends)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    skipWeekends ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      skipWeekends ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="pt-2">
                <button className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800">
                  <Plus className="w-4 h-4" />
                  <span>Add Rules</span>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3 text-gray-500">
              <MessageSquare className="w-5 h-5" />
              <span className="text-sm">Send SMS reminder</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-500">
              <Phone className="w-5 h-5" />
              <span className="text-sm">Schedule AI phone call</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-500">
              <Mail className="w-5 h-5" />
              <span className="text-sm">Send email reminder</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-500">
              <Clock className="w-5 h-5" />
              <span className="text-sm">Skip weekends</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-500">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">Stop after failed attempts</span>
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
            onClick={handleSaveChanges}
            className="px-6 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-900"
          >
            Save Automation Rules
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetRules;