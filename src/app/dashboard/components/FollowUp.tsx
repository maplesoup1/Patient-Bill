'use client';
import React, { useState } from 'react';
import { X, MessageSquare, Mail, XCircle, CheckCircle } from 'lucide-react';

interface Patient {
  name: string;
  phone: string;
  appointment: string;
  amount: number;
  status: string;
}

interface FollowUpProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient;
}

const FollowUp: React.FC<FollowUpProps> = ({ isOpen, onClose, patient }) => {
  const [callNotes, setCallNotes] = useState('');
  const [enableAICalls, setEnableAICalls] = useState(true);
  const [callOutcome, setCallOutcome] = useState<'failed' | 'success' | null>(null);

  if (!isOpen) return null;

  const handleSendSMS = () => {
    console.log('Sending SMS payment link');
  };

  const handleSendEmail = () => {
    console.log('Sending Email payment link');
  };

  const handleMarkFailed = () => {
    setCallOutcome('failed');
  };

  const handleMarkSuccess = () => {
    setCallOutcome('success');
  };

  const handleSaveChanges = () => {
    console.log('Saving changes:', {
      callNotes,
      enableAICalls,
      callOutcome
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Follow Up {patient.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
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
                <span className="text-orange-600 bg-orange-50 px-2 py-1 rounded text-sm font-medium">
                  {patient.status}
                </span>
              </div>
            )}
          </div>

          {/* Send Payment Link */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Send Payment Link</h3>
            <div className="flex space-x-2">
              <button
                onClick={handleSendSMS}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <MessageSquare className="w-4 h-4" />
                <span>SMS</span>
              </button>
              <button
                onClick={handleSendEmail}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </button>
            </div>
          </div>

          {/* Call Notes */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Call Notes</h3>
            <textarea
              value={callNotes}
              onChange={(e) => setCallNotes(e.target.value)}
              placeholder="Enter notes about the call conversation, patient response, payment arrangements, etc..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
            />
          </div>

          {/* Enable Veronica AI Call */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900">Enable Veronica AI Call</h3>
              <button
                onClick={() => setEnableAICalls(!enableAICalls)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  enableAICalls ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    enableAICalls ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Veronica AI will follow up with the patient via automated calls.{' '}
              <button className="text-blue-600 hover:text-blue-800 underline">
                Click here to set follow-up rules
              </button>
            </p>
            
            {enableAICalls && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                <p className="text-sm text-blue-800">
                  Veronica AI will automatically call the patient starting 48 hours after the appointment, 
                  repeating every 72 hours with up to 3 attempts.
                </p>
              </div>
            )}
          </div>

          {/* Call Outcomes */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Call Outcomes</h3>
            
            {callOutcome === 'failed' && (
              <div className="flex items-center space-x-2 text-red-600">
                <XCircle className="w-4 h-4" />
                <span className="text-sm">This call marked as failed</span>
              </div>
            )}
            
            {callOutcome === 'success' && (
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">This call marked as success</span>
              </div>
            )}
            
            {!callOutcome && (
              <p className="text-sm text-gray-500">No outcome recorded yet</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center gap-4">
            <div className="flex space-x-2">
              <button
                onClick={handleMarkFailed}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-700 bg-white border border-red-300 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <XCircle className="w-4 h-4" />
                <span>Mark as Failed</span>
              </button>
              <button
                onClick={handleMarkSuccess}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-green-700 bg-white border border-green-300 rounded-md hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Mark as Success</span>
              </button>
            </div>

            <button
              onClick={handleSaveChanges}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowUp;