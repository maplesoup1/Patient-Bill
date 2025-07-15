'use client';
import React from 'react';
import { DollarSign, FileText, AlertCircle, Clock } from 'lucide-react';
import StatsCard from './StatsCard';
import { WorkCoverInvoice } from '../../../data/types';

interface WorkCoverStatsGridProps {
  invoices: WorkCoverInvoice[];
}

const WorkCoverStatsGrid: React.FC<WorkCoverStatsGridProps> = ({ invoices }) => {
  const totalOutstanding = invoices
    .filter(invoice => invoice.paymentStatus !== 'Paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  
  const unpaidInvoices = invoices.filter(invoice => invoice.paymentStatus !== 'Paid').length;
  
  const overdueInvoices = invoices.filter(invoice => 
    invoice.paymentStatus === 'Overdue' || (invoice.overdueDays && invoice.overdueDays > 0)
  ).length;

  const overdueInvoicesWithDays = invoices.filter(invoice => 
    invoice.overdueDays && invoice.overdueDays > 0
  );
  
  const averageDaysOverdue = overdueInvoicesWithDays.length > 0 
    ? Math.round(overdueInvoicesWithDays.reduce((sum, invoice) => sum + (invoice.overdueDays || 0), 0) / overdueInvoicesWithDays.length)
    : 0;

  const stats = [
    {
      title: 'Total Outstanding',
      value: `$${totalOutstanding.toFixed(2)}`,
      iconBgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Unpaid Invoices',
      value: unpaidInvoices,

      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Overdue Invoices',
      value: overdueInvoices,
      iconBgColor: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      title: 'Average days overdue',
      value: averageDaysOverdue > 0 ? `${averageDaysOverdue} days` : '0 days',
      iconBgColor: 'bg-orange-100',
      iconColor: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <StatsCard 
          key={stat.title}
          title={stat.title}
          value={stat.value}
        />
      ))}
    </div>
  );
};

export default WorkCoverStatsGrid;