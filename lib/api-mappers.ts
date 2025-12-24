import type { ContactMethod, MeetingFormData } from "@/types/meeting";

export const contactMethodToApiId: Record<ContactMethod, number> = {
  phone: 1,
  whatsapp: 2,
  telegram: 3,
  email: 4,
  facetime: 5,
};

export const apiIdToContactMethod: Record<number, ContactMethod> = {
  1: "phone",
  2: "whatsapp",
  3: "telegram",
  4: "email",
  5: "facetime",
};

export const mapFormDataToApi = (data: MeetingFormData) => {
  const scheduleTimeId = parseInt(data.scheduleTime) || 1;
  const scheduleTimeMap: Record<number, string> = {
    1: "15:00:00",
    2: "16:00:00",
    3: "20:00:00",
    4: "22:00:00",
  };
  const time = scheduleTimeMap[scheduleTimeId] || "15:00:00";
  const scheduleDate = data.scheduleDate
    ? new Date(data.scheduleDate + "T" + time).toISOString()
    : new Date().toISOString();

  let contactValue = data.contactValue;
  if (data.contactMethod === "phone") {
    const cleaned = data.contactValue.replace(/\s/g, "");
    if (cleaned.startsWith("+98")) {
      const digits = cleaned.slice(3);
      if (digits.length === 10) {
        contactValue = "+989" + digits;
      } else {
        contactValue = cleaned;
      }
    } else if (cleaned.startsWith("989")) {
      contactValue = "+" + cleaned;
    } else if (cleaned.length === 10) {
      contactValue = "+989" + cleaned;
    } else {
      contactValue = cleaned;
    }
  }

  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    contactMethod: contactMethodToApiId[data.contactMethod],
    contactValue: contactValue,
    scheduleTime: scheduleTimeId,
    scheduleDate: scheduleDate,
    purpose: data.purpose,
  };
};

const formatPhoneForDisplay = (phone: string): string => {
  if (!phone) return phone;
  const cleaned = phone.replace(/\s/g, "");
  if (cleaned.startsWith("+989") && cleaned.length === 13) {
    const digits = cleaned.slice(4);
    return `+98 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }
  return phone;
};

export const mapApiToFormData = (apiData: any): MeetingFormData => {
  const contactMethod = apiIdToContactMethod[apiData.contactMethod] || "phone";
  const contactValue = contactMethod === "phone" 
    ? formatPhoneForDisplay(apiData.contactValue)
    : apiData.contactValue;

  return {
    firstName: apiData.firstName,
    lastName: apiData.lastName,
    email: apiData.email,
    contactMethod: contactMethod,
    contactValue: contactValue,
    scheduleTime: apiData.scheduleTime?.toString() || "",
    scheduleDate: apiData.scheduleDate?.split("T")[0] || apiData.scheduleDate,
    purpose: apiData.purpose,
  };
};

export const mapApiToMeeting = (apiData: any) => {
  const contactMethod = apiIdToContactMethod[apiData.contactMethod] || "phone";
  const contactValue = contactMethod === "phone"
    ? formatPhoneForDisplay(apiData.contactValue)
    : apiData.contactValue;

  return {
    id: apiData.id.toString(),
    firstName: apiData.firstName,
    lastName: apiData.lastName,
    email: apiData.email,
    contactMethod: contactMethod,
    contactValue: contactValue,
    scheduleTime: apiData.scheduleTime?.toString() || "",
    scheduleDate: apiData.scheduleDate?.split("T")[0] || apiData.scheduleDate,
    purpose: apiData.purpose,
    createdAt: apiData.createdAt,
    updatedAt: apiData.updatedAt,
  };
};

