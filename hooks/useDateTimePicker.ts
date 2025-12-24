"use client";

import { useState, useMemo } from "react";

interface TimeSlot {
  value: string;
  label: string;
  date?: string;
}

interface UseDateTimePickerProps {
  scheduleTimes: TimeSlot[];
  onSelect: (date: string, time: string, value: string) => void;
  onClose: () => void;
}

export const useDateTimePicker = ({
  scheduleTimes,
  onSelect,
  onClose,
}: UseDateTimePickerProps) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const timeSlotsByDate = useMemo(() => {
    return scheduleTimes.reduce((acc, slot) => {
      const date =
        slot.date ||
        slot.value.split(" ")[0] ||
        new Date().toISOString().split("T")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(slot);
      return acc;
    }, {} as Record<string, typeof scheduleTimes>);
  }, [scheduleTimes]);

  const availableDates = useMemo(
    () => Object.keys(timeSlotsByDate).sort(),
    [timeSlotsByDate]
  );

  const getTimeSlotsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return timeSlotsByDate[dateStr] || [];
  };

  const isDateAvailable = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return availableDates.includes(dateStr) && checkDate >= today;
  };

  const handleTimeSlotClick = (slot: TimeSlot) => {
    setSelectedTimeSlot(slot.value);
  };

  const validateAndSelect = (selectedDate: Date, scheduleTimes: TimeSlot[]) => {
    if (!selectedTimeSlot) return false;

    const selectedSlot = scheduleTimes.find((s) => s.value === selectedTimeSlot);
    if (selectedSlot) {
      let meetingDateTime: Date;

      if (
        selectedSlot.value.includes("T") ||
        selectedSlot.value.includes(" ")
      ) {
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
        return true;
      }
    } else {
      const dateStr = selectedDate.toISOString().split("T")[0];
      onSelect(dateStr, selectedTimeSlot, selectedTimeSlot);
      onClose();
      return true;
    }
    return false;
  };

  const resetTimeSlot = () => {
    setSelectedTimeSlot(null);
  };

  return {
    selectedTimeSlot,
    timeSlotsByDate,
    availableDates,
    getTimeSlotsForDate,
    isDateAvailable,
    handleTimeSlotClick,
    validateAndSelect,
    resetTimeSlot,
  };
};

