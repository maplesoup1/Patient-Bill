"use client";
import React, { useState } from "react";
import { Phone, Settings } from "lucide-react";
import FollowUp from "./FollowUp";
import SetRules from "./SetRules";

interface Invoice {
  id: string;
  patient: string;
  appointment: string;
  overdue: boolean;
  days: string;
  amount: number;
  status: string;
  statusColor: string;
}

interface InvoiceRowProps {
    invoice: Invoice;
    index: number;
    isSelected: boolean;
    onSelect: (checked: boolean) => void;
  }

const InvoiceRow: React.FC<InvoiceRowProps> = ({ invoice, index, isSelected, onSelect }) => {
  const [isFollowUpOpen, setIsFollowUpOpen] = useState(false);
  const [isSetRulesOpen, setIsSetRulesOpen] = useState(false);

  const handleselectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    console.log(`Select all invoices: ${isChecked}`);
  };
  const handleFollowUp = () => {
    setIsFollowUpOpen(true);
  };

  const closeFollowUp = () => {
    setIsFollowUpOpen(false);
  };

  const handleSetRules = () => {
    setIsSetRulesOpen(true);
  };

  const closeSetRules = () => {
    setIsSetRulesOpen(false);
  };

  // 为 FollowUp 组件准备的 patientData（包含 activities）
  const patientDataForFollowUp = {
    name: invoice.patient,
    phone: "+61 400 123 456",
    appointment: invoice.appointment,
    amount: invoice.amount,
    status: invoice.days,
    activities: [
      {
        id: "1",
        type: "sms" as const,
        description: "SMS sent to patient",
        timestamp: "2 days ago",
      },
      {
        id: "2",
        type: "call" as const,
        description: "Reception call attempted",
        timestamp: "1 day ago",
      },
      {
        id: "3",
        type: "email" as const,
        description: "Payment link sent via email",
        timestamp: "4 hours ago",
      },
    ],
  };

  // 为 SetRules 组件准备的 patientData（不需要 activities）
  const patientDataForSetRules = {
    name: invoice.patient,
    phone: "+61 400 123 456",
    appointment: invoice.appointment,
    amount: invoice.amount,
    status: invoice.days,
  };

  return (
    <>
      <tr key={`${invoice.id}-${index}`} className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <input
            type="checkbox"
            className="rounded border-gray-300"
            checked={isSelected}
            onChange={(e) => onSelect(e.target.checked)}
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {invoice.id}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {invoice.patient}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <div>
            <div className="font-medium text-gray-900">
              {invoice.appointment}
            </div>
            <div
              className={`text-xs ${
                invoice.overdue ? "text-red-600" : "text-gray-500"
              }`}
            >
              {invoice.days}
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          ${invoice.amount.toFixed(2)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${invoice.statusColor}`}
          >
            {invoice.status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleFollowUp}
              className="text-blue-600 hover:text-blue-900 flex items-center space-x-1 transition-colors cursor-pointer border-2 rounded-md p-2"
            >
              <Phone className="w-4 h-4" />
              <span>Follow up</span>
            </button>
            <button
              onClick={handleSetRules}
              className="text-gray-600 hover:text-gray-900 flex items-center space-x-1 transition-colors border-2 rounded-md p-2"
            >
              <Settings className="w-4 h-4" />
              <span>Set rules</span>
            </button>
          </div>
        </td>
      </tr>

      {/* Follow Up Modal */}
      <FollowUp
        isOpen={isFollowUpOpen}
        onClose={closeFollowUp}
        patient={patientDataForFollowUp}
      />

      {/* Set Rules Modal */}
      <SetRules
        isOpen={isSetRulesOpen}
        onClose={closeSetRules}
        patient={patientDataForSetRules}
      />
    </>
  );
};

export default InvoiceRow;
