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
  
  let scheduleDate: string;
  if (data.scheduleDate) {
    const dateOnly = data.scheduleDate.split("T")[0];
    scheduleDate = `${dateOnly}T00:00:00.000Z`;
  } else {
    const now = new Date();
    scheduleDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T00:00:00.000Z`;
  }

  let contactValue = data.contactValue;
  
  if (data.contactMethod === "email") {
    contactValue = data.contactValue.trim();
  } else {
    const cleaned = data.contactValue.replace(/\s/g, "").replace(/-/g, "");
    
    if (cleaned.startsWith("+989") && cleaned.length === 13) {
      contactValue = cleaned;
    } else if (cleaned.startsWith("+98") && cleaned.length > 3) {
      const digits = cleaned.slice(3).replace(/\D/g, "");
      if (digits.length === 10 && digits.startsWith("9")) {
        contactValue = "+98" + digits;
      } else if (digits.length === 9) {
        contactValue = "+989" + digits;
      } else {
        contactValue = cleaned;
      }
    } else if (cleaned.startsWith("989") && cleaned.length === 12) {
      contactValue = "+" + cleaned;
    } else if (cleaned.startsWith("09") && cleaned.length === 11) {
      contactValue = "+98" + cleaned.slice(1);
    } else {
      const onlyDigits = cleaned.replace(/\D/g, "");
      if (onlyDigits.length === 10 && onlyDigits.startsWith("9")) {
        contactValue = "+98" + onlyDigits;
      } else if (onlyDigits.length === 9) {
        contactValue = "+989" + onlyDigits;
      } else if (onlyDigits.startsWith("989") && onlyDigits.length === 12) {
        contactValue = "+" + onlyDigits;
      } else {
        contactValue = cleaned;
      }
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
    ...(data.purpose ? { purpose: data.purpose } : {}),
  };
};

const formatPhoneForDisplay = (phone: string): string => {
  if (!phone) return phone;
  const cleaned = phone.replace(/\s/g, "");
  if (cleaned.startsWith("+989") && cleaned.length === 13) {
    const digits = cleaned.slice(3);
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

