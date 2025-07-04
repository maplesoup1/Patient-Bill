'use client';
import React from 'react';
import { DollarSign, FileText, AlertCircle, MessageSquare } from 'lucide-react';
import StatsCard from './StatsCard';

interface Invoice {
  id: string;
  patient: string;
  appointment: string;
  amount: number;
  status: string;
  statusColor: string;
  overdue: boolean;
  days: string;
}

interface StatsGridProps {
  invoices: Invoice[];
}

const StatsGrid: React.FC<StatsGridProps> = ({ invoices }) => {
  const totalOutstanding = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const unpaidInvoices = invoices.length;
  const overdueInvoices = invoices.filter(invoice => invoice.overdue).length;
  const paymentLinksSent = 15;

  const stats = [
    {
      title: 'Total Outstanding',
      value: `$${totalOutstanding.toFixed(2)}`,
      icon: DollarSign,
      iconBgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Unpaid Invoices',
      value: unpaidInvoices,
      icon: FileText,
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Overdue Invoices',
      value: overdueInvoices,
      icon: AlertCircle,
      iconBgColor: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      title: 'Payment links sent',
      value: paymentLinksSent,
      icon: MessageSquare,
      iconBgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <StatsCard 
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          iconBgColor={stat.iconBgColor}
          iconColor={stat.iconColor}
        />
      ))}
    </div>
  );
};

export default StatsGrid;