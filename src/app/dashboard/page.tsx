'use client';
import React, { useState } from 'react';
import Header from './components/Header';
import StatsGrid from './components/StatsGrid';
import FilterTabs from './components/Filter';
import TimePeriodSelector from './components/TimePeriodSelector';
import InvoiceTable from './components/InvoiceTable';

const Dashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState('This month');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const invoices = [
    {
      id: 'INV-005',
      patient: 'Sarah Johnson',
      appointment: '2025-06-20, 10:30 AM',
      amount: 285.50,
      status: 'Text x2',
      statusColor: 'bg-purple-100 text-purple-800',
      overdue: true,
      days: '3 days overdue'
    },
    {
      id: 'INV-003',
      patient: 'Michael Smith',
      appointment: '2025-06-27, 10:30 AM',
      amount: 315.00,
      status: 'Prompt Sent',
      statusColor: 'bg-green-100 text-green-800',
      overdue: false,
      days: 'Upcoming due'
    },
    {
      id: 'INV-006',
      patient: 'Emily Davis',
      appointment: '2025-07-01, 01:45 PM',
      amount: 330.40,
      status: 'Call Failed',
      statusColor: 'bg-red-100 text-red-800',
      overdue: false,
      days: 'Upcoming due'
    },
    {
      id: 'INV-004',
      patient: 'Linda Taylor',
      appointment: '2025-06-30, 09:00 AM',
      amount: 355.80,
      status: 'AI Scheduled',
      statusColor: 'bg-blue-100 text-blue-800',
      overdue: false,
      days: 'Upcoming due'
    },
    {
      id: 'INV-008',
      patient: 'David Brown',
      appointment: '2025-06-23, 09:45 AM',
      amount: 320.25,
      status: 'Text x2',
      statusColor: 'bg-purple-100 text-purple-800',
      overdue: false,
      days: 'On time'
    },
    {
      id: 'INV-009',
      patient: 'Daniel Martinez',
      appointment: '2025-06-25, 03:30 PM',
      amount: 360.00,
      status: 'Text x2',
      statusColor: 'bg-purple-100 text-purple-800',
      overdue: false,
      days: 'Upcoming due'
    },
    {
      id: 'INV-010',
      patient: 'Daniel Martinez',
      appointment: '2025-06-25, 03:30 PM',
      amount: 360.00,
      status: 'Text x2',
      statusColor: 'bg-purple-100 text-purple-800',
      overdue: false,
      days: 'Upcoming due'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <div className="flex items-center justify-between mb-8">
          <FilterTabs />
          <TimePeriodSelector 
            selectedFilter={selectedFilter} 
            setSelectedFilter={setSelectedFilter} 
          />
        </div>

        <StatsGrid invoices={invoices} />

        <InvoiceTable
          invoices={invoices}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      </main>
    </div>
  );
};

export default Dashboard;