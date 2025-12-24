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
          type="button"
          onClick={handleChoose}
          disabled={!selectedTimeSlot}
          className="w-full md:w-auto text-white"
          style={{ 
            backgroundColor: "#7F56D9", 
            borderColor: "#6945B3",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#6945B3";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#7F56D9";
          }}
        >
          {MODAL_TEXTS.dateTime.chooseButton}
        </Button>
      }
    >
      <div className="md:flex md:gap-6 md:space-y-0 space-y-6">
        <div className="md:flex-1">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
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
              type="button"
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
                  type="button"
                  key={date.toISOString()}
                  onClick={() => handleDateSelection(date)}
                  disabled={!isAvailable}
                  className={`
                    aspect-square rounded-lg text-sm font-medium transition-colors
                    ${!isAvailable ? "text-gray-300 cursor-not-allowed" : "text-gray-900 hover:bg-gray-100"}
                    ${isSelected ? "text-white" : ""}
                    ${isToday && !isSelected ? "ring-2" : ""}
                  `}
                  style={isSelected ? { backgroundColor: "#7F56D9" } : isToday && !isSelected ? { borderColor: "#BDA2FF", boxShadow: "0 0 0 2px #BDA2FF" } : {}}
                  onMouseEnter={(e) => {
                    if (isSelected && !e.currentTarget.disabled) {
                      e.currentTarget.style.backgroundColor = "#6945B3";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isSelected && !e.currentTarget.disabled) {
                      e.currentTarget.style.backgroundColor = "#7F56D9";
                    }
                  }}
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
          <div className="md:flex-1">
            <h4 className="text-sm w-[180px] font-bold  m-auto text-gray-900 mb-3">
              {MODAL_TEXTS.dateTime.freeSlotsLabel} {MONTH_NAMES[selectedDate.getMonth()]} {selectedDate.getDate()}
            </h4>
            <div className="grid grid-cols-1 mx-2 gap-2">
              {currentTimeSlots.map((slot) => (
                <button
                    type="button"
                    key={slot.value}
                    onClick={() => handleTimeSlotClick(slot)}
                    className={`
                      px-4 py-2 w-[180px] m-auto rounded-lg border-2 text-sm font-medium transition-colors
                      ${selectedTimeSlot === slot.value
                        ? "text-primary-700"
                        : "border-gray-200 bg-white text-gray-900 hover:border-gray-300"
                      }
                    `}
                    style={selectedTimeSlot === slot.value ? { 
                      borderColor: "#7F56D9", 
                      backgroundColor: "#F4F0FF",
                      color: "#53348D"
                    } : {}}
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

