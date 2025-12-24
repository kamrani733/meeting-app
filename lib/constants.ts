import type { ContactMethod } from "@/types/meeting";

export const CONTACT_METHOD_ICONS: Record<ContactMethod, string> = {
  phone: "/phone.png",
  email: "/email.png",
  whatsapp: "/watsapp.png",
  telegram: "/telegram.png",
  facetime: "/faceTime.png",
};

export const CONTACT_METHOD_LABELS: Record<ContactMethod, string> = {
  phone: "Phone",
  email: "Email",
  whatsapp: "WhatsApp",
  telegram: "Telegram",
  facetime: "Face Time",
};

export const DEFAULT_CONTACT_METHODS = [
  { value: "phone" as ContactMethod, label: "Phone (Call & SMS)" },
  { value: "whatsapp" as ContactMethod, label: "WhatsApp" },
  { value: "telegram" as ContactMethod, label: "Telegram" },
  { value: "email" as ContactMethod, label: "Email" },
  { value: "facetime" as ContactMethod, label: "Face Time" },
];

export const CONTACT_METHOD_PLACEHOLDERS: Record<ContactMethod, string> = {
  phone: "+98 912 111 1111",
  email: "example@test.com",
  whatsapp: "Enter your WhatsApp number",
  telegram: "Enter your Telegram username",
  facetime: "Enter your FaceTime ID",
};

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const DAY_NAMES = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export const MODAL_TEXTS = {
  contactMethod: {
    title: "Preferred Contact Method",
    subtitle: "Select your preferred way for the agent to get in touch.",
    searchPlaceholder: "Search social media",
    chooseButton: "Choose",
  },
  dateTime: {
    title: "Preferred Time",
    subtitle: "Select when you'd like the agent to get in touch.",
    chooseButton: "Choose",
    freeSlotsLabel: "Free Slots on",
    noSlotsMessage: "No available time slots for this date.",
  },
};

