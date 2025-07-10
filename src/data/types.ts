export interface Invoice {
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

export interface WorkCoverInvoice {
  id: string;
  patient: string;
  serviceProvider: string;
  workcoverProvider: string;
  caseManager: string;
  invoiceCreatedDate: string;
  dueDate: string;
  overdueDays?: number;
  amount: number;
  communicationStatus: string;
  communicationStatusColor: string;
  paymentStatus: string;
  paymentStatusColor: string;
}

export interface Activity {
  id: string;
  type: 'patient_note' | 'sms' | 'call' | 'voicemail';
  description: string;
  timestamp: string;
  author: string;
  category?: string;
}

export interface Patient {
  name: string;
  phone: string;
  appointment: string;
  amount: number;
  status: string;
  activities: Activity[];
}