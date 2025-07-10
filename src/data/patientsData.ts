import { Invoice } from './types';

export const patientsInvoices: Invoice[] = [
  {
    id: 'INV-005',
    patient: 'Sarah Johnson',
    provider: 'Dr. Wilson',
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
    provider: 'Dr. Anderson',
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
    provider: 'Dr. Johnson',
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
    provider: 'Dr. Martinez',
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
    provider: 'Dr. Wilson',
    appointment: '2025-06-23, 09:45 AM',
    amount: 320.25,
    status: 'Text x2',
    statusColor: 'bg-purple-100 text-purple-800',
    overdue: false,
    days: 'On time'
  }
];