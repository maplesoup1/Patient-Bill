"use client";
import React, { useState } from "react";
import { createPortal } from "react-dom";
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
  progressSteps: {
    email: boolean;
    sms: boolean;
    ai: boolean;
    phone: boolean;
  };
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
  const [showProgressTooltip, setShowProgressTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

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

  const getCompletedSteps = () => {
    const steps = invoice.progressSteps;
    return Object.values(steps).filter(Boolean).length;
  };

  const getCurrentStep = () => {
    return getCompletedSteps() + 1;
  };

  const getNextAction = () => {
    const steps = invoice.progressSteps;
    if (!steps.email) return "Send initial email";
    if (!steps.sms) return "Send SMS reminder";
    if (!steps.ai) return "AI phone call scheduled";
    if (!steps.phone) return "Manual phone follow-up";
    return "All steps completed";
  };

  const getNextActionTime = () => {
    const steps = invoice.progressSteps;
    if (!steps.email) return "Now";
    if (!steps.sms) return "In 1 day";
    if (!steps.ai) return "In 2 days";
    if (!steps.phone) return "In 3 days";
    return "Completed";
  };

  const getRecentActivity = () => {
    const activities = [];
    const steps = invoice.progressSteps;
    
    if (steps.phone) activities.unshift("Manual follow-up call completed");
    if (steps.ai) activities.unshift("AI phone call completed");
    if (steps.sms) activities.unshift("Follow-up SMS sent");
    if (steps.email) activities.unshift("Initial email sent");
    
    return activities.slice(0, 2);
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
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="relative">
            <div 
              className="cursor-pointer"
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setTooltipPosition({
                  x: rect.left,
                  y: rect.bottom + 8
                });
                setShowProgressTooltip(true);
              }}
              onMouseLeave={() => setShowProgressTooltip(false)}
            >
              {/* 4 Individual Progress Bars */}
              <div className="flex items-center space-x-1 mb-1">
                <div
                  className={`w-4 h-2 rounded-sm transition-all duration-300 ${
                    invoice.progressSteps.email ? 'bg-black' : 'bg-gray-200'
                  }`}
                  title="Email"
                ></div>
                <div
                  className={`w-4 h-2 rounded-sm transition-all duration-300 ${
                    invoice.progressSteps.sms ? 'bg-black' : 'bg-gray-200'
                  }`}
                  title="SMS"
                ></div>
                <div
                  className={`w-4 h-2 rounded-sm transition-all duration-300 ${
                    invoice.progressSteps.ai ? 'bg-black' : 'bg-gray-200'
                  }`}
                  title="AI"
                ></div>
                <div
                  className={`w-4 h-2 rounded-sm transition-all duration-300 ${
                    invoice.progressSteps.phone ? 'bg-black' : 'bg-gray-200'
                  }`}
                  title="Phone"
                ></div>
              </div>
              {/* Step Text */}
              <div className="text-xs text-gray-500">
                Step {getCurrentStep()} of 4
              </div>
            </div>

          </div>
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
      {isFollowUpOpen && (
        <FollowUp
          isOpen={isFollowUpOpen}
          onClose={closeFollowUp}
          patient={patientDataForFollowUp}
        />
      )}

      {/* Set Rules Modal */}
      {isSetRulesOpen && (
        <SetRules
          isOpen={isSetRulesOpen}
          onClose={closeSetRules}
          patient={patientDataForSetRules}
          invoiceId={invoice.id}
        />
      )}

      {/* Patient Info Modal */}
      {isPatientInfoOpen && (
        <PatientInfoModal
          isOpen={isPatientInfoOpen}
          onClose={closePatientInfo}
          patient={patientDataForFollowUp}
        />
      )}

      {/* Tooltip Portal */}
      {showProgressTooltip && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed z-[9999] bg-gray-900 text-white rounded-md shadow-lg p-3 w-64"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`
          }}
        >
          {/* Follow-up Progress */}
          <div className="mb-3">
            <h4 className="text-sm font-medium text-white mb-1">Follow-up Progress</h4>
            <div className="text-xs text-gray-300">
              <div>Current: Step {getCurrentStep()} of 4</div>
              <div>Completed: {getCompletedSteps()} steps</div>
            </div>
          </div>

          {/* Next Action */}
          <div className="mb-3">
            <h4 className="text-sm font-medium text-white mb-1">⏭ Next Action</h4>
            <div className="text-xs text-gray-300">
              <div>Next Action: {getNextAction()}</div>
              <div className="text-gray-400 mt-1">{getNextActionTime()}</div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h4 className="text-sm font-medium text-white mb-1">🕒 Recent Activity</h4>
            <div className="space-y-1">
              {getRecentActivity().map((activity, index) => (
                <div key={index} className="flex items-center text-xs text-gray-300">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                  {activity}
                </div>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default InvoiceRow;
