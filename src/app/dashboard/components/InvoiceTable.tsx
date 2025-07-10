'use client';
import React from 'react';
import SearchAndFilterBar from './SearchAndFilterBar';
import InvoiceRow from './InvoiceRow';
import Pagination from './Pagination';
import { useState,useEffect } from 'react';

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

interface InvoiceTableProps {
  invoices: Invoice[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  statusFilter: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ 
  invoices, 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInvoices = filteredInvoices.slice(startIndex, endIndex);

  const [selectedInvoices, setSelectedInvoices] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const tableHeaders = [
    { key: 'checkbox', label: '', width: 'w-12' },
    { key: 'invoice', label: 'Invoice Number', width: 'w-32' },
    { key: 'patient', label: 'Patients', width: 'w-48' },
    { key: 'Provider', label: 'Service Provider', width: 'w-32' },
    { key: 'appointment', label: 'Service date', width: 'w-48' },
    { key: 'amount', label: 'Amount', width: 'w-24' },
    { key: 'status', label: 'Status', width: 'w-32' },
    { key: 'actions', label: 'Actions', width: 'w-48' }
  ];

  useEffect(() => {
    const allIds = currentInvoices.map((inv) => inv.id);
    const allSelected = allIds.length > 0 && allIds.every((id) => selectedInvoices.has(id));
    setSelectAll(allSelected);
  }, [selectedInvoices, currentInvoices]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Invoices</h2>
          <SearchAndFilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${header.width}`}
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
          {currentInvoices.map((invoice, index) => (
  <InvoiceRow
    key={`${invoice.id}-${index}`}
    invoice={invoice}
    index={startIndex + index}
    isSelected={selectedInvoices.has(invoice.id)}
    onSelect={(isChecked) => {
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

export default InvoiceTable;