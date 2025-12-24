"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { ContactMethodModal } from "./ContactMethodModal";
import { CONTACT_METHOD_LABELS } from "@/lib/constants";
import { useContactMethod } from "@/hooks/useContactMethod";

export const ContactMethodField: React.FC = () => {
  const { register } = useFormContext();
  const {
    contactMethod,
    contactMethods,
    isModalOpen,
    errors,
    handleMethodSelect,
    handleContactValueChange,
    getPlaceholder,
    openModal,
    closeModal,
  } = useContactMethod();

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-900" style={{  fontWeight: 500, fontSize: "0.875rem", lineHeight: "1.25rem", letterSpacing: "0%" }}>
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
            onClick={openModal}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center gap-2 min-w-[120px] justify-between"
          >
            <span>
              {contactMethod ? CONTACT_METHOD_LABELS[contactMethod] : "Select"}
            </span>
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
        onClose={closeModal}
        onSelect={handleMethodSelect}
        contactMethods={contactMethods}
        selectedMethod={contactMethod}
      />
    </>
  );
};

