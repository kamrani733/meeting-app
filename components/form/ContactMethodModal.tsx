"use client";

import React from "react";
import Image from "next/image";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import {
  CONTACT_METHOD_ICONS,
  MODAL_TEXTS,
} from "@/lib/constants";
import { useContactMethodModal } from "@/hooks/useContactMethodModal";
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

export const ContactMethodModal: React.FC<ContactMethodModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  contactMethods = [],
  selectedMethod,
}) => {
  const {
    searchQuery,
    setSearchQuery,
    selected,
    filteredMethods,
    handleSelect,
    handleChoose,
  } = useContactMethodModal({
    contactMethods,
    selectedMethod,
    onSelect,
    onClose,
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={MODAL_TEXTS.contactMethod.title}
      subtitle={MODAL_TEXTS.contactMethod.subtitle}
      footer={
          <Button
          onClick={handleChoose}
          disabled={!selected}
          className={`w-full ${
            selected
              ? "bg-gray-200 hover:bg-gray-300 text-gray-900"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {MODAL_TEXTS.contactMethod.chooseButton}
        </Button>
      }
    >
      <div className="space-y-4">
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
              placeholder={MODAL_TEXTS.contactMethod.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-1 max-h-96 overflow-y-auto">
          {filteredMethods.map((method, index) => {
            const isSelected = selected === method.value;
            return (
              <button
                key={`contact-method-${method.value}-${method.label}-${index}`}
                onClick={() => handleSelect(method.value)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left
                  ${isSelected
                    ? "bg-gray-100 border-2 border-purple-500"
                    : "bg-white border-2 border-transparent hover:bg-gray-50"
                  }
                `}
              >
                <div className="w-6 h-6 shrink-0 flex items-center justify-center">
                  <Image
                    src={CONTACT_METHOD_ICONS[method.value]}
                    alt={method.label}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
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

