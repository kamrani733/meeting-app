"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { MONTH_NAMES, DAY_NAMES, MODAL_TEXTS } from "@/lib/constants";
import { useCalendar } from "@/hooks/useCalendar";
import { useDateTimePicker } from "@/hooks/useDateTimePicker";

interface TimeSlot {
  value: string;
  label: string;
  date?: string;
}

interface DateTimePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (date: string, time: string, value: string) => void;
  scheduleTimes: Array<{ value: string; label: string; date?: string }>;
  initialTimeSlot?: string;
  initialDate?: string;
}

export const DateTimePickerModal: React.FC<DateTimePickerModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  scheduleTimes,
  initialTimeSlot,
  initialDate,
}) => {
  const {
    currentMonth,
    selectedDate,
    days,
    goToPreviousMonth,
    goToNextMonth,
    handleDateClick,
    isDateInFuture,
    setSelectedDate,
  } = useCalendar(initialDate ? new Date(initialDate) : new Date());

  const {
    selectedTimeSlot,
    availableDates,
    getTimeSlotsForDate,
    isDateAvailable,
    handleTimeSlotClick,
    validateAndSelect,
    resetTimeSlot,
  } = useDateTimePicker({
    scheduleTimes,
    onSelect,
    onClose,
    initialTimeSlot,
  });

  const currentTimeSlots = getTimeSlotsForDate(selectedDate);

  const handleDateSelection = (date: Date | null) => {
    if (handleDateClick(date)) {
      resetTimeSlot();
    }
  };

  const handleChoose = () => {
    validateAndSelect(selectedDate, scheduleTimes);
  };

  const isDateSelected = (date: Date | null) => {
    if (!date) return false;
    return date.toISOString().split("T")[0] === selectedDate.toISOString().split("T")[0];
  };

  const checkDateAvailability = (date: Date) => {
    return isDateInFuture(date);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={MODAL_TEXTS.dateTime.title}
      subtitle={MODAL_TEXTS.dateTime.subtitle}
      footer={
        <Button
          onClick={handleChoose}
          disabled={!selectedTimeSlot}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white border-purple-600"
        >
          {MODAL_TEXTS.dateTime.chooseButton}
        </Button>
      }
    >
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h3 className="text-lg font-semibold text-gray-900">
              {MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAY_NAMES.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }
              const isAvailable = checkDateAvailability(date);
              const isSelected = isDateSelected(date);
              const isToday = date.toISOString().split("T")[0] === new Date().toISOString().split("T")[0];

              return (
                <button
                  key={date.toISOString()}
                  onClick={() => handleDateSelection(date)}
                  disabled={!isAvailable}
                  className={`
                    aspect-square rounded-lg text-sm font-medium transition-colors
                    ${!isAvailable ? "text-gray-300 cursor-not-allowed" : "text-gray-900 hover:bg-gray-100"}
                    ${isSelected ? "bg-purple-500 text-white hover:bg-purple-600" : ""}
                    ${isToday && !isSelected ? "ring-2 ring-purple-300" : ""}
                  `}
                >
                  {date.getDate()}
                  {isSelected && (
                    <div className="w-1 h-1 bg-white rounded-full mx-auto mt-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {currentTimeSlots.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              {MODAL_TEXTS.dateTime.freeSlotsLabel} {MONTH_NAMES[selectedDate.getMonth()]} {selectedDate.getDate()}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {currentTimeSlots.map((slot) => (
                <button
                  key={slot.value}
                  onClick={() => handleTimeSlotClick(slot)}
                  className={`
                    px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors
                    ${selectedTimeSlot === slot.value
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-200 bg-white text-gray-900 hover:border-gray-300"
                    }
                  `}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentTimeSlots.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            {MODAL_TEXTS.dateTime.noSlotsMessage}
          </p>
        )}
      </div>
    </Modal>
  );
};

