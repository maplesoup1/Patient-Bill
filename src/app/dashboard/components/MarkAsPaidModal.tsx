"use client";
import React, { useState } from "react";
import { X, DollarSign, Upload, Calendar, ChevronDown } from "lucide-react";
import { WorkCoverInvoice } from "../../../data/types";

interface MarkAsPaidModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: WorkCoverInvoice;
}

const MarkAsPaidModal: React.FC<MarkAsPaidModalProps> = ({
  isOpen,
  onClose,
  invoice,
}) => {
  const [receipt, setReceipt] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [amountPaid, setAmountPaid] = useState(invoice.amount.toString());
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);

  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const getOverdueText = () => {
    if (invoice.overdueDays && invoice.overdueDays > 0) {
      return `${invoice.overdueDays} days overdue`;
    }
    return "On time";
  };

  const handleReceiptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceipt(file);
    }
  };

  const handleMarkAsPaid = () => {
    console.log("Marking as paid:", {
      invoice: invoice.id,
      amountPaid: parseFloat(amountPaid),
      paymentMethod,
      paymentDate,
      receipt: receipt?.name,
      notes,
    });
    onClose();
  };

  const paymentMethods = [
    "Credit Card",
    "Bank Transfer",
    "Direct Debit",
    "Cash",
    "Cheque",
    "PayPal",
    "Other",
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-gray-900">
              Mark as Paid in Best Practice
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Workcover Information */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">
              Workcover Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Name</p>
                  <p className="text-sm font-medium text-gray-900">
                    {invoice.patient}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Phone</p>
                  <p className="text-sm text-gray-700">+61 400 123 456</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Invoice Date</p>
                  <div>
                    <p className="text-sm text-gray-700">
                      {formatDate(invoice.invoiceCreatedDate)}
                    </p>
                    <p className="text-xs text-red-600">{getOverdueText()}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Amount</p>
                  <p className="text-sm font-semibold text-gray-900">
                    ${invoice.amount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-4">
            {/* Payment Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment date
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={paymentDate}
                  onChange={(e) => {
                    // Format input as MM/DD/YYYY
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length >= 2) {
                      value = value.substring(0,2) + '/' + value.substring(2);
                    }
                    if (value.length >= 5) {
                      value = value.substring(0,5) + '/' + value.substring(5,9);
                    }
                    setPaymentDate(value);
                  }}
                  placeholder="MM/DD/YYYY"
                  maxLength={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Calendar className="absolute right-3 top-2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment method
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowPaymentMethods(!showPaymentMethods)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left bg-white flex items-center justify-between"
                >
                  <span
                    className={
                      paymentMethod ? "text-gray-900" : "text-gray-500"
                    }
                  >
                    {paymentMethod || "Select"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {showPaymentMethods && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                    {paymentMethods.map((method) => (
                      <button
                        key={method}
                        onClick={() => {
                          setPaymentMethod(method);
                          setShowPaymentMethods(false);
                        }}
                        className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Amount Paid */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount paid
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-sm text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(e.target.value)}
                  step="0.01"
                  className="w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Add any notes about the payment..."
              />
            </div>

            {/* Upload Receipt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload receipt
              </label>
              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 text-sm flex-1">
                  <Upload className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-500">
                    {receipt ? receipt.name : "No selected file"}
                  </span>
                  <input
                    type="file"
                    onChange={handleReceiptChange}
                    className="hidden"
                    accept=".pdf,.jpg,.png,.doc,.docx"
                  />
                </label>
                <button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Upload
                </button>
              </div>
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
            onClick={handleMarkAsPaid}
            className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 flex items-center space-x-2"
          >
            <span>Confirm Payment</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkAsPaidModal;
