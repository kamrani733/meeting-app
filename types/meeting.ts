export type ContactMethod = "phone" | "email" | "whatsapp" | "telegram" | "facetime" | "imo";

export interface Meeting {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactMethod: ContactMethod;
  contactValue: string;
  scheduleDate: string;
  scheduleTime: string;
  purpose?: string;
}

export interface MeetingFormData {
  firstName: string;
  lastName: string;
  email: string;
  contactMethod: ContactMethod;
  contactValue: string;
  scheduleDate: string;
  scheduleTime: string;
  purpose?: string;
}

export interface ContactMethodOption {
  value: ContactMethod;
  label: string;
}

export interface ScheduleTime {
  date: string;
  time: string;
  label: string;
}

