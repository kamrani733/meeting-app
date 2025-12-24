"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface TimeSlot {
  value: string;
  label: string;
  date: string;
}

interface DateTimePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (date: string, time: string, value: string) => void;
  scheduleTimes: Array<{ value: string; label: string; date?: string }>;
}

export const DateTimePickerModal: React.FC<DateTimePickerModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  scheduleTimes,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const timeSlotsByDate = scheduleTimes.reduce((acc, slot) => {
    const date = slot.date || slot.value.split(" ")[0] || new Date().toISOString().split("T")[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(slot);
    return acc;
  }, {} as Record<string, typeof scheduleTimes>);

  const availableDates = Object.keys(timeSlotsByDate).sort();

  const selectedDateStr = selectedDate.toISOString().split("T")[0];
  const currentTimeSlots = timeSlotsByDate[selectedDateStr] || [];

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const handleDateClick = (date: Date | null) => {
    if (date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(date);
      selected.setHours(0, 0, 0, 0);
      
      if (selected >= today) {
        setSelectedDate(date);
        setSelectedTimeSlot(null);
      }
    }
  };

  const handleTimeSlotClick = (slot: { value: string; label: string }) => {
    setSelectedTimeSlot(slot.value);
  };

  const handleChoose = () => {
    if (selectedTimeSlot) {
      const selectedSlot = scheduleTimes.find(s => s.value === selectedTimeSlot);
      if (selectedSlot) {
        let meetingDateTime: Date;
        
        if (selectedSlot.value.includes("T") || selectedSlot.value.includes(" ")) {
          meetingDateTime = new Date(selectedSlot.value);
        } else {
          const dateStr = selectedDate.toISOString().split("T")[0];
          meetingDateTime = new Date(dateStr + "T" + selectedSlot.value);
        }
        
        const now = new Date();
        if (meetingDateTime > now) {
          const dateStr = selectedDate.toISOString().split("T")[0];
          onSelect(dateStr, selectedTimeSlot, selectedTimeSlot);
          onClose();
        }
      } else {
        const dateStr = selectedDate.toISOString().split("T")[0];
        onSelect(dateStr, selectedTimeSlot, selectedTimeSlot);
        onClose();
      }
    }
  };

  const isDateAvailable = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return availableDates.includes(dateStr) && checkDate >= today;
  };

  const isDateSelected = (date: Date | null) => {
    if (!date) return false;
    return date.toISOString().split("T")[0] === selectedDate.toISOString().split("T")[0];
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Preferred Time"
      subtitle="Select when you'd like the agent to get in touch."
      footer={
        <Button
          onClick={handleChoose}
          disabled={!selectedTimeSlot}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white border-purple-600"
        >
          Choose
        </Button>
      }
    >
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => {
                const newMonth = new Date(currentMonth);
                newMonth.setMonth(newMonth.getMonth() - 1);
                setCurrentMonth(newMonth);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h3 className="text-lg font-semibold text-gray-900">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button
              onClick={() => {
                const newMonth = new Date(currentMonth);
                newMonth.setMonth(newMonth.getMonth() + 1);
                setCurrentMonth(newMonth);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
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
              const isAvailable = isDateAvailable(date);
              const isSelected = isDateSelected(date);
              const isToday = date.toISOString().split("T")[0] === new Date().toISOString().split("T")[0];

              return (
                <button
                  key={date.toISOString()}
                  onClick={() => handleDateClick(date)}
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
              Free Slots on {monthNames[selectedDate.getMonth()]} {selectedDate.getDate()}
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
            No available time slots for this date.
          </p>
        )}
      </div>
    </Modal>
  );
};

