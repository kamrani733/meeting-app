export const formatPhoneNumber = (value: string): string => {
  let cleaned = value.replace(/[^\d+]/g, "");
  
  if (cleaned.startsWith("+98")) {
    const digits = cleaned.slice(3);
    if (digits.length <= 10) {
      if (digits.length === 0) {
        return "+98 ";
      } else if (digits.length <= 3) {
        return `+98 ${digits}`;
      } else if (digits.length <= 6) {
        return `+98 ${digits.slice(0, 3)} ${digits.slice(3)}`;
      } else if (digits.length <= 10) {
        return `+98 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
      }
    }
    if (digits.length > 10) {
      return `+98 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)}`;
    }
  } else if (cleaned.startsWith("98") && cleaned.length > 2) {
    const digits = cleaned.slice(2);
    if (digits.length <= 10) {
      if (digits.length <= 3) {
        return `+98 ${digits}`;
      } else if (digits.length <= 6) {
        return `+98 ${digits.slice(0, 3)} ${digits.slice(3)}`;
      } else if (digits.length <= 10) {
        return `+98 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
      }
    }
  } else if (cleaned.length > 0 && !cleaned.startsWith("+") && !cleaned.startsWith("98")) {
    if (cleaned.length <= 10) {
      if (cleaned.length <= 3) {
        return `+98 ${cleaned}`;
      } else if (cleaned.length <= 6) {
        return `+98 ${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
      } else if (cleaned.length <= 10) {
        return `+98 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
      }
    }
  }
  
  return value;
};

export const usePhoneFormatter = () => {
  return { formatPhoneNumber };
};

