'use client';
import React, { useState } from 'react';
import StatsGrid from './components/StatsGrid';
import FilterTabs from './components/Filter';
import TimePeriodSelector from './components/TimePeriodSelector';
import InvoiceTable from './components/InvoiceTable';
import WorkCoverTable from './components/WorkCoverTable';
import { patientsInvoices } from '../../data/patientsData';
import { workcoverInvoices } from '../../data/workcoverData';

const Dashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState('Date range');
  const [selectedOverdue, setSelectedOverdue] = useState('Overdue by');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedDashboard, setSelectedDashboard] = useState('Patients');

  const handleTabChange = (tab: string) => {
    setSelectedDashboard(tab);
  };

  const getCurrentPatientsInvoices = () => {
    if (selectedDashboard === 'Patients') {
      return patientsInvoices;
    }
    return [];
  };

  const getCurrentWorkcoverInvoices = () => {
    if (selectedDashboard === 'Workcover') {
      return workcoverInvoices;
    }
    return [];
  };

  const getDashboardTitle = () => {
    if (selectedDashboard === 'Patients') {
      return 'Main Patients Dashboard';
    } else if (selectedDashboard === 'Workcover') {
      return 'WorkCover Claims Dashboard';
    }
    return 'Dashboard';
  };

  const currentPatientsInvoices = getCurrentPatientsInvoices();
  const currentWorkcoverInvoices = getCurrentWorkcoverInvoices();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{getDashboardTitle()}</h1>

        <div className="flex items-center justify-between mb-8">
          <FilterTabs 
            activeTab={selectedDashboard} 
            onTabChange={handleTabChange}
            patientsCount={patientsInvoices.length}
            workcoverCount={workcoverInvoices.length}
            othersCount={0}
          />
          <TimePeriodSelector 
            selectedFilter={selectedFilter} 
            setSelectedFilter={setSelectedFilter}
            selectedOverdue={selectedOverdue}
            setSelectedOverdue={setSelectedOverdue}
          />
        </div>

        {selectedDashboard === 'Others' ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Others dashboard coming soon...</p>
          </div>
        ) : (
          <>
            {selectedDashboard === 'Patients' ? (
              <>
                <StatsGrid invoices={currentPatientsInvoices} />
                <InvoiceTable
                  invoices={currentPatientsInvoices}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                />
              </>
            ) : (
              <WorkCoverTable
                invoices={currentWorkcoverInvoices}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;