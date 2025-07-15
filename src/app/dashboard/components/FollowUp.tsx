'use client';
import React, { useState } from 'react';
import { X, MessageSquare, Mail, Phone, Zap, XCircle, CheckCircle, Copy, Clock, ChevronDown } from 'lucide-react';
import { useClickOutside } from '../../../hooks/useClickOutside';

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
  const [selectedFollowUp, setSelectedFollowUp] = useState<'sms' | 'email' | 'phone' | 'ai'>('sms');
  const [sendTime, setSendTime] = useState('Send now');
  const [repeatFrequency, setRepeatFrequency] = useState('Every week');
  const [message, setMessage] = useState('Hi {{patientName}}, this is a reminder to complete your payment of {{amount}} for your appointment on {{date}}. You can pay using the link below.');
  const [callNotes, setCallNotes] = useState('');
  const [callOutcome, setCallOutcome] = useState<'failed' | 'success' | null>(null);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showRepeatDropdown, setShowRepeatDropdown] = useState(false);

  const modalRef = useClickOutside<HTMLDivElement>({
    onClickOutside: onClose,
    enabled: isOpen,
  });

  const stripePaymentLink = 'https://pay.stripe.com/invoice/test_inv_1H...';

  const timeOptions = [
    'Send now',
    'Send in 1 hour',
    'Send in 2 hours',
    'Send in 6 hours',
    'Send tomorrow',
    'Send in 3 days',
    'Send in 1 week'
  ];

  const repeatOptions = [
    'Never',
    'Every day',
    'Every 2 days',
    'Every 3 days',
    'Every week',
    'Every 2 weeks',
    'Every month'
  ];

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(stripePaymentLink);
  };

  const handleMarkFailed = () => {
    setCallOutcome('failed');
  };

  const handleMarkSuccess = () => {
    setCallOutcome('success');
  };

  const handleSend = () => {
    console.log('Sending follow-up:', {
      type: selectedFollowUp,
      sendTime,
      repeatFrequency,
      message,
      callNotes,
      callOutcome
    });
    onClose();
  };

  const isAICallSelected = selectedFollowUp === 'ai';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Follow Up {patient.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
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

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Follow-up with</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedFollowUp('sms')}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                  selectedFollowUp === 'sms'
                    ? 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>SMS</span>
              </button>
              <button
                onClick={() => setSelectedFollowUp('email')}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                  selectedFollowUp === 'email'
                    ? 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </button>
              <button
                onClick={() => setSelectedFollowUp('phone')}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                  selectedFollowUp === 'phone'
                    ? 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>Phone</span>
              </button>
              <button
                onClick={() => setSelectedFollowUp('ai')}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                  selectedFollowUp === 'ai'
                    ? 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>Schedule AI Call</span>
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              When should this be sent?
            </label>
            <div className="relative">
              <button
                onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left flex items-center justify-between focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <span className="text-sm text-gray-700">{sendTime}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              {showTimeDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {timeOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSendTime(option);
                        setShowTimeDropdown(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 focus:bg-gray-50"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Repeat follow-up
            </label>
            <div className="relative">
              <button
                onClick={() => setShowRepeatDropdown(!showRepeatDropdown)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left flex items-center justify-between focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <span className="text-sm text-gray-700">{repeatFrequency}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              {showRepeatDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {repeatOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setRepeatFrequency(option);
                        setShowRepeatDropdown(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 focus:bg-gray-50"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {!isAICallSelected && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
              />
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Stripe Payment Link
            </label>
            <div className="flex">
              <input
                type="text"
                value={stripePaymentLink}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-sm text-gray-600"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-2 bg-white border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <Copy className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          {repeatFrequency !== 'Don\'t repeat' && (
            <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800">
                Bill will be sent immediately, and repeated every 7 days until the payment is completed or the rule is disabled.
              </p>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Call Outcomes</h3>
            <div className="flex space-x-2">
              <button
                onClick={handleMarkFailed}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                  callOutcome === 'failed'
                    ? 'bg-red-50 border-red-300 text-red-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <XCircle className="w-4 h-4" />
                <span>Mark as Failed</span>
              </button>
              <button
                onClick={handleMarkSuccess}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                  callOutcome === 'success'
                    ? 'bg-green-50 border-green-300 text-green-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>Mark as Success</span>
              </button>
            </div>
          </div>

          <div className="mb-6">
            <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800">
              <Clock className="w-4 h-4" />
              <span>Follow-up History</span>
            </button>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              Close
            </button>
            <button
              onClick={handleSend}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowUp;