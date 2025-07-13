'use client';
import React, { useState } from 'react';
import { X, Mail, Paperclip } from 'lucide-react';
import { WorkCoverInvoice } from '../../../data/types';
import { useClickOutside } from '../../../hooks/useClickOutside';

interface ActionEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: WorkCoverInvoice;
}

const ActionEmailModal: React.FC<ActionEmailModalProps> = ({ isOpen, onClose, invoice }) => {
  const [attachment, setAttachment] = useState<File | null>(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const [subject, setSubject] = useState(`Outstanding Invoice for ${invoice.patient}`);
  const [message, setMessage] = useState(`Dear ${invoice.caseManager},

This is a follow-up regarding invoice ${invoice.id} for ${invoice.patient}, dated ${invoice.invoiceCreatedDate}, amounting to $${invoice.amount.toFixed(2)}.

Please advise on payment status.

Thank you.`);

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

  const getCaseManagerEmail = () => {
    const name = invoice.caseManager.toLowerCase().replace(' ', '.');
    const provider = invoice.workcoverProvider.toLowerCase().replace(' ', '').replace('workcover', '');
    return `${name}@workcover.${provider}.gov.au`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachment(file);
      setSelectedSuggestion(null);
    }
  };

  const handleSuggestionSelect = (suggestionPath: string) => {
    setSelectedSuggestion(suggestionPath);
    setAttachment(null);
  };

  const getSuggestedAttachments = () => {
    return [
      {
        name: `${invoice.id}.pdf`,
        path: `D:/ClinicDocs/Invoices/Workcover/${invoice.id}.pdf`,
        source: 'Auto-suggested from Best Practice system',
        suggestedBy: 'System'
      },
      {
        name: `${invoice.id}.pdf`,
        path: `D:/ClinicDocs/Invoices/Workcover/${invoice.id}.pdf`,
        source: 'Suggested by Corina from local folder',
        suggestedBy: 'Corina'
      }
    ];
  };

  const handleSendEmail = () => {
    console.log('Sending email:', {
      invoice: invoice.id,
      to: getCaseManagerEmail(),
      subject,
      message,
      attachment: attachment?.name || selectedSuggestion
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Send Follow-up Email</h2>
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
            Send a follow-up email to the case manager regarding the outstanding invoice.
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

          {/* Email Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <input
                type="email"
                value={getCaseManagerEmail()}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Attachment</label>
              
              {/* Suggested Attachments */}
              <div className="mb-4">
                {getSuggestedAttachments().map((suggestion, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-blue-50">
                      <div className="flex items-center space-x-2">
                        <Paperclip className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{suggestion.name}</p>
                          <p className="text-xs text-gray-500">{suggestion.source}</p>
                          <p className="text-xs text-gray-400">{suggestion.path}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSuggestionSelect(suggestion.path)}
                        className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                          selectedSuggestion === suggestion.path
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        {selectedSuggestion === suggestion.path ? 'Added' : 'Add as attachment'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Manual File Upload */}
              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 text-sm">
                  <Paperclip className="w-4 h-4 text-gray-500" />
                  <span>Select file</span>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                  />
                </label>
                {attachment && (
                  <span className="text-sm text-gray-600">
                    {attachment.name}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSendEmail}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center space-x-2"
          >
            <Mail className="w-4 h-4" />
            <span>Send Email</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionEmailModal;