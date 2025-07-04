'use client';
import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

interface Patient {
  name: string;
  phone: string;
  appointment: string;
  amount: number;
  status: string;
}

interface SetRulesProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient;
}

const SetRules: React.FC<SetRulesProps> = ({ isOpen, onClose, patient }) => {
  const [initialDelay, setInitialDelay] = useState('');
  const [reminderFrequency, setReminderFrequency] = useState('');
  const [maxCallAttempts, setMaxCallAttempts] = useState('');
  const [skipWeekends, setSkipWeekends] = useState(true);

  if (!isOpen) return null;

  const handleSaveChanges = () => {
    console.log('Saving rules:', {
      initialDelay,
      reminderFrequency,
      maxCallAttempts,
      skipWeekends
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Set rules</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Patient Information */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Patient Information</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Name</p>
                <p className="text-sm font-medium text-gray-900">{patient.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Phone</p>
                <p className="text-sm text-gray-700">{patient.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Appointment</p>
                <p className="text-sm text-gray-700">{patient.appointment}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Amount</p>
                <p className="text-sm font-medium text-gray-900">${patient.amount.toFixed(2)}</p>
              </div>
            </div>

            {patient.status.includes('overdue') && (
              <div className="mt-3">
                <span className="text-orange-600 bg-orange-50 px-2 py-1 rounded text-sm">
                  {patient.status}
                </span>
              </div>
            )}
          </div>

          {/* Timing */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Timing</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Initial delay after appointment</label>
                <div className="relative">
                  <select
                    value={initialDelay}
                    onChange={(e) => setInitialDelay(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="">Select delay</option>
                    <option value="24">24 hours</option>
                    <option value="48">48 hours</option>
                    <option value="72">72 hours</option>
                    <option value="168">1 week</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Reminder frequency</label>
                <div className="relative">
                  <select
                    value={reminderFrequency}
                    onChange={(e) => setReminderFrequency(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="">Select frequency</option>
                    <option value="daily">Daily</option>
                    <option value="every2days">Every 2 days</option>
                    <option value="every3days">Every 3 days</option>
                    <option value="weekly">Weekly</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Max. Call Attempts</label>
                <div className="relative">
                  <select
                    value={maxCallAttempts}
                    onChange={(e) => setMaxCallAttempts(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="">Select attempts</option>
                    <option value="1">1 attempt</option>
                    <option value="2">2 attempts</option>
                    <option value="3">3 attempts</option>
                    <option value="5">5 attempts</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-700">Skip weekends</label>
                <button
                  onClick={() => setSkipWeekends(!skipWeekends)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    skipWeekends ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      skipWeekends ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Rule Summary */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Rule Summary</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <ol className="space-y-2 text-sm text-gray-700">
                <li>1. Initial SMS after 48 hours</li>
                <li>2. Reception call if no response in 72 hours</li>
                <li>3. AI call scheduled after 1 week</li>
                <li>4. Skip weekend contacts</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Close
          </button>
          <button
            onClick={handleSaveChanges}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-900"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetRules;