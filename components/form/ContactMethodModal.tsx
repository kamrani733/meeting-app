"use client";

import React, { useState, useMemo } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import type { ContactMethod } from "@/types/meeting";

interface ContactMethodOption {
  value: ContactMethod;
  label: string;
  icon?: string;
}

interface ContactMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (method: ContactMethod) => void;
  contactMethods: ContactMethodOption[];
  selectedMethod?: ContactMethod;
}

const methodIcons: Record<ContactMethod, string> = {
  phone: "📞",
  email: "✉️",
  whatsapp: "💬",
  telegram: "✈️",
  facetime: "📹",
  imo: "💙",
};

const defaultMethods: ContactMethodOption[] = [
  { value: "phone", label: "Phone (Call & SMS)" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "telegram", label: "Telegram" },
  { value: "email", label: "Email" },
  { value: "facetime", label: "Face Time" },
  { value: "imo", label: "IMO" },
];

export const ContactMethodModal: React.FC<ContactMethodModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  contactMethods = [],
  selectedMethod,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<ContactMethod | undefined>(selectedMethod);

  const methods = contactMethods.length > 0 ? contactMethods : defaultMethods;

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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Preferred Contact Method"
      subtitle="Select your preferred contact method from the list."
      footer={
        <Button
          onClick={handleChoose}
          disabled={!selected}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900"
        >
          Choose
        </Button>
      }
    >
      <div className="space-y-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search social media"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Contact Methods List */}
        <div className="space-y-1 max-h-96 overflow-y-auto">
          {filteredMethods.map((method) => {
            const isSelected = selected === method.value;
            return (
              <button
                key={method.value}
                onClick={() => handleSelect(method.value)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left
                  ${isSelected
                    ? "bg-gray-100 border-2 border-purple-500"
                    : "bg-white border-2 border-transparent hover:bg-gray-50"
                  }
                `}
              >
                <div className="text-2xl">{methodIcons[method.value]}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {method.label}
                  </div>
                </div>
                <div className="shrink-0">
                  <div
                    className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center
                      ${isSelected
                        ? "border-purple-500 bg-purple-500"
                        : "border-gray-300"
                      }
                    `}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {filteredMethods.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            No contact methods found.
          </p>
        )}
      </div>
    </Modal>
  );
};

