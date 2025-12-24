"use client";

import { useState, useMemo, useEffect } from "react";

interface TimeSlot {
  value: string;
  label: string;
  date?: string;
}

interface UseDateTimePickerProps {
  scheduleTimes: TimeSlot[];
  onSelect: (date: string, time: string, value: string) => void;
  onClose: () => void;
  initialTimeSlot?: string;
}

export const useDateTimePicker = ({
  scheduleTimes,
  onSelect,
  onClose,
  initialTimeSlot,
}: UseDateTimePickerProps) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(initialTimeSlot || null);

  useEffect(() => {
    if (initialTimeSlot) {
      setSelectedTimeSlot(initialTimeSlot);
    }
  }, [initialTimeSlot]);

  const timeSlotsByDate = useMemo(() => {
    const slotsByDate: Record<string, typeof scheduleTimes> = {};
    
    scheduleTimes.forEach((slot) => {
      if (slot.date) {
        if (!slotsByDate[slot.date]) {
          slotsByDate[slot.date] = [];
        }
        slotsByDate[slot.date].push(slot);
      }
    });
    
    return slotsByDate;
  }, [scheduleTimes]);

  const availableDates = useMemo(
    () => Object.keys(timeSlotsByDate).sort(),
    [timeSlotsByDate]
  );

  const getTimeSlotsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    const slotsForDate = timeSlotsByDate[dateStr];
    
    if (slotsForDate && slotsForDate.length > 0) {
      return slotsForDate;
    }
    
    return scheduleTimes;
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
    if (!selectedTimeSlot) {
      return false;
    }

    const dateStr = selectedDate.toISOString().split("T")[0];
    onSelect(dateStr, selectedTimeSlot, selectedTimeSlot);
    onClose();
    return true;
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

