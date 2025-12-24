"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useContactMethods } from "@/lib/queries";
import { CONTACT_METHOD_PLACEHOLDERS } from "@/lib/constants";
import type { ContactMethod } from "@/types/meeting";
import { formatPhoneNumber } from "./usePhoneFormatter";

export const useContactMethod = () => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { data: contactMethods = [] } = useContactMethods();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contactMethod = watch("contactMethod") as ContactMethod;
  const contactValue = watch("contactValue");

  const handleMethodSelect = (method: ContactMethod) => {
    setValue("contactMethod", method, { shouldValidate: true, shouldDirty: true });
    setValue("contactValue", "", { shouldValidate: true, shouldDirty: true });
  };

  const handleContactValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (contactMethod === "phone") {
      const formatted = formatPhoneNumber(value);
      setValue("contactValue", formatted, { shouldValidate: true, shouldDirty: true });
    } else {
      setValue("contactValue", value, { shouldValidate: true, shouldDirty: true });
    }
  };

  const getPlaceholder = () => {
    return contactMethod
      ? CONTACT_METHOD_PLACEHOLDERS[contactMethod]
      : "Enter your contact information";
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return {
    contactMethod,
    contactValue,
    contactMethods,
    isModalOpen,
    errors,
    handleMethodSelect,
    handleContactValueChange,
    getPlaceholder,
    openModal,
    closeModal,
  };
};

