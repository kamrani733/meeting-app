"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useContactMethods } from "@/lib/queries";
import { ContactMethodModal } from "./ContactMethodModal";
import type { ContactMethod } from "@/types/meeting";

const methodLabels: Record<ContactMethod, string> = {
  phone: "Phone",
  email: "Email",
  whatsapp: "WhatsApp",
  telegram: "Telegram",
  facetime: "Face Time",
  imo: "IMO",
};

const formatPhoneNumber = (value: string): string => {
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

export const ContactMethodField: React.FC = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { data: contactMethods = [] } = useContactMethods();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contactMethod = watch("contactMethod") as ContactMethod;
  const contactValue = watch("contactValue");

  const handleMethodSelect = (method: ContactMethod) => {
    setValue("contactMethod", method);
    setValue("contactValue", "");
  };

  const handleContactValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (contactMethod === "phone") {
      const formatted = formatPhoneNumber(value);
      setValue("contactValue", formatted, { shouldValidate: true });
    } else {
      setValue("contactValue", value, { shouldValidate: true });
    }
  };

  const getPlaceholder = () => {
    if (contactMethod === "phone") return "+98 912 111 1111";
    if (contactMethod === "email") return "example@test.com";
    return "Enter your contact information";
  };

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-900">
          Preferred Contact Method <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            {...register("contactValue", { required: "Contact value is required" })}
            onChange={handleContactValueChange}
            placeholder={getPlaceholder()}
            className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 ${
              errors.contactValue ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center gap-2 min-w-[120px] justify-between"
          >
            <span>{contactMethod ? methodLabels[contactMethod] : "Select"}</span>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
        {errors.contactValue && (
          <p className="text-sm text-red-500">{errors.contactValue.message as string}</p>
        )}
        <input
          type="hidden"
          {...register("contactMethod", { required: true })}
        />
      </div>

      <ContactMethodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleMethodSelect}
        contactMethods={contactMethods}
        selectedMethod={contactMethod}
      />
    </>
  );
};

