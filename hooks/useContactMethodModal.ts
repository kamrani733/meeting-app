"use client";

import { useState, useMemo, useEffect } from "react";
import { DEFAULT_CONTACT_METHODS } from "@/lib/constants";
import type { ContactMethod } from "@/types/meeting";

interface ContactMethodOption {
  value: ContactMethod;
  label: string;
  icon?: string;
}

interface UseContactMethodModalProps {
  contactMethods: ContactMethodOption[];
  selectedMethod?: ContactMethod;
  onSelect: (method: ContactMethod) => void;
  onClose: () => void;
}

export const useContactMethodModal = ({
  contactMethods,
  selectedMethod,
  onSelect,
  onClose,
}: UseContactMethodModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<ContactMethod | undefined>(
    selectedMethod
  );

  useEffect(() => {
    setSelected(selectedMethod);
  }, [selectedMethod]);

  const methods = useMemo(() => {
    if (contactMethods.length > 0) {
      const uniqueMethods = new Map<ContactMethod, ContactMethodOption>();
      contactMethods.forEach((method) => {
        if (!uniqueMethods.has(method.value)) {
          uniqueMethods.set(method.value, method);
        }
      });
      return Array.from(uniqueMethods.values());
    }
    return DEFAULT_CONTACT_METHODS;
  }, [contactMethods]);

  const filteredMethods = useMemo(() => {
    if (!searchQuery) return methods;
    return methods.filter((method) =>
      method.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [methods, searchQuery]);

  const handleSelect = (method: ContactMethod) => {
    setSelected(method);
  };

  const handleChoose = () => {
    if (selected) {
      onSelect(selected);
      onClose();
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    selected,
    filteredMethods,
    handleSelect,
    handleChoose,
  };
};

