'use client';
import React, { useState, useEffect } from 'react';
import { WorkCoverInvoice } from '../../../data/types';
import WorkCoverRow from './WorkCoverRow';
import Pagination from './Pagination';

interface WorkCoverTableProps {
  invoices: WorkCoverInvoice[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  statusFilter: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
}

const WorkCoverTable: React.FC<WorkCoverTableProps> = ({ 
  invoices, 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter 
}) => {
  const [selectedInvoices, setSelectedInvoices] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [showPaid, setShowPaid] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredInvoices = invoices.filter((invoice: WorkCoverInvoice) => {
    const matchesSearch = invoice.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.serviceProvider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.workcoverProvider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.caseManager.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || 
                         (statusFilter === 'Overdue' && (invoice.paymentStatus.includes('overdue') || invoice.paymentStatus === 'Overdue')) ||
                         (statusFilter === 'Unpaid' && invoice.paymentStatus === 'Unpaid') ||
                         (statusFilter === 'Paid' && invoice.paymentStatus === 'Paid');
    
    const matchesPaidFilter = showPaid || invoice.paymentStatus !== 'Paid';
    
    return matchesSearch && matchesStatus && matchesPaidFilter;
  });

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInvoices = filteredInvoices.slice(startIndex, endIndex);

  const tableHeaders = [
    { key: 'checkbox', label: '', width: 'w-12' },
    { key: 'number', label: '#', width: 'w-12' },
    { key: 'invoice', label: 'Invoice ID', width: 'w-28' },
    { key: 'patient', label: 'Patients', width: 'w-36' },
    { key: 'serviceProvider', label: 'Service Provider', width: 'w-40' },
    { key: 'workcoverProvider', label: 'Workcover Provider', width: 'w-44' },
    { key: 'caseManager', label: 'Case Manager', width: 'w-32' },
    { key: 'invoiceCreatedDate', label: 'Invoice Created', width: 'w-32' },
    { key: 'dueDate', label: 'Due Date', width: 'w-32' },
    { key: 'amount', label: 'Amount', width: 'w-24' },
    { key: 'communicationStatus', label:'Communication Status', width: 'w-44' },
    { key: 'paymentStatus', label: 'Payment Status', width: 'w-32' },
    { key: 'actions', label: 'Remittance Actions', width: 'w-48' }
  ];

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, showPaid]);

  useEffect(() => {
    const allIds = currentInvoices.map((inv: WorkCoverInvoice) => inv.id);
    const allSelected = allIds.length > 0 && allIds.every((id: string) => selectedInvoices.has(id));
    setSelectAll(allSelected);
  }, [selectedInvoices, currentInvoices]);

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Workcover invoices</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showPaid"
                checked={showPaid}
                onChange={(e) => setShowPaid(e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="showPaid" className="text-sm text-gray-700">
                Show Paid
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">Status</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header.key}
                  className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${header.width}`}
                >
                  {header.key === 'checkbox' ? (
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectAll}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setSelectAll(isChecked);
                        if (isChecked) {
                          const allIds = new Set(currentInvoices.map(inv => inv.id));
                          setSelectedInvoices(allIds);
                        } else {
                          setSelectedInvoices(new Set());
                        }
                      }}
                    />
                  ) : (
                    header.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentInvoices.map((invoice: WorkCoverInvoice, index: number) => (
              <WorkCoverRow
                key={`${invoice.id}-${index}`}
                invoice={invoice}
                index={startIndex + index}
                isSelected={selectedInvoices.has(invoice.id)}
                onSelect={(isChecked: boolean) => {
                  const newSelected = new Set(selectedInvoices);
                  if (isChecked) {
                    newSelected.add(invoice.id);
                  } else {
                    newSelected.delete(invoice.id);
                    setSelectAll(false);
                  }
                  setSelectedInvoices(newSelected);
                }}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredInvoices.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        showingStart={startIndex + 1}
        showingEnd={Math.min(endIndex, filteredInvoices.length)}
      />
    </div>
  );
};

export default WorkCoverTable;