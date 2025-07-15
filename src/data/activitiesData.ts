import { Activity, Patient } from './types';

export const defaultActivities: Activity[] = [
  {
    id: '1',
    type: 'patient_note',
    description: 'Patient called back mentioned they will pay by end of week',
    author: 'Dr. John Smith',
    timestamp: '08/07/2025 12:23 PM',
    category: 'Patient Note'
  },
  {
    id: '2',
    type: 'patient_note',
    description: 'Follow-up appointment scheduled for next week',
    author: 'Dr. Emily Johnson',
    timestamp: '08/08/2025 10:15 AM',
    category: 'Patient Note'
  },
  {
    id: '3',
    type: 'sms',
    description: 'Automated payment reminder sent to patient mobile',
    author: 'System',
    timestamp: '08/10/2025 09:30 AM',
    category: 'SMS Reminder Sent'
  },
  {
    id: '4',
    type: 'call',
    description: 'Called patient no answer, voicemail left',
    author: 'Reception',
    timestamp: '08/09/2025 03:45 PM',
    category: 'Call Attempted'
  },
  {
    id: '5',
    type: 'sms',
    description: 'Initial payment reminder sent to patient',
    author: 'System',
    timestamp: '08/09/2025 03:45 PM',
    category: 'SMS Reminder Sent'
  },
  {
    id: '6',
    type: 'patient_note',
    description: 'Patient reports improvement in symptoms',
    author: 'Dr. Michael Lee',
    timestamp: '08/09/2025 03:45 PM',
    category: 'Patient Note'
  }
];

export const getPatientData = (patientName: string, phone: string, appointment: string, amount: number, status: string): Patient => ({
  name: patientName,
  phone: phone,
  appointment: appointment,
  amount: amount,
  status: status,
  activities: [
    {
      id: "1",
      type: "sms",
      description: "SMS sent to patient",
      timestamp: "2 days ago",
      author: "System",
      category: "SMS Sent"
    },
    {
      id: "2",
      type: "call",
      description: "Reception call attempted",
      timestamp: "1 day ago",
      author: "Reception",
      category: "Call Attempted"
    },
    {
      id: "3",
      type: "patient_note",
      description: "Payment link sent via email",
      timestamp: "4 hours ago",
      author: "Dr. Smith",
      category: "Patient Note"
    }
  ]
});