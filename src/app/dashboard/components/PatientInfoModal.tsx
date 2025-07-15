'use client';
import React, { useState } from 'react';
import { X, MessageSquare, PhoneCall, Mail, Clock, User, FileText, Voicemail } from 'lucide-react';
import { Activity, Patient } from '../../../data/types';
import { defaultActivities } from '../../../data/activitiesData';
import { useClickOutside } from '../../../hooks/useClickOutside';

interface PatientInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient;
}

const PatientInfoModal: React.FC<PatientInfoModalProps> = ({ isOpen, onClose, patient }) => {
  const [activityTemplate, setActivityTemplate] = useState('');
  const [contactMethod, setContactMethod] = useState('');
  const [notes, setNotes] = useState('');
  const [activities, setActivities] = useState<Activity[]>(defaultActivities);

  const modalRef = useClickOutside<HTMLDivElement>({
    onClickOutside: onClose,
    enabled: isOpen,
  });

  if (!isOpen) return null;

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'patient_note':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'sms':
        return <MessageSquare className="w-4 h-4 text-green-600" />;
      case 'call':
        return <PhoneCall className="w-4 h-4 text-orange-600" />;
      case 'voicemail':
        return <Voicemail className="w-4 h-4 text-purple-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleAddActivity = () => {
    if (!notes.trim()) return;

    const now = new Date();
    const timestamp = now.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    }) + ' ' + now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const getActivityType = (): Activity['type'] => {
      if (activityTemplate === 'Log Voicemail') return 'voicemail';
      if (activityTemplate === 'Log SMS Sent') return 'sms';
      if (contactMethod === 'phone') return 'call';
      return 'patient_note';
    };

    const getCategory = () => {
      if (activityTemplate === 'Log Voicemail') return 'Voicemail Logged';
      if (activityTemplate === 'Log SMS Sent') return 'SMS Sent';
      if (activityTemplate === 'Callback Request') return 'Callback Request';
      return 'Patient Note';
    };

    const newActivity: Activity = {
      id: Date.now().toString(),
      type: getActivityType(),
      description: notes,
      author: 'Current User',
      timestamp: timestamp,
      category: getCategory()
    };

    setActivities([newActivity, ...activities]);
    setActivityTemplate('');
    setContactMethod('');
    setNotes('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Follow Up History</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Log New Activity</h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-2">Template</p>
                <div className="flex flex-wrap gap-2">
                  {['Log Voicemail', 'Log SMS Sent', 'Callback Request'].map((template) => (
                    <button
                      key={template}
                      onClick={() => setActivityTemplate(template)}
                      className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors ${
                        activityTemplate === template
                          ? 'bg-blue-50 border-blue-300 text-blue-700'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {template}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-2">Contact Method</p>
                <select
                  value={contactMethod}
                  onChange={(e) => setContactMethod(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select</option>
                  <option value="phone">Phone</option>
                  <option value="sms">SMS</option>
                  <option value="email">Email</option>
                  <option value="in_person">In Person</option>
                </select>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-2">Notes</p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter detailed notes about this contact attempt..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleAddActivity}
                  disabled={!notes.trim()}
                  className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Add Log Activity
                </button>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Activity</h3>
            <div className="space-y-3">
              {activities.map((activity) => (
                <div key={activity.id} className="p-3 bg-gray-50 rounded-md">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">{activity.category}</span>
                        <span className="text-sm text-gray-600">{activity.author}</span>
                      </div>
                      <p className="text-sm text-gray-800 mb-1">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfoModal;