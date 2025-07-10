'use client';
import React, { useState } from 'react';
import { Settings, DollarSign } from 'lucide-react';
import { WorkCoverInvoice } from '../../../data/types';
import ActionEmailModal from './ActionEmailModal';
import SequenceRulesModal from './SequenceRulesModal';
import MarkAsPaidModal from './MarkAsPaidModal';

interface WorkCoverRowProps {
  invoice: WorkCoverInvoice;
  index: number;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
}

const WorkCoverRow: React.FC<WorkCoverRowProps> = ({ invoice, index }) => {
  const [remittanceChecked, setRemittanceChecked] = useState(false);
  const [isActionEmailOpen, setIsActionEmailOpen] = useState(false);
  const [isSequenceRulesOpen, setIsSequenceRulesOpen] = useState(false);
  const [isMarkAsPaidOpen, setIsMarkAsPaidOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const getDueDateDisplay = () => {
    if (invoice.overdueDays && invoice.overdueDays > 0) {
      return (
        <div>
          <div className="font-medium text-gray-900">{formatDate(invoice.dueDate)}</div>
          <div className="text-xs text-red-600">{invoice.overdueDays} days overdue</div>
        </div>
      );
    }
    return <div className="text-sm text-gray-900">{formatDate(invoice.dueDate)}</div>;
  };

  const getPaymentStatusBadge = (status: string) => {
    if (status === 'Unpaid') {
      return <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Unpaid</span>;
    } else if (status.includes('overdue')) {
      return <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">{status}</span>;
    } else if (status === 'Paid') {
      return <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Paid</span>;
    }
    return <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">{status}</span>;
  };

  const getCommunicationStatusBadge = (status: string) => {
    const colorMap: { [key: string]: string } = {
      'Will be paid by 30th Oct': 'bg-blue-100 text-blue-800',
      'Waiting for response': 'bg-orange-100 text-orange-800',
      'AI Call Scheduled': 'bg-purple-100 text-purple-800',
      'Follow up in Progress': 'bg-yellow-100 text-yellow-800',
      'Awaiting Remittance': 'bg-green-100 text-green-800',
      'Payment Scheduled 2 Nov': 'bg-blue-100 text-blue-800',
      'Status Confirmed via Email': 'bg-green-100 text-green-800',
      'Paid Remittance Received': 'bg-green-100 text-green-800',
      'Scheduled': 'bg-blue-100 text-blue-800',
      'Documentation required': 'bg-orange-100 text-orange-800',
      'In progress': 'bg-blue-100 text-blue-800',
      'Follow up required': 'bg-red-100 text-red-800',
      'Completed': 'bg-green-100 text-green-800'
    };
    
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${colorMap[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const handleMarkAsPaid = () => {
    setIsMarkAsPaidOpen(true);
  };

  const handleAction = () => {
    setIsActionEmailOpen(true);
  };

  const handleSequence = () => {
    setIsSequenceRulesOpen(true);
  };

  const handleRemittanceChange = (checked: boolean) => {
    setRemittanceChecked(checked);
    console.log(`Remittance ${checked ? 'checked' : 'unchecked'} for invoice ${invoice.id}`);
  };

  const getRowBgColor = () => {
    if (invoice.paymentStatus === 'Overdue' || invoice.paymentStatus.includes('overdue')) return 'bg-red-50';
    if (invoice.paymentStatus === 'Paid') return 'bg-green-50';
    return 'hover:bg-gray-50';
  };

  return (
    <tr className={getRowBgColor()}>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
        {index + 1}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {invoice.id}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
        {invoice.patient}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
        {invoice.serviceProvider}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
        {invoice.workcoverProvider}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
        {invoice.caseManager}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
        {formatDate(invoice.invoiceCreatedDate)}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
        {getDueDateDisplay()}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
        ${invoice.amount.toFixed(2)}
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        {getCommunicationStatusBadge(invoice.communicationStatus)}
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        {getPaymentStatusBadge(invoice.paymentStatus)}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={remittanceChecked}
              onChange={(e) => handleRemittanceChange(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label className="ml-1 text-xs text-gray-700">Remittance</label>
          </div>
          
          <button
            onClick={handleAction}
            className="text-blue-600 hover:text-blue-900 flex items-center space-x-1 transition-colors cursor-pointer border border-blue-200 rounded-md px-2 py-1"
          >
            <Settings className="w-4 h-4" />
            <span className="text-xs">Action</span>
          </button>

          <button
            onClick={handleSequence}
            className="text-purple-600 hover:text-purple-900 flex items-center space-x-1 transition-colors cursor-pointer border border-purple-200 rounded-md px-2 py-1"
          >
            <Settings className="w-4 h-4" />
            <span className="text-xs">Sequence</span>
          </button>
          
          <button
            onClick={handleMarkAsPaid}
            disabled={invoice.paymentStatus === 'Paid'}
            className={`flex items-center space-x-1 transition-colors border rounded-md px-2 py-1 ${
              invoice.paymentStatus === 'Paid'
                ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                : 'text-green-600 hover:text-green-900 border-green-200 hover:border-green-300 cursor-pointer'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span className="text-xs">Mark as Paid</span>
          </button>
        </div>
      </td>

      {/* Action Email Modal */}
      <ActionEmailModal
        isOpen={isActionEmailOpen}
        onClose={() => setIsActionEmailOpen(false)}
        invoice={invoice}
      />

      {/* Sequence Rules Modal */}
      <SequenceRulesModal
        isOpen={isSequenceRulesOpen}
        onClose={() => setIsSequenceRulesOpen(false)}
        invoice={invoice}
      />

      {/* Mark as Paid Modal */}
      <MarkAsPaidModal
        isOpen={isMarkAsPaidOpen}
        onClose={() => setIsMarkAsPaidOpen(false)}
        invoice={invoice}
      />
    </tr>
  );
};

export default WorkCoverRow;