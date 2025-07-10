"use client";
import React, { useState } from "react";
import { Phone, Settings } from "lucide-react";
import FollowUp from "./FollowUp";
import SetRules from "./SetRules";
import PatientInfoModal from "./PatientInfoModal";
import { getPatientData } from "../../../data/activitiesData";

interface Invoice {
  id: string;
  patient: string;
  provider: string;
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
  const [isPatientInfoOpen, setIsPatientInfoOpen] = useState(false);

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

  const handleStatusClick = () => {
    setIsPatientInfoOpen(true);
  };

  const closePatientInfo = () => {
    setIsPatientInfoOpen(false);
  };

  // 为 FollowUp 组件准备的 patientData（包含 activities）
  const patientDataForFollowUp = getPatientData(
    invoice.patient,
    "+61 400 123 456",
    invoice.appointment,
    invoice.amount,
    invoice.days
  );

  // 为 SetRules 组件准备的 patientData（不需要 activities）
  const patientDataForSetRules = {
    name: invoice.patient,
    phone: "+61 400 123 456",
    appointment: invoice.appointment,
    amount: invoice.amount,
    status: invoice.days,
    invoiceId: invoice.id,
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
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {invoice.provider}
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
            onClick={handleStatusClick}
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full cursor-pointer hover:opacity-80 transition-opacity ${invoice.statusColor}`}
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
              <span>Set Sequence</span>
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
        invoiceId={invoice.id}
      />

      {/* Patient Info Modal */}
      <PatientInfoModal
        isOpen={isPatientInfoOpen}
        onClose={closePatientInfo}
        patient={patientDataForFollowUp}
      />
    </>
  );
};

export default InvoiceRow;
